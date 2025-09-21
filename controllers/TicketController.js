const TicketService = require("../services/TicketService");
const service = new TicketService();

exports.create = (req, res, next) => {
  try {
    const { title, description, priority } = req.body;

    if (!title || !description) {
      const error = new Error("El título y la descripción son obligatorios");
      error.status = 400;
      throw error;
    }

    const ticket = service.createTicket({ title, description, priority });
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
};

exports.list = (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    res.status(200).json(service.list(page, limit));
  } catch (err) {
    next(err);
  }
};

exports.assign = (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    if (!user) {
      const error = new Error("El usuario es obligatorio para asignar un ticket");
      error.status = 400;
      throw error;
    }

    const ticket = service.assignTicket(id, user);
    if (!ticket) {
      const error = new Error("Ticket no encontrado");
      error.status = 404;
      throw error;
    }

    res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
};

exports.changeStatus = (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      const error = new Error("El estado es obligatorio");
      error.status = 400;
      throw error;
    }

    const ticket = service.changeStatus(id, status);
    if (!ticket) {
      const error = new Error("Ticket no encontrado");
      error.status = 404;
      throw error;
    }

    res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
};

exports.delete = (req, res, next) => {
  try {
    service.deleteTicket(req.params.id);
    res.json({ message: "Ticket eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};
