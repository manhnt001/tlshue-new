export interface SubImage {
  url: string;
  caption?: string;
  source?: string;
}

export interface ContentSection {
  title?: string;
  text?: string;
  images?: (string | SubImage)[];
}

export interface GallerySlide {
  id: string;
  thumbUrl: string;
  title: string;
  leadText?: string;
  quote?: string;
  bodyText?: string;
  footerNote?: string;
  images?: (string | SubImage)[];
  sections?: ContentSection[]; // Hỗ trợ nhiều cụm Text & Ảnh đan xen trong 1 Thumbnail
}

export interface ExhibitionItem {
  id: string;
  group: string;
  title: string;
  image: string;
  description: string;
  gallery: string[];
  slides?: GallerySlide[];
}

export const exhibitionData: ExhibitionItem[] = [
  {
    id: "khanh-tiet",
    group: "Khánh Tiết",
    title: "Không Gian Khánh Tiết",
    image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Không gian trang trọng mở đầu cho hành trình khám phá di sản Hoàng cung Huế. Nơi hội tụ những giá trị biểu tượng cao quý nhất.",
    gallery: [
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1606625379124-3882167b827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ],
    slides: [
      {
        id: "slide-1",
        thumbUrl: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        title: "Đại Hội Thi Đua Yêu Nước & Khánh Tiết Hoàng Cung",
        leadText: "Tổ chức ngày 11/10/2000. Có 550 đại biểu, trong đó có 450 đại biểu là những tập thể, cá nhân có thành tích xuất sắc nhất, các anh hùng chiến sỹ thi đua, các điển hình tiên tiến xuất sắc đại diện cho nông dân, công nhân lao động, trí thức...",
        quote: "Thi đua là yêu nước, yêu nước thì phải thi đua. Và những người thi đua là những người yêu nước nhất. - Chủ tịch Hồ Chí Minh",
        bodyText: "Không gian Khánh tiết là nơi diễn ra các buổi lễ trọng đại nhất. Triều đình nhà Nguyễn đã xây dựng Điện Thái Hòa và sân Đại Triều Nghi làm trung tâm nghi lễ quốc gia.",
        footerNote: "Nguồn: Trung tâm Lưu trữ Quốc gia III & Trung tâm Bảo tồn Di tích Cố đô Huế.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            caption: "Ảnh tư liệu 1: Toàn cảnh không gian Khánh tiết và sân Đại Triều Nghi.",
            source: "Trung tâm Lưu trữ Quốc gia III"
          },
          {
            url: "https://images.unsplash.com/photo-1606625379124-3882167b827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            caption: "Ảnh tư liệu 2: Bút tích Châu bản quy định nghi lễ đại triều.",
            source: "Lưu trữ Châu bản Triều Nguyễn"
          },
          {
            url: "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            caption: "Ảnh tư liệu 3: Quan viên văn võ tập hợp trước thềm Điện Thái Hòa.",
            source: "Bộ sưu tập Ảnh cổ EFEO"
          }
        ],
        sections: [
          {
            title: "I. Bối Cảnh Lịch Sử & Quy Định Triều Nghi",
            text: "Theo Châu bản triều Nguyễn, nghi lễ Đại triều được tổ chức mỗi tháng 2 lần vào ngày mùng 1 và ngày rằm. Vua mặc triều phục ngự trên ngai vàng, các quan văn võ xếp hàng theo cửu phẩm.",
            images: [
              {
                url: "https://images.unsplash.com/photo-1621886292650-520f76c747d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                caption: "Ảnh 4: Sắc phong và tài liệu lưu trữ năm Tự Đức thứ 5.",
                source: "Trung tâm Lưu trữ Quốc gia I"
              }
            ]
          },
          {
            title: "II. Ý Nghĩa Văn Hóa & Tinh Thần Độc Lập",
            text: "Nghệ thuật chạm khắc và trang trí tại Điện Thái Hòa không chỉ thể hiện đỉnh cao mỹ thuật Cung đình mà còn khắc ghi khát vọng về một quốc gia thái bình thịnh vượng.",
            images: [
              {
                url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                caption: "Ảnh 5: Chi tiết họa tiết rồng vờn mây sơn son thiếp vàng.",
                source: "Bảo tàng Cổ vật Cung đình Huế"
              }
            ]
          }
        ]
      },
      {
        id: "slide-2",
        thumbUrl: "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        title: "Châu Bản & Mộc Bản Triều Nguyễn",
        leadText: "Châu bản và Mộc bản là hai Di sản tư liệu thế giới thuộc Chương trình Ký ức Thế giới của UNESCO.",
        bodyText: "Châu bản là các văn bản hành chính của triều Nguyễn được Vua phê duyệt bằng mực son (châu phê). Mộc bản là các bản gỗ khắc chữ Hán Nôm ngược để in sách.",
        footerNote: "Nguồn: Trung tâm Lưu trữ Quốc gia IV - Đà Lạt.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            caption: "Tư liệu 1: Bản Mộc bản triều Nguyễn khắc bộ Đại Nam Thực Lục.",
            source: "UNESCO Memory of the World"
          },
          {
            url: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            caption: "Tư liệu 2: Bút tích Châu phê của vua Minh Mạng năm 1836.",
            source: "Trung tâm Lưu trữ Quốc gia I"
          }
        ]
      }
    ]
  },
  {
    id: "loi-gioi-thieu",
    group: "Lời Giới Thiệu",
    title: "Về Triển Lãm",
    image: "https://images.unsplash.com/photo-1606625379124-3882167b827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Giới thiệu tổng quan về dự án số hóa di sản, mục đích bảo tồn và phát huy giá trị văn hóa Huế đến công chúng toàn cầu.",
    gallery: [
      "https://images.unsplash.com/photo-1606625379124-3882167b827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    id: "phan-1-1",
    group: "Phần I",
    title: "Kiến trúc Cung đình",
    image: "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Khám phá nghệ thuật kiến trúc đặc sắc của Hoàng thành Huế, với những quy chuẩn khắt khe và triết lý phong thủy sâu sắc.",
    gallery: [
      "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    id: "phan-1-2",
    group: "Phần I",
    title: "Nghệ thuật chạm khắc",
    image: "https://images.unsplash.com/photo-1621886292650-520f76c747d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Chiêm ngưỡng sự tinh xảo trong từng đường nét chạm trổ trên gỗ, đá và khảm sành sứ của các nghệ nhân xưa.",
    gallery: [
      "https://images.unsplash.com/photo-1621886292650-520f76c747d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    id: "phan-1-3",
    group: "Phần I",
    title: "Cảnh quan lăng tẩm",
    image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Sự hòa quyện tuyệt mỹ giữa công trình kiến trúc và thiên nhiên trong quần thể lăng tẩm các vua triều Nguyễn.",
    gallery: [
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    id: "phan-2-1",
    group: "Phần II",
    title: "Đời sống Hoàng tộc",
    image: "https://images.unsplash.com/photo-1606625379124-3882167b827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Những câu chuyện chưa kể về cuộc sống sinh hoạt thường nhật chốn thâm cung.",
    gallery: [
      "https://images.unsplash.com/photo-1606625379124-3882167b827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    id: "phan-2-2",
    group: "Phần II",
    title: "Y phục Cung đình",
    image: "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Quy định về trang phục, triều phục thể hiện sự phân cấp và nét đẹp văn hóa thời Nguyễn.",
    gallery: [
      "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1606625379124-3882167b827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    id: "phan-2-3",
    group: "Phần II",
    title: "Ẩm thực Cung đình",
    image: "https://images.unsplash.com/photo-1621886292650-520f76c747d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Tinh hoa ẩm thực Huế qua những món ăn ngự thiện cầu kỳ, tinh tế mang đậm triết lý âm dương ngũ hành.",
    gallery: [
      "https://images.unsplash.com/photo-1621886292650-520f76c747d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    id: "phan-3-1",
    group: "Phần III",
    title: "Nhã nhạc Cung đình",
    image: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Di sản văn hóa phi vật thể của nhân loại - Âm nhạc của sự thanh cao và bác học.",
    gallery: [
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1621886292650-520f76c747d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    id: "phan-3-2",
    group: "Phần III",
    title: "Lễ hội & Tín ngưỡng",
    image: "https://images.unsplash.com/photo-1606625379124-3882167b827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Các nghi lễ trọng đại và tín ngưỡng tâm linh được bảo tồn nguyên vẹn qua hàng thế kỷ.",
    gallery: [
      "https://images.unsplash.com/photo-1606625379124-3882167b827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    id: "phan-3-3",
    group: "Phần III",
    title: "Bảo tồn & Phát huy",
    image: "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Nỗ lực ứng dụng công nghệ số và các biện pháp trùng tu để gìn giữ Di sản Huế cho thế hệ tương lai.",
    gallery: [
      "https://images.unsplash.com/photo-1664333039578-28ad613ee536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1606625379124-3882167b827b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  }
];