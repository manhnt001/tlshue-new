Write-Host "Don dep cac file .ts cu..."
Get-ChildItem -Path "src/app/data/panels" -Filter "*.ts" | Where-Object { $_.Name -ne "types.ts" } | Remove-Item -Force
Write-Host "Hoan tat don dep!"
