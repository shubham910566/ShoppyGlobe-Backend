# ShoppyGlobe Backend

Backend for **ShoppyGlobe** e-commerce platform using **Node.js**, **Express**, and **MongoDB**.  
Provides RESTful APIs for managing products, cart functionality, and user authentication.

##  Setup

### 1. Clone Repository
git clone https://github.com/your-username/shoppyglobe-backend.git  
cd shoppyglobe-backend

### 2. Install Dependencies
npm install

### 3. Set Environment Variables

Create a `.env` file in the root directory and add the following:
MONGO_URI=mongodb://localhost:27017/shoppyglobe  
PORT=5001  
JWT_SECRET=Shubham

### 4. Run the Server
npm start

Server will run at:  
http://localhost:5001

##  Screenshots

###  MongoDB Collections

- **Products Collection**  
I added 10 products by seed.js
  ![Products Collection](screenshots/Product.png)

- **Cart Collection**   
  ![Cart Collection](screenshots/cart_collection1.png)

###  ThunderClient API Tests

- GET /products  
  ![GET Products](screenshots/GET_products.png)

- GET /products/:id  
  ![GET Product by ID](screenshots/GET_product_by_id.png)

- POST /auth/register  
  ![POST Register](screenshots/POST_register.png)

- POST /auth/login  
  ![POST Login](screenshots/POST_login.png)

- POST /cart  
  ![POST Cart](screenshots/POST_cart.png)

- PUT /cart/:id
  ![PUT Cart](screenshots/PUT_cart.png)

- DELETE /cart/:id  
  ![DELETE Cart](screenshots/DELETE_cart.png)



## Project Structure
```
shoppyglobe-backend/
├── controllers/     # Logic for handling requests and business rules
├── models/          # Mongoose models (User, Product, cart, )
├── routes/          # API route definitions
├── middleware/      # Custom middleware (auth, error handling)
├── backend/         # env file
├── Screenshots/     # UI/API screenshots for documentation/demo
├── server.js        # Main application entry point
├── seed.js          # Script for seeding the database
├── package.json     # Project metadata and dependencies
└── README.md        # Project documentation
```




##  Tech Stack

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (Authentication)  
- ThunderClient (API Testing)


