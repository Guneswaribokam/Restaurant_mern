import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservation.js";

const send_reservation = async (req, res, next) => {
  try {
    const { firstName, lastName, email, date, time, phone } = req.body;

    // ✅ Check required fields
    if (!firstName || !lastName || !email || !date || !time || !phone) {
      return next(new ErrorHandler("Please fill in all reservation fields!", 400));
    }

    // ✅ Create reservation in DB
    await Reservation.create({ firstName, lastName, email, date, time, phone });

    res.status(201).json({
      success: true,
      message: "Reservation sent successfully!",
    });
  } catch (error) {
    // ✅ Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }

    // ✅ Forward any other error to middleware
    return next(new ErrorHandler(error.message || "Server Error", 500));
  }
};

export default send_reservation;
