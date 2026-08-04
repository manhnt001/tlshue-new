import fs from 'fs';
import path from 'path';
import { exhibitionData } from './src/app/data/exhibition';

const outputDir = path.resolve(process.cwd(), 'src/app/data/json-panels');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Hàm hỗ trợ đổi đường dẫn ảnh cũ thành đường dẫn tĩnh mới
function updateImagePath(imgStr) {
  if (!imgStr) return imgStr;
  // Bỏ đi các tiền tố import dạng ../../../img/pano/ hoặc src/img/pano/
  // Thường trong object exhibitionData, image property được Vite giải quyết thành chuỗi /src/img/... hoặc tương tự khi chạy node?
  // Nhưng vite-node sẽ giữ nguyên hoặc map. Để an toàn, chúng ta regex tìm tên file.
  
  if (typeof imgStr === 'string' && imgStr.includes('img/pano/')) {
    const filename = imgStr.split('/').pop();
    return `/img/pano/${filename}`;
  }
  return imgStr;
}

exhibitionData.forEach(item => {
  // Đổi image
  item.image = updateImagePath(item.image);
  
  // Đổi slides image
  if (item.slides) {
    item.slides.forEach(slide => {
      slide.thumbUrl = updateImagePath(slide.thumbUrl);
      if (slide.images) {
        slide.images = slide.images.map(img => {
          if (typeof img === 'string') return updateImagePath(img);
          return { ...img, url: updateImagePath(img.url) };
        });
      }
      if (slide.sections) {
        slide.sections.forEach(sec => {
          if (sec.images) {
            sec.images = sec.images.map(img => {
              if (typeof img === 'string') return updateImagePath(img);
              return { ...img, url: updateImagePath(img.url) };
            });
          }
        });
      }
    });
  }

  const filename = path.join(outputDir, `${item.id}.json`);
  fs.writeFileSync(filename, JSON.stringify(item, null, 2));
  console.log(`Đã tạo: ${filename}`);
});

console.log("Di chuyển dữ liệu thành công!");
