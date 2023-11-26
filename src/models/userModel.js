import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 4
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
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

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (inCommingPassword) {
  const isMatch = await bcrypt.compare(
    inCommingPassword,
    this.password
  );
  return isMatch;
};

const User = mongoose.model("User", UserSchema);

export default User;
