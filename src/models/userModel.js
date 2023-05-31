import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (value) {
          // Password validation regex pattern (minimum 8 characters with at least one uppercase letter and one lowercase letter)
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          return passwordRegex.test(value);
        },
        message:
          "Password must contain at least 8 characters, including one uppercase letter and one lowercase letter",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
