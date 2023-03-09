# Backend APIs
**The Backend APIs offer a comprehensive RESTful web service that enables users to effortlessly create, retrieve, modify, and delete their ingredients, recipes, and meal plans. These APIs enable users to efficiently maintain a personal recipe book, providing an organized and convenient way to keep track of their favorite dishes. With this feature, users can streamline the recipe creation process, making it easier than ever before to prepare meals at home. Additionally, these APIs simplify grocery shopping by providing a quick and efficient way to manage the ingredients needed for each recipe.**

# Base URL
## http://localhost:3000/


# Authentication
The APIs are open and does not require any authentication. Any client can access the API and retrieve recipe data.

# **Ingredients API**

The Ingredients API is a RESTful web service that allows users to manage ingredients. The API provides endpoints for retrieving, creating, updating and deleting ingredients.

# Endpoints
The following endpoints are available in the Ingredients API:

**GET /ingredients**
Retrieves a list of all ingredients.

**GET /ingredients/:id**
Retrieves a single ingredient with the specified id.

**POST /ingredients**
Creates a new ingredient with the provided data.

**PUT /ingredients/:id**
Updates an existing ingredient with the specified id.

**DELETE /ingredients/:id**
Deletes an ingredient with the specified id.

# Data Structures
**Ingredient**

An ingredient has the following properties:

| Parameter	| Type | Description |
| --- | --- | --- |
| id	| string	| The unique identifier of the ingredient. |
| name	| string	| The name of the ingredient. |
| measurementType	| string	| The type of measurement used to measure the quantity of the ingredient. |
| createdAt	| string	| The timestamp when the recipe was created. |
| updatedAt	| string	| The timestamp when the recipe was last updated. |

_*the timestamp is represented as a string in ISO 8601 format, which includes the date and time in UTC timezone. For example, "2023-02-08T00:17:49.246Z" represents February 8th, 2023 at 12:17:49.246 AM UTC._

# Response Codes
The response for a successful request to create a new ingredient will include the newly created ingredient with its corresponding id.

The following response codes may be returned by the Ingredients API:\
**200 OK:** The request was successful.\
**201 Created:** The resource was created successfully.\
**204 No Content:** The resource was deleted successfully.

## Error
error: A string that describes the error that occurred:\
**400 Bad Request:** The request was malformed or invalid.\
**404 Not Found:** The requested resource was not found.\
**500 Internal Server Error:** An unexpected error occurred on the server.



# **Recipes API**

The Recipes API is a RESTful web service that allows users to manage recipes. The API provides endpoints for retrieving, creating, updating and deleting recipes.


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

The following response codes may be returned by the Recipes API:\
**200 OK:** The request was successful.\
**201 Created:** The resource was created successfully.\
**204 No Content:** The resource was deleted successfully.

## Error
error: A string that describes the error that occurred:\
**400 Bad Request:** The request was malformed or invalid.\
**404 Not Found:** The requested resource was not found.\
**500 Internal Server Error:** An unexpected error occurred on the server.

# **Meal Plan API**

The Meal Plan API is a RESTful web service that allows users to manage meal plans. The API provides endpoints for retrieving, creating, updating and deleting meal plans.


# Endpoints
The following endpoints are available in the Recipe/Recipes API:

**GET /mealPlans**
Retrieves a list of all meal plans.

**GET /mealPlans/:id**
Retrieves a single meal plan with the specified id.

**GET /mealPlans/:month**
Retrieves all meal plans associated with the specifid month.

**POST /mealPlans/:dishId**
Creates a new meal plan while asociating the repcipe with the dish id specified.

**PUT /mealPlans/:id**
Updates an existing mealPlans with the specified id.

**DELETE /mealPlans/:id**
Deletes a mealPlans with the specified id.


# Data Structures
**Meal Plan**

A mealPlans has the following properties:

