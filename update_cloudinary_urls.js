import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonDir = path.join(__dirname, 'src/app/data/json-panels');
const cloudName = 'nt4z0zzq';
const cloudBaseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1/`;

const files = fs.readdirSync(jsonDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const filePath = path.join(jsonDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace "/img/" with the Cloudinary base URL
  // This will convert "/img/pano/abc.jpg" to "https://res.cloudinary.com/nt4z0zzq/image/upload/v1/pano/abc.jpg"
  const updatedContent = content.replace(/\/img\//g, cloudBaseUrl);
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Đã cập nhật link Cloudinary cho file: ${file}`);
  }
});

console.log("Hoàn tất chuyển đổi đường dẫn ảnh sang Cloudinary!");
