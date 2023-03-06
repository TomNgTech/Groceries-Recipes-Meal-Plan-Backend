# **Recipes API**

The Recipes API is a RESTful web service that allows users to manage recipes. The API provides endpoints for retrieving, creating, updating and deleting recipes.


#Base URL
http://localhost:3000/


# Authentication
The Recipe/Recipes API is open and does not require any authentication. Any client can access the API and retrieve recipe data.


# Endpoints
The following endpoints are available in the Recipe/Recipes API:

**GET /recipes**
Retrieves a list of all recipes.

**GET /recipes/:id**
Retrieves a single recipe with the specified id.

**POST /recipes**
Creates a new recipe with the provided data.

**PUT /recipes/:id**
Updates an existing recipe with the specified id.

**DELETE /recipes/:id**
Deletes a recipe with the specified id.


# Data Structures
**Recipe**

A recipe has the following properties:

| Parameter	| Type | Description |
| --- | --- | --- |
| id	| string	| The unique identifier of the recipe. |
| dishName	| string	| The name of the dish associated with the recipe. |
| ingredients	| string	| An array of objects representing the ingredients required for the recipe.  |
| name	| string	| The name of the ingredient. |
| quantity	| integer	| The quantity of the ingredient required for the recipe. |
| measurementType	| string	| The type of measurement used to measure the quantity of the ingredient. |
| servingSize	| integer	| The serving size of the dish associated with the recipe. |
| createdAt	| string	| The timestamp when the recipe was created. |
| updatedAt	| string	| The timestamp when the recipe was last updated. |

_*the timestamp is represented as a string in ISO 8601 format, which includes the date and time in UTC timezone. For example, "2023-02-08T00:17:49.246Z" represents February 8th, 2023 at 12:17:49.246 AM UTC._

# Response Codes
The response for a successful request to create a new recipe will include the newly created recipe with its corresponding id.

The following response codes may be returned by the Recipe/Recipes API:\
**200 OK:** The request was successful.\
**201 Created:** The resource was created successfully.\
**204 No Content:** The resource was deleted successfully.

## Error
error: A string that describes the error that occurred:\
**400 Bad Request:** The request was malformed or invalid.\
**404 Not Found:** The requested resource was not found.\
**500 Internal Server Error:** An unexpected error occurred on the server.
