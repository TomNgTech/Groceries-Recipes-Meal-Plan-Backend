const axios = require('../axiosConfig')
const getIngredients = require('./MockIngredientGetRoute')
const request = require('supertest')
const app = require('../app')

jest.mock('../axiosConfig', () => {
  return {
    baseURL: 'https://testurl.com/ingredients',
    request: jest.fn().mockResolvedValue({
      data: [
        {
          id: '1',
          name: 'Ingredient 1',
          quantity: 10,
          measurementType: 'grams'
        }
      ]
    })
  }
})

describe('test getIngredientsById', () => {
  afterEach(() => jest.resetAllMocks())

  it('fetches Ingredient by id', async () => {
    const ingredient = await getIngredients(1)
    expect(axios.request).toHaveBeenCalled()
    expect(axios.request).toHaveBeenCalledWith({
      method: 'get',
      url: '/1'
    })
    expect(ingredient.length).toEqual(1)
    expect(ingredient[0].id).toEqual('1')
  })
})

describe('Delete one ingredient', () => {
  const NewIngredient = {
    id: '3',
    name: 'Ingredient 3',
    quantity: 10,
    measurementType: 'grams'
  }
  beforeAll(async () => {
    await request(app).post('/ingredients').send(NewIngredient)
  })

  it('should delete one item', async () => {
    const response = await request(app).delete(`/ingredients/${NewIngredient.id}`)
    const ingredient = response.body.data
    expect(ingredient).toBe(undefined)
  })
})

describe('Create a new ingredient', () => {
  const NewIngredient = {
    name: 'New Ingredient',
    quantity: 5,
    measurementType: 'ounces'
  }

  it('should create a new ingredient', async () => {
    const response = await request(app).post('/ingredients').send(NewIngredient)
    const ingredient = response.body.data
    expect(ingredient.name).toBe('New Ingredient')
    expect(ingredient.quantity).toBe(5)
    expect(ingredient.measurementType).toBe('ounces')
  })
})
