const dynamoose = require('dynamoose')

const recipeSchema = new dynamoose.Schema(
  {
    id: { type: String, required: true },
    dishName: { type: String, required: true },
    ingredients: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            measurementType: { type: String, required: true }
          }
        }
      ]
    },
    servingSize: { type: Number, required: true }
  },
  {
    saveUnknown: false,
    timestamps: true
  }
)

module.exports = dynamoose.model('Recipe', recipeSchema)
