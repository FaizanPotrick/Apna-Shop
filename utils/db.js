import mongoose from "mongoose";

async function db() {
  return mongoose.connect(
    `${process.env.DATA_BASE}/ApnaShop?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}

export default db;
