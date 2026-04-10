const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const employerProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    companyName: {
      type: String,
      default: null,
    },

    phone: {
      type: String,
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

employerProfileSchema.index({ userId: 1 });

module.exports = mongoose.model("EmployerProfile", employerProfileSchema);