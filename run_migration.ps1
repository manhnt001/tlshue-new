Write-Host "1. Chuan hoa file .ts..."
node fix_imports.js
Write-Host "2. Chay migrate data sang JSON..."
npx tsx migrate.ts
Write-Host "3. Chuyen doi hoan tat!"
