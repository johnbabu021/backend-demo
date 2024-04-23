import mongoose from "mongoose";

const storeSchema = mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 40,
    },
    description: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Store", storeSchema);
