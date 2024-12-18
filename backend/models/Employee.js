import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    scores: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee",
    },
    assignedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
