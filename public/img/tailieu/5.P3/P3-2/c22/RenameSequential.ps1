$Extension = "*.jpg"

$files = Get-ChildItem -File -Filter $Extension | Sort-Object {
    $m = [regex]::Match($_.BaseName, '\d+')
    if ($m.Success) { [int]$m.Value } else { [int]::MaxValue }
}

# Đổi sang tên tạm
$i = 1
foreach ($file in $files) {
    Rename-Item $file.FullName "__tmp_$('{0:D6}' -f $i)$($file.Extension)"
    $i++
}

# Đổi thành tên cuối
$i = 1
Get-ChildItem -File -Filter "__tmp_*" | Sort-Object Name | ForEach-Object {
    Rename-Item $_.FullName "$i$($_.Extension)"
    $i++
}

Write-Host "Hoàn thành: $($i-1) file."