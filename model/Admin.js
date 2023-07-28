const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
    password: {
      type: String,
      required: false,
      default: bcrypt.hashSync("12345678"),
    },
    role: {
      type: String,
      required: true,
      default: "Admin",
      enum: [
        "Admin",
        "Super Admin",
        "Manager",
        "CEO",
      ],
    },
    joiningDate: {
      type: Date,
      required: false,
    },
    confirmationToken: String,
    confirmationTokenExpires: Date,
  },
  {
    timestamps: true, 
  }
);

// generateConfirmationToken
adminSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.confirmationToken = token;
  const date = new Date();
  date.setDate(date.getDate() + 1);
  this.confirmationTokenExpires = date;
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
