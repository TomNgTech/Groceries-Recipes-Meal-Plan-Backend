const request = require('supertest')
const app = require('../app')

describe('Recipes test suite', () => {
  // tests if get route works for all recipes
  it('tests /recipes endpoints', async () => {
    const response = await request(app).get('/recipes')
    expect(response.body).toHaveLength(2)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          createdAt: '2023-02-08T00:17:49.246Z',
          dishName: 'dish 2',
          id: '2',
          ingredients: [
            { measurementType: 'bottle', name: 'ingredient 2', quantity: 1 }
          ],
          servingSize: 1,
          updatedAt: '2023-02-08T00:17:49.246Z'
        },
        {
          createdAt: '2023-02-07T23:11:51.541Z',
          dishName: 'dish 1',
          id: '1',
          ingredients: [
            { measurementType: 'bottle', name: 'ingredient 1', quantity: 1 }
          ],
          servingSize: 1,
          updatedAt: '2023-02-07T23:11:51.541Z'
        }
      ])
    )
  })

  // test if get route works for specific recipe based on id
  it('tests /recipes/:id ', async () => {
    const response = await request(app).get('/recipes/1')
    expect(response.statusCode).toBe(200)
  })

  // tests if /recipes/:id returns correct status code if recipe is not found
  it('tests /recipes endpoints', async () => {
    const response = await request(app).get('/recipes/3')
    expect(response.body).toEqual({ error: 'Recipe not found' })
    expect(response.statusCode).toBe(404)
  })
})

describe('POST /todo', () => {
  const NewRecipe = {
    id: '3',
    dishName: 'dish 3',
    ingredients: [
      {
        name: 'ingredient 2',
        quantity: 1,
        measurementType: 'bottle'
      }
    ],
    servingSize: 1,
    createdAt: 123412341234,
    updatedAt: 123412341234
  }
  afterAll(async () => {
    await request(app).delete(`/recipes/${NewRecipe.id}`)
  })
  it('NewRecipe should be added to database', async () => {
    const response = await request(app).post('/recipes/').send(NewRecipe)
    const recipes = await request(app).get(/recipes/)

    expect(recipes.body[2].createdAt).not.toBe(123412341234)
    expect(recipes.body[2].createdAt).not.toBe(123412341234)
    expect(recipes.body[2].dishName).toBe('dish 3')
    expect(recipes.body[2].id).toBe('3')
    expect(response.statusCode).toBe(200)
  })

  it('Tests if createdAt and updatedAt are not what is entered', async () => {
    await request(app).post('/recipes/').send(NewRecipe)
    const recipes = await request(app).get(/recipes/)
    expect(recipes.body[2].createdAt).not.toBe(123412341234)
    expect(recipes.body[2].createdAt).not.toBe(123412341234)
  })
})

describe('Delete one todo', () => {
  const NewRecipe = {
    id: '3',
    dishName: 'dish 3',
    ingredients: [
      {
        name: 'ingredient 2',
        quantity: 1,
        measurementType: 'bottle'
      }
    ],
    servingSize: 1,
    createdAt: 123412341234,
    updatedAt: 123412341234
  }
  beforeAll(async () => {
    await request(app).post('/recipes').send(NewRecipe)
  })

  it('should delete one item', async () => {
    const response = await request(app).delete(`/recipes/${NewRecipe.id}`)
    const recipe = response.body.data
    expect(recipe).toBe(undefined)
  })
})
