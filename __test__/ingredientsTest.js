const axios = require('axios');

// Mock data
const mockIngredients = [  
{    id: '1',    name: 'Salt',    measurementType: 'Teaspoon',  },  
{    id: '2',    name: 'Sugar',    measurementType: 'Cup',  },  
{    id: '3',    name: 'Flour',    measurementType: 'Cup',  },
];

// Set up the mock server
jest.mock('axios');

describe('Ingredients API', () => {
  describe('GET /ingredients', () => {
    it('should return all ingredients', async () => {
      axios.get.mockResolvedValue({ data: mockIngredients });
      const response = await axios.get('/ingredients');

      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockIngredients);
    });
  });

  describe('POST /ingredients', () => {
    it('should create a new ingredient', async () => {
      const newIngredient = {
        id: '4',
        name: 'Olive Oil',
        measurementType: 'Tablespoon',
      };

      axios.post.mockResolvedValue({ data: newIngredient });
      const response = await axios.post('/ingredients', newIngredient);

      expect(response.status).toBe(200);
      expect(response.data).toEqual(newIngredient);
    });
  });

  describe('DELETE /ingredients/:id', () => {
    it('should delete an ingredient', async () => {
      const ingredientToDelete = mockIngredients[0];
      axios.delete.mockResolvedValue({ data: ingredientToDelete });
      const response = await axios.delete(`/ingredients/${ingredientToDelete.id}`);

      expect(response.status).toBe(200);
      expect(response.data).toEqual(ingredientToDelete);
    });
  });
});
