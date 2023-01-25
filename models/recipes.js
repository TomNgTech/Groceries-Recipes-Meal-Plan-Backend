const dynamoose = require("dynamoose");

const recipeSchema = new dynamoose.Schema(
    {
        id: Number,
        dishName: String,
    },
    {
        saveUnknown: true,
        timestamps: true,
    }
);

module.exports = dynamoose.model("Recipe", recipeSchema);
