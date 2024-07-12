const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const mailer = require("../mailer/mailer");

exports.register = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      user_type,
      mobile,
      gender,
      location,
      tel,
      timeZone,
      street,
      plz,
      city,
      fname,
      lname,
      profileImage,
      parent_id,
      role,
      isAdminFullRights,
    } = req.body;

    let userData;

    const emailData = await UserModel.User.findOne({ email });
    if (emailData) {
      return res
        .status(409)
        .json({ success: false, message: "Email Id Already Exists" });
    }

    if (user_type === "admin") {
      userData = {
        username,
        password,
        email,
        profileImage,
        // user_role: "admin",
        // isAdminFullRights: true,
        // user_role: "admin",
        isAdminFullRights: "true",
        user_type: "admin",
      };
    } else if (user_type === "user") {
      const admin = await UserModel.User.findOne({ user_type: "admin" });

      if (admin) {
        userData = {
          username,
          password,
          email,
          gender,
          lname,
          profileImage,
          user_type: "user",
          mobile,
          parent_id: admin._id,
        };
      } else {
        return res
          .status(400)
          .send({ message: "No admin found to link as parent" });
      }
    } else if (user_type === "employee") {
      userData = {
        username,
        lname,
        password,
        mobile,
        email,
        location,
        tel,
        timeZone,
        street,
        plz,
        city,
        profileImage: null,
        user_type: "employee",
        role,
        parent_id,
        isAdminFullRights,
      };
      const userInstance = new UserModel.User(userData);
      const result = await userInstance.save();
      const myToken = await userInstance.getAuthToken();
      return res.status(201).send({
        status: 201,
        data: result,
        message: "Token was generated successfully",
        token: myToken,
      });
    } else {
      return res.status(400).send({ message: "Invalid user_type value" });
    }

    const userInstance = new UserModel.User(userData);
    const result = await userInstance.save();

    if (result) {
      const myToken = await userInstance.getAuthToken();
      const emailTemplate = await Email.EmailTemplate.findOne({
        findBy: "register",
        // is_deleted: "active",
      });
      // console.log(emailTemplate);
      if (emailTemplate) {
        let mailcontent = emailTemplate.content;
        mailcontent = mailcontent.replace("{username}", username);
        mailer.mailerFromTo(
          email,
          process.env.NO_REPLY,
          "Register Template",
          mailcontent,
          "",
          function (error, resp) {
            if (error) {
              console.error("Error sending email", error);
              return res
                .status(500)
                .json({ status: 500, message: "Email not sent" });
            } else {
              console.log("Email sent successfully", resp.response);

              if (myToken) {
                return res.status(201).send({
                  status: 201,
                  data: result,
                  message: "Token was generated successfully",
                  token: myToken,
                });
              } else {
                return res
                  .status(500)
                  .send({ message: "Token was not generated" });
              }
            }
          }
        );
      } else {
        if (myToken) {
          return res.status(201).send({
            status: 201,
            data: result,
            message: "Token was generated successfully",
            token: myToken,
          });
        } else {
          return res.status(500).send({ message: "Token was not generated" });
        }
      }
    } else {
      return res.status(404).send({ message: "User was not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.User.findOne({ email })
      .select("+password")
      .populate("role");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Login Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
