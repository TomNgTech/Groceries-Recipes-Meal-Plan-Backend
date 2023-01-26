const dynamoose = require("dynamoose");

const recipeSchema = new dynamoose.Schema(
    {
        id: { type: String, required: true, hashKey: true },
        dishName: { type: String, required: true },
        ingredients: [
            {
                name: { type: String, required: true },
                quantity: { type: String, required: true },
            }
        ],
        servingSize: { type: Number, required: true },
    },
    {
        saveUnknown: true,
        timestamps: true,
    }
);

module.exports = dynamoose.model("Recipe", recipeSchema);