| Parameter	| Type | Description |
| --- | --- | --- |
| id	| string	| The unique identifier of the mealPlan. |
| month	| integer	| Month meal plan belongs too. |
| weekInfo	| string	| An array of objects that describe the contents of the meal plan  |
| weekNum	| string	| Week the dish belongs too. |
| dishId	| string	| The id of the dish |
| dishName	| string	| The name of the dish |
| createdAt	| string	| The timestamp when the recipe was created. |
| updatedAt	| string	| The timestamp when the recipe was last updated. |

_*the timestamp is represented as a string in ISO 8601 format, which includes the date and time in UTC timezone. For example, "2023-02-08T00:17:49.246Z" represents February 8th, 2023 at 12:17:49.246 AM UTC._

# Response Codes
The response for a successful request to create a new meal plan will include the newly created meal plan with its corresponding id.

The following response codes may be returned by the Meal Plan API:\
**200 OK:** The request was successful.\
**201 Created:** The resource was created successfully.\
**204 No Content:** The resource was deleted successfully.

## Error
error: A string that describes the error that occurred:\
**400 Bad Request:** The request was malformed or invalid.\
**404 Not Found:** The requested resource was not found.\
**500 Internal Server Error:** An unexpected error occurred on the server.

# **CSV ROUTES**

A group of routes that provide a way to export ingrediants and mealplans to a downloadable CSV file


# Endpoints
The following endpoints are available for CSV Export:

**GET /mealPlans/export/month:**
Retrieves a list of all meal plans.

| id	| Month | Week Number | Dish Name | Dish Id |
| --- | ----- | ----------- |----------- |-------- |
| 2c1619e8-c929-425f-beea-36c0ebafa8dd| 4	| 1	| Pork Chops	| 6220e60b-62c9-43d2-a725-96696e0b079e |
| 0336d521-9043-4425-b485-88aa590f95a6| 11	| 1	| Speghetti	| 83b39f8e-af88-4631-ab9c-b60aea41e71b|
| 23dd3a3b-b755-423c-86a5-ec11c90fa861| 2	| 1	| Pesto Pizza	| 83b39f8e-af88-4631-ab9c-b60aea41e71b |
| 08cb4db1-cf66-4579-88bd-ac23daffe835| 6	| 1	| Beef Stew	| 17ea078d-09fd-4e02-8380-dd7045f4055e |
| 23fe6ac1-d75d-4b73-902d-643723aacd01| 12	| 1	| Tomatoe Soup	| 17ea078d-09fd-4e02-8380-dd7045f4055e |

**GET /mealPlans/export/:monthNum:**
Retrieves a list of all meal plans within a given month.

| January	| | |
| --- | --- | --- |
| Recipe Name: Pecan Crusten Chicken                |
| Recipe Id: 2a17d2b3-3d76-4a1e-8385-2baa9dcf705b   |
| Ingrediants	      | Measurment Type	    | Quantity|
| Pecans	          | Oz	                | 1       |
| Panko Breadcrumbs	| CUP	                | 1.5     |
| Fry Seasoning	    | TBSP	              | 2       |
| Honey	            | TSP	                | 4       |
| Dijon Mustard	    | TSP	                | 4       |
| Mayonnaise	      | TBSP	              | 4       |
| Chicken Cutles	  | Oz                  | 20      |
| Apple	            | PER	                | 2       |
| Italian Dressing	| Oz	                | 3       |
| Mixed Greens	    | Oz	                | 4       |
|                   |                     |         |
| Recipe Name: Mikes Hot Honey Peach Pork Chops	    |
| Recipe Id: bf4bc43f-df15-4175-a9d9-0428d9fe9118   |
| Ingrediants	      | Measurment Type	    | Quantity|
| Pork Chops	      | Oz	                | 20      |
| ...               | ...	                | ...     |


**GET /ingredients/export/ingr:**
Retrieves a list of all ingrediants

| id	| Name | Measurement Type |
| --- | --- | --- |
| 2c1619e8-c929-425f-beea-36c0ebafa8dd	| Milk	          | Cup   |
| 0336d521-9043-4425-b485-88aa590f95a6	| Chicken Breast	| Oz    |
| 23fe6ac1-d75d-4b73-902d-643723aacd01	| Salt	          | TBSP  |
|...                                  	| ...           	| ...   |

