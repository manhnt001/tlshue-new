Write-Host "1. Tạm thời chuyển ảnh về chỗ cũ để Node có thể đọc được file .ts..."
if (Test-Path "public/img") {
    Move-Item -Path "public/img" -Destination "src/" -Force
}

Write-Host "2. Chạy lại script migrate..."
npx tsx migrate.ts

Write-Host "3. Chuyển ảnh trở lại thư mục public..."
if (Test-Path "src/img") {
    Move-Item -Path "src/img" -Destination "public/" -Force
}

Write-Host "4. Xong! Bạn hãy chạy lại npm run dev"
