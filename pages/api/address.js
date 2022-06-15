import db from "../../utils/db";
import Address from "../../models/Address";

db();

export default async (req, res) => {
  const { method } = req;
  const {
    auth,
    street,
    landMark,
    city,
    district,
    state,
    country,
    pinCode,
    id,
    isEdit,
  } = req.body;
  const { token } = req.query;
  const camelCase = (str) => {
    const split = str.toLowerCase().split(" ");
    const camel = split.map((e) => {
      return `${e.substr(0, 1).toUpperCase()}${e.substr(1, e.length)}`;
    });
    return camel.join(" ");
  };
  switch (method) {
    case "GET":
      try {
        const response = await Address.find({ auth: token });
        if (response.length === 0) {
          return res.status(401).json({
            success: false,
          });
        }
        res.status(200).json({ success: true, response: response[0].address });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      break;
    case "PUT":
      try {
        if (isEdit) {
          try {
            await Address.updateOne(
              { auth: auth, "address._id": id },
              {
                $set: {
                  "address.$": {
                    street: street,
                    landMark: landMark,
                    city: camelCase(city),
                    district: camelCase(district),
                    state: camelCase(state),
                    country: camelCase(country),
                    pinCode: pinCode,
                  },
                },
              }
            );
            return res.status(200).json({ success: true });
          } catch (error) {
            res.status(400).json({
              success: false,
              message: "Invalid Request! Please try later",
            });
          }
        }
        const totalAddress = await Address.find({ auth: auth });
        if (totalAddress[0].address.length >= 10) {
          return res.status(201).json({
            success: false,
            message: "Sorry can't add more than 10 Address",
          });
        }
        await Address.updateOne(
          { auth: auth },
          {
            $push: {
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

    case "DELETE":
      try {
        const response = await Address.find({ auth: auth });
        if (response.length === 1) {
          return res.status(201).json({
            success: false,
            message: "Sorry! You can't delete your last address",
          });
        }
        await Address.updateOne(
          { auth: auth },
          {
            $pull: { address: { _id: id } },
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
