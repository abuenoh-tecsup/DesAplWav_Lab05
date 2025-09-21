const NotificationService = require("../services/NotificationService");
const service = new NotificationService();

exports.list = (req, res, next) => {
  try {
    res.status(200).json(service.list());
  } catch (err) {
    next(err);
  }
};

exports.getByTicketId = (req, res, next) => {
  try {
    const { id } = req.params;
    const notifications = service.list().filter(n => n.ticketId === id);

    if (notifications.length === 0) {
      const error = new Error("No se encontraron notificaciones para este ticket");
      error.status = 404;
      throw error;
    }

    res.status(200).json(notifications);
  } catch (err) {
    next(err);
  }
};
