const router = require("express").Router();
const ctrl = require("../controllers/campaign.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, ctrl.getCampaigns);
router.get("/:id", auth, ctrl.getCampaign);
router.post("/", auth, ctrl.createCampaign);
router.put("/:id", auth, ctrl.updateCampaign);
router.delete("/:id", auth, ctrl.deleteCampaign);

module.exports = router;