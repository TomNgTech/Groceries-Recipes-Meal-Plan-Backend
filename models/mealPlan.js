const dynamoose = require('dynamoose')
const mealPlanSchema = new dynamoose.Schema(
  {
    id: { type: String, required: true },
    month: { type: Number, required: true },
    weekInfo: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            weekNum: { type: String, require: true },
            dishId: { type: String, required: true },
            dishName: { type: String, required: true }
          }
        }
      ]
    }
  },
  {
    saveUnknown: false,
    timestamps: true
  }
)

module.exports = dynamoose.model('Meal Plan', mealPlanSchema)
