import { ExhibitionItem } from "./types";
import panoImg from "../../../img/pano/2.1.jpg";

export const phan1_1: ExhibitionItem = {
  id: "phan-1-1",
  group: "Phần I",
  title: "Kiến trúc Cung đình",
  image: panoImg,
  description: "Khám phá nghệ thuật kiến trúc đặc sắc của Hoàng thành Huế, với những quy chuẩn khắt khe và triết lý phong thủy sâu sắc.",
  gallery: [
    "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  ],
  slides: [
    {
      id: "demo-html-1",
      thumbUrl: "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Bản thử nghiệm Nhập liệu bằng HTML",
      leadText: "<p>Đây là dòng đầu tiên, được tạo ra bằng <b>mã HTML</b>. Bạn có thể <i>in nghiêng</i>, hoặc tạo danh sách.</p><ul><li>Mục số 1</li><li>Mục số 2</li></ul>",
      bodyText: "<p>Đoạn văn này là <b>bodyText</b>. Bạn hoàn toàn có thể sao chép từ <span style='color: #C89B3C; font-weight: bold;'>Microsoft Word</span> sang một trang HTML Editor và dán đoạn mã sinh ra vào đây.</p><p><br></p><p>Khoảng trống này được tạo bởi thẻ &lt;p&gt; và &lt;br&gt; tự động.</p>",
      images: [
        {
          url: "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          caption: "Ảnh minh họa cho slide thử nghiệm HTML",
          source: "Nguồn ảnh demo"
        }
      ],
      sections: [
        {
          title: "I. Mục nhỏ bằng HTML",
          text: "<p>Tiếp tục dùng <b>dangerouslySetInnerHTML</b> cho mục này. Nó rất <u>tiện lợi</u>!</p>"
        }
      ]
    }
  ]
};
