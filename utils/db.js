import mongoose from "mongoose";
async function db() {
  return mongoose.connect(
    `${process.env.DATA_BASE}/ProductDetails?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}

export default db;
