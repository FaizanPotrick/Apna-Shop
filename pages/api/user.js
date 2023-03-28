import db from "../../utils/db";
import User from "../../models/User";
import Address from "../../models/Address";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

db();

export default async (req, res) => {
  const { method } = req;
  const {
    name,
    email_address,
    type_of_user,
    phone_number,
    street,
    landMark,
    city,
    district,
    state,
    country,
    pinCode,
    password,
    cPassword,
  } = req.body;
  const saltRounds = 15;

  switch (method) {
    case "POST":
      try {
        const email_check = await User.findOne({
          email_address,
        }).lean();
        if (email_check === null)
          return res.status(400).json({
            email_address: "Invalid Email Address",
          });
        const passwordMatch = await bcrypt.compare(
          password,
          email_check.password
        );
        if (!passwordMatch)
          return res.status(400).json({
            password: "Invalid Password",
          });
        const token = jwt.sign({ user_id: email_check._id.toString() });
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          })
        );
      } catch (error) {
        res.status(400).send("Invalid Request");
      }
      break;
    case "PUT":
      try {
        const email_check = await User.findOne({
          email_address,
        }).lean();
        if (email_check !== null)
          return res.status(400).json({
            email_address: "Email Address already exists",
          });
        if (password !== cPassword)
          return res.status(400).json({
            cPassword: "Password didn't match",
          });
        const user_response = await new User({
          name,
          email_address,
          type_of_user,
          phone_number,
          gst_number,
          password: bcrypt.hashSync(password, saltRounds),
        });
        const address_response = await new Address({
          user_id: register._id,
          street,
          landMark,
          city,
          district,
          state,
          country,
          pinCode,
        });
        await Promise.all([
          user_response.validate(),
          address_response.validate(),
        ]);
        await Promise.all([user_response.save(), address_response.save()]);
        const token = jwt.sign({ user_id: user_response._id.toString() });
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", token, {
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          })
        );
      } catch (error) {
        res.status(400).send("Invalid Request");
      }
      break;
    case "DELETE":
      try {
        const email_check = await User.findOne({
          email_address,
        }).lean();
        if (email_check === null)
          return res.status(400).json({
            email_address: "Invalid Email Address",
          });
        if (email_check.phone_number !== parseInt(phone_number))
          return res.status(400).json({
            phone_number: "Invalid Phone Number",
          });
        if (password !== cPassword)
          return res.status(400).json({
            cPassword: "Password didn't match",
          });
        await User.findOneAndUpdate(
          { email_address },
          {
            $set: {
              password: bcrypt.hashSync(password, saltRounds),
            },
          }
        );
        res.end();
      } catch (error) {
        res.status(400).send("Invalid Request");
      }
      break;
  }
};
