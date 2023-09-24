const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");

const todoSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
    todo: { type: String, required: true },
  },
  {
    timestamps: false,
  }
);

todoSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
todoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Todo", todoSchema);
