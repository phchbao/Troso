# Real Estate Rental and Lodger Management System - Room Plus

Room Plus is a real estate rental and lodger management system. It is a web application that allows two types of users to use the application. The two types of users are the owner and the lodger. The owner can post a room for rent, manage lodgers, register rent payment, and create a room contract. The lodger can search and filter rooms, view room details, send an email to the owner of the room, and use the built-in chat application for communication between the owner and the lodger.

Live Site - [Room Plus](https://room-plus.onrender.com/)

https://drive.google.com/drive/folders/1vXDBYpDk2BLtcKTxq3hQgihG2x18_iBj?usp=sharing


## Features

- Post a room for rent
- Search and filter rooms
- View room details
- Built-in Chat Application for communication between owner and lodger
- Secure JWT authentication using access and refresh tokens
- Send emails between owner and lodger
- Create Room Contract
- Manage lodgers
- Register Rent Payment

## Configuration and Installation Instructions

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [React.js](https://facebook.github.io/react/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Ethereal Email](https://ethereal.email/)

1. Clone the repository:

```bash
$ git clone https://github.com/SonamRinzinGurung/Real-Estate-Rental-and-Lodger-Management-System.git
```

2. Install the required packages for the backend:

```bash
$ cd server
$ npm install
```

3. Open a new terminal session and install the required packages for the frontend:

```bash
$ cd client
$ npm install
```

4. Configure the environment variables inside the server folder:

```bash

- create a .env file and add the following variables:
- generate secret keys for jwt tokens using online tools

MONGO_URI= <your_mongo_uri>
ACCESS_TOKEN_SECRET_OWNER= <your_access_token_secret_owner>
ACCESS_TOKEN_SECRET_TENANT= <your_access_token_secret_lodger>
REFRESH_TOKEN_SECRET_OWNER= <your_refresh_token_secret_owner>
REFRESH_TOKEN_SECRET_TENANT= <your_refresh_token_secret_lodger>
ACCESS_LIFETIME=15m
REFRESH_LIFETIME=7d
CLOUDINARY_API_KEY= <your_cloudinary_api_key>
CLOUDINARY_API_SECRET= <your_cloudinary_api_secret>
RESET_PASSWORD_KEY= <your_reset_password_key>
EMAIL_VERIFICATION_KEY= <your_email_verification_key>
CLIENT_URL=http://localhost:3000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER= <your_gmail_address>
EMAIL_PASS= <your_gmail_pass> or <your_gmail_app_password>
```

5. Configure the environment variables inside the client folder:

```bash

- create a .env.local file and add the following variables:

VITE_APP_BASE_URL=http://localhost:3000
VITE_APP_API_URL=http://localhost:5000/api
VITE_APP_API_HOST=http://localhost:5000
```

6. Run the application:

```bash
$ cd server
$ npm run dev
```
*** 
### Author

[Sonam Rinzin Gurung](https://www.linkedin.com/in/sonam-rinzin-gurung-59060b211/)

### Repository

[Room Plus](https://github.com/SonamRinzinGurung/Real-Estate-Rental-and-Lodger-Management-System)
