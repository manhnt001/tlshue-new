# Hướng dẫn Setup & Run Project

## 1. Cài đặt Node.js
Đảm bảo máy tính đã được cài đặt Node.js (khuyến nghị sử dụng phiên bản LTS).
- Tải Node.js tại: [https://nodejs.org/](https://nodejs.org/)

Kiểm tra sau khi cài đặt:
```bash
node -v
npm -v
```

## 2. Cài đặt thư viện (Dependencies)
Mở Terminal hoặc Command Prompt tại thư mục gốc của dự án. Chạy lệnh:
```bash
npm install
```
Lệnh này sẽ tải và cài đặt toàn bộ thư viện cần thiết cho dự án.

*(Lưu ý: Dự án có file `pnpm-workspace.yaml`, nếu sử dụng pnpm có thể thay thế bằng lệnh: `pnpm install`)*

## 3. Cấu hình biến môi trường (.env)
Dự án sử dụng file cấu hình môi trường `.env`. Hiện tại dự án có sẵn file mẫu: `.env.example`.

Tạo file `.env` từ file mẫu:
```bash
cp .env.example .env
```
*(Đối với Windows có thể thực hiện thủ công: Copy file `.env.example` -> Đổi tên thành `.env`)*

Sau đó mở file `.env` và cập nhật các thông tin cấu hình cần thiết. Ví dụ:
```env
FIREBASE_API_KEY=...
FIREBASE_PROJECT_ID=...
```

## 4. Chạy dự án ở môi trường Development
Sau khi cài đặt xong thư viện và cấu hình `.env`, chạy lệnh:
```bash
npm run dev
```
Hệ thống sẽ khởi động Development Server.

## 5. Truy cập ứng dụng
Sau khi chạy thành công, mở trình duyệt và truy cập:
👉 **[http://localhost:5173/](http://localhost:5173/)**

---

## 6. Xử lý lỗi thường gặp

### Lỗi thiếu thư viện
Nếu gặp lỗi liên quan đến package/module (ví dụ: `Module not found`), hãy chạy lại:
```bash
npm install
```

### Lỗi thay đổi file .env không nhận
Sau khi chỉnh sửa file `.env`, hệ thống thường không tự nhận diện thay đổi. Bạn cần:
1. Tắt server hiện tại (nhấn `Ctrl + C` trong Terminal).
2. Chạy lại lệnh: `npm run dev`

---

## 🚀 Quy trình chạy nhanh
Thực hiện lần lượt các lệnh sau:
```bash
npm install
cp .env.example .env
# (Mở và cập nhật nội dung file .env nếu cần)
npm run dev
```
Truy cập: **[http://localhost:5173/](http://localhost:5173/)**