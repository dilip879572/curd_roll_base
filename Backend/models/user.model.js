const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String },
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    password: { type: String },
    mobile: { type: String },
    gender: { type: String },
    lname: { type: String },
    profileImage: { type: String },
    street: { type: String },
    plz: { type: String },
    city: { type: String },
    fname: { type: String },
    // lname: { type: String },
    location: { type: String },
    tel: { type: String },
    // plz: { type: String },
    // city: { type: String },
    timeZone: { type: String },
    isAdminFullRights: { type: String, default: "false" },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }, // manager hr type roles
    user_type: { type: String }, // admin user employee
    parent_id: { type: mongoose.Schema.Types.ObjectId },
    template: { type: mongoose.Schema.Types.ObjectId, ref: "Email" },
    added_by: { type: String },
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
    verifytoken: {
      type: String,
    },
    // user_id: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getAuthToken = async function () {
  let params = {
    id: this._id,
    email: this.email,
    password: this.password,
    role: this.role,
  };
  let keysecret = "gdshskfjkdggndh";
  var tokenValue = jwt.sign(params, keysecret);
  this.tokens = this.tokens.concat({ token: tokenValue });
  await this.save();
  return tokenValue;
};

const User = model("user", userSchema);
module.exports = { User };
