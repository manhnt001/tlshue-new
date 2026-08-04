import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'src/app/data/panels');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'types.ts');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find import panoImg from "../../../img/pano/XYZ.jpg"
  const importRegex = /import\s+panoImg\s+from\s+["']\.\.\/\.\.\/\.\.\/img\/pano\/([^"']+)["'];?/;
  const match = content.match(importRegex);
  
  if (match) {
    const filename = match[1];
    // Xóa dòng import
    content = content.replace(importRegex, '');
    // Thay thế image: panoImg
    content = content.replace(/image:\s*panoImg\s*,?/, `image: "/img/pano/${filename}",`);
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports in ${file}`);
  }
});
