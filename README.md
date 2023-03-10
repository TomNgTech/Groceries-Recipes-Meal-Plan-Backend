# Groceries - Recipes - Meal Plans Express.js App

General info about the app

## Cloud Architecture

The Express.js back-end Groceries - Recipes - Meal Plans app was created and maintained using the following **AWS** Cloud Resources:

- 1 set of AWS public **Virtual Private Cloud**: 1 VPC + 2 Subnets + 1 Route Table + 1 Network Connection (Internet Gateway)

- 1 set of AWS **Security Groups Policy** to allow public internet traffic to access the EC2 instance (for API requests).

- 1 AWS **EC2** instance (ubuntu 20.04) functions as a web server to serve & host CRUD REST API Endpoints related to Recipes/Ingredients/MealPlans.

- 1 AWS **Elastic IP Address** attached to the EC2 instance so that the public IP address of the Express.js app will not change in case of a sudden server shutdown.
- 1 set of access key/secret to **AWS DynamoDB** since we would want 3 different tables for 3 sets of APIs (Recipes/Ingredients/MealPlans)

### Create AWS VPC

Visit [AWS Official Document](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-getting-started.html) to learn how to create a new or use the default VPC:

### Create AWS Security Group Policy

Visit [AWS Official Document](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html) for more details.

The EC2 instance should have these inbound ports open:

- 443: used for https (Nginx)
- 80: used for http (Nginx)
- 22: used for ssh
- 3001: used for Express.js server

### Create AWS EC2 Instance

Visit [AWS Official Document](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html) on how to create an AWS EC2 instance. We used `ubuntu 20.04` for our server's operating system.

Once the server has been created, ssh into the server and install these items:

1. git clone for `https://github.com/TungTNg/Groceries-Recipes-Meal-Plan-Backend` inside the user home directory. In our case it was `/home/ubuntu`
2. cd into `Groceries-Recipes-Meal-Plan-Backend` folder, create `.env` file to give access to Dynamoose.js, the ORM we will be using to interact with DynamoDB. The content of `.env` file should follow:
```
AWS_ACCESS_KEY_ID = YOUR_AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY = YOUR_AWS_SECRET
AWS_REGION = REGION_OF_DYNAMODB
```
3. Install `pm2` task manager and create a start the `www` task in `Groceries-Recipes-Meal-Plan-Backend`

4. install `nginx` to direct/forward/proxy pass API requests to Express.js server. The snippet for the setting listed below is the one we used:

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;
                root /home/ubuntu/Groceries-Recipes-Meal-Plan-Frontend/build;
        server_name _;

        location / {
            proxy_pass http://localhost:3001;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
}
```

### Create AWS Elastic IP Address

Visit [AWS Official Document](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html) for how to create an Elastic IP Address and attach it to your EC2 instance

### Create AWS Access Key/Secret for DynamoDB

We need to give a set of access key/secret to [Dynamoose (ORM)](https://dynamoosejs.com/getting_started/Introduction) so visit [AWS Official Document](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html) for how to create AWS access key/secret

## Continuous Integration / Continuous Delivery (CI/CD)

The Express.js backend Groceries - Recipes - Meal Plans app uses [GitHub Actions](https://github.com/features/actions) for both CI & CD pipelines. Continuous Integration (CI) pipeline will run checks for new PR requesting to be merged into `main`. Continuous Delivery (CD) pipeline will deploy code changes to production server once the PR has been merged.

### Continuous Integration (CI) Pipeline

The workflow `.yml` file for CI is inside `.github/workflows` folder, named `test.workflow.yml`. With this workflow file, GitHub Actions's runner will run these checks once a PR is being opened or if there is a new commit pushed to that PR:

- `npm run test`: This will run all of the Jest/React Testing Library test files/cases inside the project
- `npm run lint`: This will check code format for the project

This workflow use [GitHub Action - setup-node package](https://github.com/actions/setup-node)

In order for the Action to able to access & run intergration/end-to-end testings with DynamoDB data, please add these `secrets` into the Github project settings:

- `AWS_ACCESS_KEY_ID`: Your AWS Access Key
- `AWS_SECRET_ACCESS_KEY`: Your AWS Secret Key
- `AWS_REGION`: Region of your AWS DynamoDB

### Continuous Delivery (CD) Pipeline

The workflow `.yml` file for CD is inside `.github/workflows` folder, named `deploy.workflow.yml`. With this workflow file, GitHub Actions's runner will ssh into the production server and run these command lines:

- `cd ~/Groceries-Recipes-Meal-Plan-Backend/`: Go into the project folder, residing in `ubuntu` user `home` folder
- Check out the newly updated remote `main` branch, pull in the latest code changes & install new dependencies packages:

```
git checkout main
git fetch --all
git reset --hard origin/main
git pull origin main
npm install
```
- `sudo pm2 restart www`: Restart pm2 task manager for Node/Express.js task
- `sudo service nginx restart`: Restart nginx server since nginx will be the main proxy pass for our Express.js endpoints

This workflow use [GitHub Action - Appleboy's ssh-action](https://github.com/appleboy/ssh-action)

In order for the Action to able to access & ssh to the production server, please add these `secrets` into the Github project settings:

- `SSH_HOST`: public accessible IP address of the production server
- `SSH_KEY`: ssh key of authorized user for the server
- `SSH_PORT`: 22 (default port for ssh)
- `SSH_USERNAME`: authorized username that can use the ssh key, in my case it was `ubuntu`

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

