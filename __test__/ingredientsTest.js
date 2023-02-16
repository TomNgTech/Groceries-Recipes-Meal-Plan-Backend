const request = require('supertest')
const app = require('../app')

describe('Ingredients test suite', () => {
  let ingredientId;
  it('POST /ingredients - should create a new ingredient', async () => {
    const res = await request(app)
      .post('/ingredients')
      .send({ name: 'flour', quantity: 2, measurementType: 'cups' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    ingredientId = res.body.id;
  });

  it('GET /ingredients/:id - should get a specific ingredient by ID', async () => {
    const res = await request(app).get(`/ingredients/${ingredientId}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'flour');
    expect(res.body).toHaveProperty('quantity', 2);
    expect(res.body).toHaveProperty('measurementType', 'cups');
  });

  it('GET /ingredients - should get all ingredients', async () => {
    const res = await request(app).get('/ingredients');
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('id', ingredientId);
    expect(res.body[0]).toHaveProperty('name', 'flour');
    expect(res.body[0]).toHaveProperty('quantity', 2);
    expect(res.body[0]).toHaveProperty('measurementType', 'cups');
  });

  it('PUT /ingredients/:id - should update an existing ingredient', async () => {
    const res = await request(app)
      .put(`/ingredients/${ingredientId}`)
      .send({ name: 'flour', quantity: 3, measurementType: 'cups' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'flour');
    expect(res.body).toHaveProperty('quantity', 3);
    expect(res.body).toHaveProperty('measurementType', 'cups');
  });

  it('DELETE /ingredients/:id - should delete an existing ingredient', async () => {
    const res = await request(app).delete(`/ingredients/${ingredientId}`);

    expect(res.statusCode).toEqual(204);
  });
});
