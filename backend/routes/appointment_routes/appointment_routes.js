import express from "express";
import {
  getAllAppointmentsDay,
  getAllAppointmentsMonth,
  createAppointment,
  getAvailableTimes,
  getUserAppointmentsController,
  cancelAppointment,
} from "../../controllers/appointment.controller.js";
import CustomePasetoMiddleWare from "../../middlewares/toke_verify.middleware.js";
import CheckPermission from "../../middlewares/check_permission.js";
import TokenController from "../../controllers/token.controller.js";
import User from "../../models/user.model.js";
import Admin from "../../models/admin.model.js";
import TokenRepos from "../../repositories/token.rep.js";
const AppointmentRoutes = express.Router();
//public
AppointmentRoutes.get("/available-times", getAvailableTimes);

AppointmentRoutes.use(async (req, res, next) => {
  CustomePasetoMiddleWare(
    req,
    res,
    next,
    TokenController,
    User,
    Admin,
    TokenRepos
  );
});
AppointmentRoutes.use(async (req, res, next) => {
  CheckPermission(req, res, next);
});
AppointmentRoutes.use(CustomePasetoMiddleWare);

//admin;
AppointmentRoutes.get("/day", getAllAppointmentsDay);
//both
AppointmentRoutes.delete("/cancel", cancelAppointment);
AppointmentRoutes.post("/", createAppointment);
//user
AppointmentRoutes.get("/user", getUserAppointmentsController);
//admin
AppointmentRoutes.get("/month", getAllAppointmentsMonth);
export default AppointmentRoutes;
