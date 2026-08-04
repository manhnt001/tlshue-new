Write-Host "1. Di chuyen thu muc hinh anh..."
if (!(Test-Path public)) { New-Item -ItemType Directory -Path public }
if (!(Test-Path public/img)) { New-Item -ItemType Directory -Path public/img }
if (Test-Path src/img) { 
    Move-Item -Path src/img/* -Destination public/img/ -Force -Recurse
    Remove-Item src/img -Recurse -Force
    Write-Host "Da chuyen hinh anh sang public/img."
}

Write-Host "2. Cai dat cac thu vien can thiet cho CMS..."
npm install -D decap-server vite-node concurrently

Write-Host "3. Chay script migrate du lieu tu .ts sang .json..."
npx vite-node migrate.ts

Write-Host "Hoan tat setup CMS co ban!"
