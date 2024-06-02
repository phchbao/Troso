# Trọ Số
Trọ số là một hệ thống quản lý phòng tìm kiếm phòng trọ. Đây là một ứng dụng web cho phép bên thuê và cho thuê kết nối với nhau. Chủ sở hữu có thể đăng phòng cho thuê, quản lý người ở, đăng ký thanh toán tiền thuê và tạo hợp đồng thuê phòng. Người ở trọ có thể tìm kiếm và lọc phòng, xem chi tiết phòng, gửi email cho chủ phòng và sử dụng ứng dụng trò chuyện tích hợp để liên lạc giữa chủ phòng và người ở trọ.
## Tính năng
- Đăng phòng cho thuê
- Tìm kiếm và lọc phòng
- Xem chi tiết phòng
- Ứng dụng trò chuyện tích hợp để liên lạc giữa chủ sở hữu và người ở trọ
- Xác thực JWT an toàn bằng cách sử dụng mã thông báo truy cập và làm mới
- Gửi email giữa chủ sở hữu và người ở trọ
- Tạo hợp đồng phòng
- Quản lý người ở trọ
- Đăng ký thanh toán tiền thuê nhà
1. Định cấu hình các biến môi trường bên trong thư mục server:
- Tạo tệp .env chứa các nội dung sau:
```bash
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
2. Định cấu hình các biến môi trường bên trong thư mục client:
- Tạo tệp .env.local chứa các nội dung sau:
```bash
VITE_APP_BASE_URL=http://localhost:3000
VITE_APP_API_URL=http://localhost:5000/api
VITE_APP_API_HOST=http://localhost:5000
```
3. Khởi chạy chương trình:
```bash
$ cd server
$ npm run dev
```
