var express = require("express");
var router = express.Router();

const mockData = [  
    { 
        id: '1', 
        dishName: 'Grilled Chicken Caesar Salad',
        ingredients: [
            { name: 'chicken breast', quantity: '2', measurementType: 'unit'},
            { name: 'lettuce', quantity: '1', measurementType: 'unit'},
            { name: 'caesar dressing', quantity: '100', measurementType: 'ml'}
        ],
        servingSize: 2
    },
    { 
        id: '2', 
        dishName: 'Steak and Potatoes',
        ingredients: [
            { name: 'ribeye steak', quantity: '1', measurementType: 'unit'},
            { name: 'potatoes', quantity: '4', measurementType: 'unit'},
            { name: 'butter', quantity: '50', measurementType: 'gram'}
        ],
        servingSize: 2
    },
    {
        id: '3', 
        dishName: 'Chicken and Potatoes',
        ingredients: [
            { name: 'chicken tighs', quantity: '4', measurementType: 'unit'},
            { name: 'potatoes', quantity: '5', measurementType: 'unit'},
            { name: 'butter', quantity: '70', measurementType: 'gram'}
        ],
        servingSize: 4
    }
];


router.get('/', (req, res) => {
    const recipesData = mockData.filter((recipe) => {
        if (recipe.id && recipe.dishName && recipe.ingredients && recipe.servingSize) {
            return recipe;
        }
    });

    if (recipesData.length === 0) {
        return res.status(404).json({
            message: 'No recipes found'
        });
    }

    return res.status(200).json(recipesData);
});


module.exports = router;
