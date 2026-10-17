Snitch2.0 — Full Stack E-Commerce Application

Snitch2.0 is a full-stack e-commerce web application designed to provide a smooth online shopping experience for customers and product management features for sellers.

Features

- User registration and login
- Google OAuth authentication
- JWT-based authentication and protected routes
- Buyer and seller roles
- Seller dashboard and product management
- Product listing and browsing
- Shopping cart and wishlist
- Order placement and order management
- Multiple payment options, including Cash on Delivery and mock payment
- AI-powered product recommendations using Google Gemini
- Responsive user interface

Tech Stack

Frontend

- React
- JavaScript
- Tailwind CSS

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

Authentication

- JWT
- Google OAuth

AI Integration

- Google Gemini API

Deployment

- Render

Project Structure

Snitch2.0/
├── Backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── validators/
└── Frontend/
    └── frontend-ecom/
        └── src/

Getting Started

1. Clone the repository

git clone https://github.com/Virendrawebdev/myProjects
cd Snitch2.0

2. Backend Setup

cd Backend
npm install
npm run dev

Configure your environment variables in the backend ".env" file.

3. Frontend Setup

Open a new terminal:

cd Frontend/frontend-ecom
npm install
npm run dev

Configure the frontend API URL according to your local development setup.

Environment Variables

Add the required environment variables to your local ".env" file. These may include:

- "PORT"
- "MONGODB_URI"
- "JWT_SECRET"
- "GOOGLE_CLIENT_ID"
- "GOOGLE_CLIENT_SECRET"
- "GOOGLE_CALLBACK_URL"
- "FRONTEND_URL"
- "GEMINI_API_KEY"

Never commit ".env" files or expose secret keys.

Live Demo

https://myprojects-r2rg.onrender.com

Future Improvements

- Complete and enhance AI shopping assistance
- Improve automated testing
- Add further security and performance improvements

Author

Virendra

Full Stack Web Development Learner