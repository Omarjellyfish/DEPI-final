import { Appointment } from "../models/appointment.model.js";
import { sendCancellationEmail, sendConfirmationEmail } from "../nodeMailer.js";
import {
  findBookedTimes,
  createNewAppointment,
  checkTimeConflict,
} from "../repositories/appointment.rep.js";
import {
  findAllAppointmentsByDay,
  findAllAppointmentsByMonth,
} from "../repositories/appointment.rep.js";
import { getUserAppointments } from "../repositories/appointment.rep.js";
import { deleteAppointmentById } from "../repositories/appointment.rep.js";

export async function getAllAppointmentsDay(req, res) {
  const { year, month, day } = req.headers;
  // console.log(req.params);
  try {
    const appointments = await findAllAppointmentsByDay(
      parseInt(year),
      parseInt(month),
      parseInt(day)
    );

    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for the specified day." });
    }

    res.status(200).json({
      message: "All appointments for the specified day.",
      appointments: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getAllAppointmentsMonth(req, res) {
  let { year, month } = req.headers;
  console.log(year, month, "hello from get month");
  year = parseInt(year);
  month = parseInt(month);
  try {
    const appointments = await findAllAppointmentsByMonth(year, month);

    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for the specified month." });
    }

    res.status(200).json({
      message: "All appointments for the specified month.",
      appointments: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createAppointment(req, res) {
  // console.log(req.userEmail[0], "hello from user email 1111111");
  let userId = req.userId.toString();
  console.log(userId);
  let user = userId;

  const { year, month, day, timeSlot, service, cost, note } = req.body;
  // sendConfirmationEmail(
  //   "omarkandilfan@gmail.com",
  //   req.userName[0],
  //   service,
  //   `${year}-${month}-${day}`
  // );
  try {
    if (!allPossibleTimeSlots.includes(timeSlot)) {
      return res
        .status(400)
        .json({ message: `Such appointment doesn't exist` });
    }

    const hasConflict = await checkTimeConflict(year, month, day, timeSlot);

    if (hasConflict) {
      return res
        .status(400)
        .json({ message: `this appointment already booked` });
    }

    const newAppointment = await createNewAppointment({
      year,
      month,
      day,
      timeSlot,
      user,
      service,
      cost,
      note,
    });

    const updatedAppointment = await Appointment.findOneAndUpdate(
      {
        "bookedTimes.year": year,
        "bookedTimes.month": month,
        "bookedTimes.day": day,
      },
      {
        $addToSet: { "bookedTimes.times": timeSlot }, // Add the timeSlot to bookedTimes
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create a new document if it doesn't exist
      }
    );

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
      updatedBookedTimes: updatedAppointment.bookedTimes,
    });
    if (req.typeUser == "user") {
      sendConfirmationEmail(
        req.userEmail[0],
        req.userName[0],
        service,
        `${year}-${month}-${day}`
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating appointment" });
  }
}

const allPossibleTimeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

export async function getAvailableTimes(req, res) {
  const { year, month, day } = req.query;

  try {
    const appointment = await Appointment.findOne({
      "bookedTimes.year": year,
      "bookedTimes.month": month,
      "bookedTimes.day": day,
    });

    let bookedTimes = [];

    if (appointment) {
      bookedTimes = appointment.bookedTimes.times;
    }

    const availableTimes = allPossibleTimeSlots.filter(
      (timeSlot) => !bookedTimes.includes(timeSlot)
    );

    res.status(200).json({
      message: "Available times for the specified day.",
      availableTimes: availableTimes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getUserAppointmentsController(req, res) {
  let userId = req.userId;
  // console.log("User ID:", userId);

  try {
    const appointments = await getUserAppointments(userId);
    console.log("Appointments:", appointments);
    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this user" });
    }
    res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    res
      .status(404)
      .json({ message: "Error fetching user appointments", bookings: [] });
  }
}
export async function cancelAppointment(req, res) {
  console.log(req.headers, "hello from headers");
  const appointmentId = req.headers["appointmentid"];
  console.log(appointmentId, "hello from cancel admin");
  sendCancellationEmail("omarkandilfan@gmail.com", "", "", "");

  try {
    const deletedAppointment = await deleteAppointmentById(appointmentId);

    if (!deletedAppointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found or already canceled" });
    }

    res.status(200).json({
      message: "Appointment successfully canceled",
      deletedAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error canceling appointment" });
  }
}
