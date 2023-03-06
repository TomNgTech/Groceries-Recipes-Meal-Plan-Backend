# Recipes API

The Recipes API is a RESTful web service that allows users to manage recipes. The API provides endpoints for retrieving, creating, updating and deleting recipes.

## Authentication
The Recipe/Recipes API is open and does not require any authentication. Any client can access the API and retrieve recipe data.

## Endpoints
The following endpoints are available in the Recipe/Recipes API:

GET /recipes
Retrieves a list of all recipes.

GET /recipes/:id
Retrieves a single recipe with the specified id.

POST /recipes
Creates a new recipe with the provided data.

PUT /recipes/:id
Updates an existing recipe with the specified id.

DELETE /recipes/:id
Deletes a recipe with the specified id.

## Data Structures
Recipe
A recipe has the following properties:

id: The unique identifier of the recipe.
dishName: The name of the dish associated with the recipe.
ingredients: An array of objects representing the ingredients required for the recipe. Each object has the following properties:
name: The name of the ingredient.
quantity: The quantity of the ingredient required for the recipe.
measurementType: The type of measurement used to measure the quantity of the ingredient.
servingSize: The serving size of the dish associated with the recipe.
createdAt: The timestamp when the recipe was created.
updatedAt: The timestamp when the recipe was last updated.

## Error
An error has the following properties:

error: A string that describes the error that occurred.

## Response Codes
The following response codes may be returned by the Recipe/Recipes API:

200 OK: The request was successful.
201 Created: The resource was created successfully.
204 No Content: The resource was deleted successfully.
400 Bad Request: The request was malformed or invalid.
404 Not Found: The requested resource was not found.
500 Internal Server Error: An unexpected error occurred on the server.
