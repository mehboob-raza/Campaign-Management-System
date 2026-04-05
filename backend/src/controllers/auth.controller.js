const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};