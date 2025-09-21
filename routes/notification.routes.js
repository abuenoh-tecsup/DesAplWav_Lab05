const express = require("express");
const router = express.Router();
const controller = require("../controllers/NotificationController");

router.get("/", controller.list);
router.get("/:id/notifications", require("../controllers/NotificationController").getByTicketId);

module.exports = router;