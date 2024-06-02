# Trọ Số

Trọ số là một hệ thống quản lý phòng và cho tìm kiếm phòng trọ. Đây là một ứng dụng web cho phép bên cho thuê và người thuê kết nối với nhau. Chủ sở hữu có thể đăng phòng cho thuê, quản lý ngườiTạo tệp .env chứa các nội dung sau:
```
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

5. Định cấu hình các biến môi trường bên trong thư mục client:

```bash

- Tạo tệp .env.local chứa các nội dung sau:

VITE_APP_BASE_URL=http://localhost:3000
VITE_APP_API_URL=http://localhost:5000/api
VITE_APP_API_HOST=http://localhost:5000
```

6. Khởi chạy chương trình:

```bash
$ cd server
$ npm run dev
```
