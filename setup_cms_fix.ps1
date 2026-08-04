Write-Host "1. Don dep va fix loi node_modules..."
if (Test-Path "node_modules") { Remove-Item -Recurse -Force node_modules }
if (Test-Path "package-lock.json") { Remove-Item -Force package-lock.json }
npm install

Write-Host "2. Di chuyen hinh anh..."
if (Test-Path "src/img") {
    Move-Item -Path "src/img" -Destination "public/" -Force
    Write-Host "Da chuyen hinh anh sang public/img."
}

Write-Host "3. Chay script migrate du lieu tu .ts sang .json bang tsx..."
npx tsx migrate.ts

Write-Host "Hoan tat! Bay gio ban co the chay npm run dev"
