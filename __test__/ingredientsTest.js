const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mockData = require('./mockData');
const app = require('../app');

const mock = new MockAdapter(axios);

describe('Ingredients API', () => {
  it('should fetch all ingredients', async () => {
    mock.onGet('/ingredients').reply(200, mockData.ingredients);

    const response = await axios.get('/ingredients');

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockData.ingredients);
  });

  it('should fetch a specific ingredient by id', async () => {
    const ingredientId = '123';

    mock.onGet(`/ingredients/${ingredientId}`).reply(200, mockData.ingredients.find(ingredient => ingredient.id === ingredientId));

    const response = await axios.get(`/ingredients/${ingredientId}`);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockData.ingredients.find(ingredient => ingredient.id === ingredientId));
  });

  it('should add a new ingredient', async () => {
    const newIngredient = {
      id: '456',
      name: 'New Ingredient',
      measurementType: 'Cup'
    };

    mock.onPost('/ingredients', newIngredient).reply(200, newIngredient);

    const response = await axios.post('/ingredients', newIngredient);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(newIngredient);
  });

  it('should delete an ingredient by id', async () => {
    const ingredientId = '789';

    mock.onDelete(`/ingredients/${ingredientId}`).reply(200, mockData.ingredients.filter(ingredient => ingredient.id !== ingredientId));

    const response = await axios.delete(`/ingredients/${ingredientId}`);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockData.ingredients.filter(ingredient => ingredient.id !== ingredientId));
  });
});
