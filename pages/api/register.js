import db from "../../utils/db";
import Register from "../../models/Register";
import Address from "../../models/Address";
import Cart from "../../models/Cart";
import UnderProcess from "../../models/UnderProcess";
import Order from "../../models/Order";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import moment from "moment";

db();

export default async (req, res) => {
  const { method } = req;
  const {
    fName,
    mName,
    lName,
    emailAddress,
    phoneNumber,
    birthDate,
    gender,
    street,
    landMark,
    city,
    district,
    state,
    country,
    pinCode,
    question1,
    question2,
    password,
    cPassword,
  } = req.body;
  const saltRounds = 15;
  const camelCase = (str) => {
    const split = str.toLowerCase().split(" ");
    const camel = split.map((e) => {
      return `${e.substr(0, 1).toUpperCase()}${e.substr(1, e.length)}`;
    });
    return camel.join(" ");
  };
  switch (method) {
    case "POST":
      try {
        const emailCheck = await Register.find({
          emailAddress: emailAddress,
        });

        if (emailCheck.length === 0) {
          return res.status(201).json({
            success: false,
            emailAddress: "Invalid Email Address",
          });
        }
        const passwordMatch = await bcrypt.compare(
          password,
          emailCheck[0].password
        );
        if (!passwordMatch) {
          return res.status(201).json({
            success: false,
            password: "Invalid Password",
          });
        }
        res
          .setHeader(
            "Set-Cookie",
            cookie.serialize("token", emailCheck[0].auth, {
              maxAge: 60 * 60 * 24 * 7,
              path: "/",
            })
          )
          .status(200)
          .json({ success: true });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Invalid Request! Please try later",
        });
      }
      break;
    case "PUT":
      try {
        const emailCheck = await Register.find({
          emailAddress: emailAddress,
        });
        if (emailCheck.length !== 0) {
          return res.status(201).json({
            success: false,
            emailAddress: "User Already Exit",
          });
        }
        if (password !== cPassword) {
          return res.status(201).json({
            success: false,
            cPassword: "Password didn't match",
          });
        }
        const auth = jwt.sign({ auth_id: emailAddress }, lName);
        const register = await new Register({
          auth: auth,
          fName: camelCase(fName),
          mName: camelCase(mName),
          lName: camelCase(lName),
          emailAddress: emailAddress,
          phoneNumber: phoneNumber,
          birthDate: birthDate,
          gender: gender,
          street: street,
          landMark: landMark,
          city: camelCase(city),
          district: camelCase(district),
          state: camelCase(state),
          country: camelCase(country),
          pinCode: pinCode,
          question1: camelCase(question1),
          question2: camelCase(question2),
          password: bcrypt.hashSync(password, saltRounds),
          cPassword: bcrypt.hashSync(cPassword, saltRounds),
        });
        const address = await new Address({
          auth: auth,
          address: [
            {
              street: street,
              landMark: landMark,
              city: camelCase(city),
              district: camelCase(district),
              state: camelCase(state),
              country: camelCase(country),
              pinCode: pinCode,
            },
          ],
        });
        const cart = await new Cart({
          auth: auth,
          cart: [],
        });
        const underProcess = await new UnderProcess({
          auth: auth,
          underProcess: [],
        });

        const order = await new Order({
          auth: auth,
          order: [],
        });
        await register.save();
        await address.save();
        await cart.save();
        await underProcess.save();
        await order.save();
        res
          .setHeader(
            "Set-Cookie",
            cookie.serialize("token", auth, {
              maxAge: 60 * 60 * 24 * 7,
              path: "/",
            })
          )
          .status(200)
          .json({ success: true });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Invalid Request! Please try later",
        });
      }
      break;

    case "DELETE":
      try {
        const emailCheck = await Register.find({
          emailAddress: emailAddress,
        });
        if (emailCheck.length === 0) {
          return res.status(201).json({
            success: false,
            emailAddress: "Invalid Email Address",
          });
        }
        if (emailCheck[0].phoneNumber !== parseInt(phoneNumber)) {
          return res.status(201).json({
            success: false,
            phoneNumber: "Invalid Phone Number",
          });
        }
        if (
          moment(`${emailCheck[0].birthDate}`).format("YYYY-MM-DD") !==
          birthDate
        ) {
          return res.status(201).json({
            success: false,
            birthDate: "Invalid Date of Birth",
          });
        }
        if (emailCheck[0].question1 !== camelCase(question1)) {
          return res.status(201).json({
            success: false,
            question1: "Wrong Answer",
          });
        }
        if (emailCheck[0].question2 !== camelCase(question2)) {
          return res.status(201).json({
            success: false,
            question2: "Wrong Answer",
          });
        }
        if (password !== cPassword) {
          return res.status(201).json({
            success: false,
            cPassword: "Password didn't match",
          });
        }
        const matches = await bcrypt.compare(password, emailCheck[0].password);
        if (matches) {
          return res.status(201).json({
            success: false,
            password: "Create new Password",
          });
        }
        await Register.updateOne(
          { emailAddress: emailAddress },
          {
            $set: {
              password: bcrypt.hashSync(password, saltRounds),
              cPassword: bcrypt.hashSync(cPassword, saltRounds),
            },
          }
        );
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Invalid Request! Please try later",
        });
      }
      break;
  }
};
