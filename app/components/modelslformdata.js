import mongoose from "mongoose";

const FormDataSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.models.FormData || mongoose.model("FormData", FormDataSchema);
