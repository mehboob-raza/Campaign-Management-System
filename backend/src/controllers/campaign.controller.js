const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const { sendAlert } = require("../socket");

// GET with filters + pagination
exports.getCampaigns = async (req, res) => {
  const { page = 1, limit = 10, status, client, sort = "created_at" } = req.query;

  const offset = (page - 1) * limit;

  let query = `SELECT * FROM campaigns WHERE deleted_at IS NULL`;
  let values = [];

  if (status) {
    values.push(status);
    query += ` AND status = $${values.length}`;
  }

  if (client) {
    values.push(client);
    query += ` AND client = $${values.length}`;
  }

  query += ` ORDER BY ${sort} DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(limit, offset);

  const result = await db.query(query, values);
  res.json(result.rows);
};

// GET single
exports.getCampaign = async (req, res) => {
  const result = await db.query(
    "SELECT * FROM campaigns WHERE id=$1 AND deleted_at IS NULL",
    [req.params.id]
  );
  res.json(result.rows[0]);
};

// CREATE
exports.createCampaign = async (req, res) => {
  const c = req.body;

  const result = await db.query(
    `INSERT INTO campaigns VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW(),NULL)
     RETURNING *`,
    [
      uuidv4(),
      c.name,
      c.client,
      c.status,
      c.budget,
      c.spend,
      c.impressions,
      c.clicks,
      c.conversions,
    ]
  );

  res.status(201).json(result.rows[0]);
};

// UPDATE
exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const c = req.body;

  const result = await db.query(
    `UPDATE campaigns SET name=$1, client=$2, status=$3 WHERE id=$4 RETURNING *`,
    [c.name, c.client, c.status, id]
  );

  // 🔔 Example alert trigger
  if (c.clicks < 10) {
    sendAlert({ message: "Low clicks detected!" });
  }

  res.json(result.rows[0]);
};

// DELETE (soft)
exports.deleteCampaign = async (req, res) => {
  await db.query(
    `UPDATE campaigns SET deleted_at = NOW() WHERE id=$1`,
    [req.params.id]
  );

  res.json({ message: "Deleted successfully" });
};