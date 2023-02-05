const dynamoose = require("dynamoose");

const ingredientSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
      hashKey: true,
    },
    name: {
      type: String,
      required: true,
    },
    measurementType: {
      type: String,
      required: true,
    },
  },
  {
    saveUnknown: false,
    timestamps: true,
  }
);

module.exports = dynamoose.model("Ingredient", ingredientSchema);
