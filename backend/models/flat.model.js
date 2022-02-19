const { Schema, model } = require("mongoose");

const flatSchema = new Schema(
  { 
    block: { type: String, required: true },
    flat_number: { type: Number, required: true },
    type: { type: String, required: true },
    image: {type: String},
    residents: [
      {
        type: Schema.Types.ObjectId,
        ref: "resident"
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = model("flat", flatSchema);
