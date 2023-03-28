import db from "../../utils/db";
import User from "../../models/User";
import Address from "../../models/Address";
import bcrypt from "bcrypt";

db();

export default async (req, res) => {
  const { method } = req;
  const { email_address, phone_number, password, cPassword } = req.body;
  const saltRounds = 15;

  switch (method) {
    case "GET":
      const { user_id } = req.cookies;
      const user_response = await User.findById({
        _id: user_id,
      }).lean();
      res.send(user_response.name);
      break;
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
        res.send(email_check._id);
      } catch (error) {
        res.status(400).send(error.message);
      }
      break;
    case "PUT":
      const {
        name,
        address: { street, landMark, city, district, state, country, pinCode },
      } = req.body;
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
          phone_number,
          password: bcrypt.hashSync(password, saltRounds),
        });
        const address_response = await new Address({
          user_id: user_response._id,
          default: true,
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
        res.send(user_response._id);
      } catch (error) {
        res.status(400).send(error.message);
      }
      break;
  }
};
