const axios = require('axios')
const gets = require('./MockRoutes/MockRecipeGetRoute')
const API_URL = require('../axiosConfig')

jest.mock('axios')

describe('test get methods', () => {
  const mockRecipe = [
    {
      id: '1',
      dishName: 'dish one',
      ingredients: [
        {
          name: 'ingredient 2',
          quantity: 1,
          measurementType: 'bottle',
        },
      ],
      servingSize: 1,
      createdAt: 123412341234,
      updatedAt: 123412341234,
    },
    {
      id: '2',
      dishName: 'dish two',
      ingredients: [
        {
          name: 'ingredient 1',
          quantity: 1,
          measurementType: 'bottle',
        },
        {
          name: 'ingredient 2',
          quantity: 1,
          measurementType: 'more bottle',
        },
      ],
      servingSize: 1,
      createdAt: 123412341234,
      updatedAt: 123412341234,
    },
  ]

  it('fetches all recipes', async () => {
    axios.get.mockResolvedValueOnce(mockRecipe)
    const recipe = await gets.getRecipes()
    expect(axios.get).toHaveBeenCalledWith(API_URL)
    expect(recipe[0].id).toEqual('1')
    expect(recipe[0].dishName).toBe('dish one')
    expect(recipe[0].ingredients.length).toBe(1)
    expect(recipe[1].id).toEqual('2')
    expect(recipe[1].dishName).toBe('dish two')
    expect(recipe[1].ingredients.length).toBe(2)
  })

  it('fetches specific item', async () => {
    axios.get.mockResolvedValueOnce(mockRecipe)
    const getRecipesById = gets.getRecipesById
    const recipe = await getRecipesById(1)
    expect(axios.get).toHaveBeenCalledWith(API_URL + '/1')
    expect(recipe.id).toEqual('1')
    expect(recipe.dishName).toBe('dish one')
    expect(recipe.ingredients.length).toBe(1)
  })
})
