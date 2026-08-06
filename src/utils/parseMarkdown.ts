export function parseMarkdown(text?: string): string {
  if (!text) return "";

  // Nếu đã chứa mã HTML thuần thì trả về nguyên vẹn
  if (/<(p|ul|ol|li|b|i|strong|em|br|div|span|h[1-6]|blockquote)[>\s]/i.test(text)) {
    return text;
  }

  // Chống XSS cơ bản
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // In đậm
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");

  // In nghiêng
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  // Gạch ngang
  html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");

  // Ảnh (Hình ảnh chèn trực tiếp trong văn bản: ![alt](url "title"))
  html = html.replace(/!\[(.*?)\]\(\s*(\S+?)(?:\s+["'](.*?)["'])?\s*\)/g, (match, alt, url, title) => {
    let captionHtml = "";
    if (alt || title) {
      let altStr = alt ? `<p class="text-white/95 font-medium">${alt}</p>` : "";
      let titleStr = title ? `<p class="text-[#C89B3C]/70 italic">${title}</p>` : "";
      captionHtml = `<figcaption class="p-3.5 bg-black/85 border-t border-white/10 text-xs sm:text-sm space-y-0.5 mt-0">${altStr}${titleStr}</figcaption>`;
    }

    return `<figure class="group relative rounded-xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-xl transition-all duration-300 hover:border-[#C89B3C] my-6 pt-2">
<img src="${url}" alt="${alt || ''}" title="${title || ''}" class="w-full h-[250px] sm:h-[400px] md:h-[500px] object-contain mx-auto rounded-lg" loading="lazy" />
<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
  <span class="px-4 py-2 rounded-full bg-[#C89B3C] text-black font-semibold text-xs flex items-center gap-1.5 shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg> 
    Bấm để soi ảnh phóng to
  </span>
</div>
${captionHtml}
</figure>`;
  });

  // Autolinks: &lt;https://...&gt; -> <a href="...">...</a>
  html = html.replace(/&lt;(https?:\/\/[^<>\s]+)&gt;/gi, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#C89B3C] hover:underline hover:text-[#e0b457] transition-colors break-all">$1</a>');

  // Link
  html = html.replace(/\[(.*?)\]\(\s*(\S+?)(?:\s+["'](.*?)["'])?\s*\)/g, (match, text, url, title) => {
    const titleAttr = title ? ` title="${title}"` : '';
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#C89B3C] hover:underline hover:text-[#e0b457] transition-colors"${titleAttr}>${text}</a>`;
  });

  const lines = html.split('\n');
  let inUl = false;
  let inOl = false;
  let inBlockquote = false;
  let parsedHtml = '';

  const closeTags = () => {
    if (inUl) { parsedHtml += '</ul>\n'; inUl = false; }
    if (inOl) { parsedHtml += '</ol>\n'; inOl = false; }
    if (inBlockquote) { parsedHtml += '</blockquote>\n'; inBlockquote = false; }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.length === 0) {
      closeTags();
      continue;
    }

    // Heading (# Heading)
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      closeTags();
      const level = headingMatch[1].length;
      const content = headingMatch[2];
      const sizes = ['text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm'];
      const sizeClass = sizes[level - 1] || 'text-base';
      parsedHtml += `<h${level} class="${sizeClass} font-sans font-bold text-[#C89B3C] mt-5 mb-3 [&_em]:not-italic [&_i]:not-italic">${content}</h${level}>\n`;
      continue;
    }

    // Blockquote (> Quote)
    const blockquoteMatch = line.match(/^>\s*(.*)$/);
    if (blockquoteMatch) {
      if (inUl) { parsedHtml += '</ul>\n'; inUl = false; }
      if (inOl) { parsedHtml += '</ol>\n'; inOl = false; }
      if (!inBlockquote) {
        parsedHtml += '<blockquote class="border-l-4 border-[#C89B3C]/70 pl-4 py-2 my-4 italic text-[#F7F3EB]/80 bg-[#C89B3C]/5 rounded-r-lg">\n';
        inBlockquote = true;
      }
      parsedHtml += `<p>${blockquoteMatch[1]}</p>\n`;
      continue;
    }

    // Unordered Lists (- Item hoặc * Item)
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (inOl) { parsedHtml += '</ol>\n'; inOl = false; }
      if (inBlockquote) { parsedHtml += '</blockquote>\n'; inBlockquote = false; }
      if (!inUl) {
        parsedHtml += '<ul class="list-disc pl-6 my-3 space-y-1.5 marker:text-[#C89B3C]">\n';
        inUl = true;
      }
      parsedHtml += `<li>${line.substring(2)}</li>\n`;
      continue;
    }

    // Ordered Lists (1. Item)
    const olMatch = line.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (inUl) { parsedHtml += '</ul>\n'; inUl = false; }
      if (inBlockquote) { parsedHtml += '</blockquote>\n'; inBlockquote = false; }
      if (!inOl) {
        parsedHtml += '<ol class="list-decimal pl-6 my-3 space-y-1.5 marker:text-[#C89B3C] font-number">\n';
        inOl = true;
      }
      parsedHtml += `<li><span class="font-sans">${olMatch[1]}</span></li>\n`;
      continue;
    }

    // Paragraph bình thường
    closeTags();
    parsedHtml += `<p class="mb-3 leading-relaxed">${line}</p>\n`;
  }

  closeTags();

  // Xử lý các ký tự escape của Markdown (VD: \* -> *, \_ -> _)
  parsedHtml = parsedHtml.replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1');

  return parsedHtml.trim();
}
