import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const panelsDir = path.join(__dirname, 'src/app/data/json-panels');
const files = fs.readdirSync(panelsDir);

console.log('Bắt đầu chuyển đổi dữ liệu Slides sang chuẩn Blocks mới...');

let totalMigratedSlides = 0;

files.forEach(file => {
  if (!file.endsWith('.json')) return;
  const filePath = path.join(panelsDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  let isModified = false;

  if (data.slides && Array.isArray(data.slides)) {
    data.slides.forEach((slide: any) => {
      const blocks: any[] = [];
      
      // 1. leadText -> text_block
      if (slide.leadText) {
        blocks.push({ type: 'text_block', content: slide.leadText });
        delete slide.leadText;
      }
      
      // 2. quote -> quote_block
      if (slide.quote) {
        blocks.push({ type: 'quote_block', quote: slide.quote, source: '' });
        delete slide.quote;
      }
      
      // 3. bodyText -> text_block
      if (slide.bodyText) {
        blocks.push({ type: 'text_block', content: slide.bodyText });
        delete slide.bodyText;
      }
      
      // 4. images -> gallery_block
      if (slide.images && Array.isArray(slide.images) && slide.images.length > 0) {
        blocks.push({ type: 'gallery_block', images: slide.images });
        delete slide.images;
      }
      
      // 5. sections -> section_block(s)
      if (slide.sections && Array.isArray(slide.sections) && slide.sections.length > 0) {
        slide.sections.forEach((sec: any) => {
          blocks.push({
            type: 'section_block',
            title: sec.title || '',
            content: sec.text || '',
            images: sec.images || []
          });
        });
        delete slide.sections;
      }
      
      // 6. footerNote -> text_block with italic
      if (slide.footerNote) {
        blocks.push({ type: 'text_block', content: `*${slide.footerNote}*` });
        delete slide.footerNote;
      }
      
      // Gán blocks vào slide nếu có dữ liệu
      if (blocks.length > 0) {
        slide.blocks = blocks;
        isModified = true;
        totalMigratedSlides++;
      }
    });
  }

  if (isModified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Đã cập nhật file: ${file}`);
  }
});

console.log(`Chuyển đổi hoàn tất! Đã cập nhật cấu trúc cho ${totalMigratedSlides} slides.`);
