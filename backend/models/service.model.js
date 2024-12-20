import { MaxKey } from "mongodb";
import { Schema, model } from "mongoose";
import { validate } from "uuid";

const ServiceSchema = Schema({
  name: {
    type: String,
    required: [true, "Service name is required!"],
    unique: [true, "Service name must be unique"],
  },
  cost: {
    type: Number,
    required: [true, "Service cost is required!"],
  },
});
const Service = model("Services", ServiceSchema);
export default Service;
