const axios = require('../axiosConfig')
const getRecipes = require('./index')
const request = require('supertest')
const app = require('../app')


jest.mock('../axiosConfig', () => {
  return {
    baseURL: 'https://jsonplaceholder.typicode.com/albums',
    request: jest.fn().mockResolvedValue({
      data: [
        {
          id: '1',
          dishName: 'dish two',
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
        },
      ],
    }),
  }
})

describe('test getPhotosByAlbumId', () => {
  afterEach(() => jest.resetAllMocks())

  it('fetches photos by album id', async () => {
    const photos = await getRecipes(1)
    console.log(photos.body)
    expect(axios.request).toHaveBeenCalled()
    expect(axios.request).toHaveBeenCalledWith({
      method: 'get',
      url: '/1',
    })
    expect(photos.length).toEqual(1)
    expect(photos[0].id).toEqual('1')
  })
})

// describe('Delete one recipe', () => {
//   const NewRecipe = {
//     id: '3',
//     dishName: 'dish 3',
//     ingredients: [
//       {
//         name: 'ingredient 2',
//         quantity: 1,
//         measurementType: 'bottle',
//       },
//     ],
//     servingSize: 1,
//     createdAt: 123412341234,
//     updatedAt: 123412341234,
//   }
//   beforeAll(async () => {
//     await request(app).post('/recipes').send(NewRecipe)
//   })

//   it('should delete one item', async () => {
//     const response = await request(app).delete(`/recipes/${NewRecipe.id}`)
//     const recipe = response.body.data
//     expect(recipe).toBe(undefined)
//   })
// })
