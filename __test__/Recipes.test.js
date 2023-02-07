const request = require('supertest')
const app = require('../app')

// tests for get with dish 1 in db
describe('Recipes test suite', () => {
  // tests if get route works for all recipes
  it('tests /recipes endpoints', async () => {
    const response = await request(app).get('/recipes')
    expect(response.body).toHaveLength(1)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          createdAt: '2023-02-05T21:39:53.244Z',
          dishName: 'dish 1',
          id: '1',
          ingredients: [
            { measurementType: 'bottle', name: 'ingredient 1', quantity: 1 },
          ],
          servingSize: 1,
          updatedAt: '2023-02-05T21:39:53.244Z',
        },
      ]),
    )
  })

  // test if get route works for specific recipe based on id
  it('tests /recipes/:id ', async () => {
    const response = await request(app).get('/recipes/1')
    expect(response.body).toEqual({
      createdAt: '2023-02-05T21:39:53.244Z',
      dishName: 'dish 1',
      id: '1',
      ingredients: [
        { measurementType: 'bottle', name: 'ingredient 1', quantity: 1 },
      ],
      servingSize: 1,
      updatedAt: '2023-02-05T21:39:53.244Z',
    }),
      expect(response.statusCode).toBe(200)
  })

  // tests if /recipes/:id returns correct status code if recipe is not found
  it('tests /recipes endpoints', async () => {
    const response = await request(app).get('/recipes/2')
    expect(response.body).toEqual({ error: 'Recipe not found' })
    expect(response.statusCode).toBe(404)
  })
})


