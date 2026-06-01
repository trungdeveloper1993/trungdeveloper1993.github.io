import { AppProject } from '../types';

export const APP_PROJECTS: AppProject[] = [
  {
    id: 'cooking_app',
    title: 'YumRecipe - Sổ tay Nấu ăn gia đình',
    shortTitle: 'YumRecipe',
    subtitle: 'Nguồn cảm hứng ẩm thực mỗi ngày',
    description: 'Một ứng dụng cẩm nang ẩm thực thông minh và tinh tế, giúp bạn dễ dàng lưu trữ công thức nấu ăn gia đình, tìm kiếm món ăn từ nguyên liệu sẵn có, cá nhân hóa chế độ dinh dưỡng và theo dõi hướng dẫn nấu ăn từng bước cực trực quan.',
    defaultGithubUrl: 'https://trungdeveloper1993.github.io/webnauan/',
    githubRepoUrl: 'https://github.com/trungdeveloper1993/webnauan',
    iconName: 'ChefHat',
    iconBgColor: 'bg-amber-500',
    iconTextColor: 'text-white',
    techStack: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Local Storage', 'Recipe API'],
    features: [
      'Khám phá hơn 1000+ công thức đồ Việt & quốc tế.',
      'Bộ lọc thông minh tìm kiếm món ngon theo tủ lạnh.',
      'Chế độ nấu rảnh tay (Hands-Free cooking view).',
      'Lên thực đơn dinh dưỡng cho cả tuần dễ dàng.'
    ],
    simulatedData: {
      title: 'Món Ngon Thịnh Hành Hôm Nay',
      items: [
        {
          id: 'cook-1',
          title: 'Phở Bò Truyền Thống',
          desc: 'Nước dùng trong vắt, thơm nức mùi gừng, thảo quả chín, quế chi và sá sùng.',
          extra: 'Độ khó: Vừa • 120 phút',
          rating: '4.9 ⭐ (1.2k lượt dùng)'
        },
        {
          id: 'cook-2',
          title: 'Cơm Tấm Sườn Bì Chả',
          desc: 'Chuẩn vị Sài Gòn, thịt sườn nướng mọng nước vàng ruộm, nước mắm tỏi ớt kẹo đặc.',
          extra: 'Độ khó: Dễ • 45 phút',
          rating: '4.8 ⭐ (850 lượt dùng)'
        },
        {
          id: 'cook-3',
          title: 'Cá Kho Tộ Kiểu miền Tây',
          desc: 'Cá lóc đồng kho tiêu đậm đà gừng tỏi ớt hiểm, nước sốt kẹo ăn kèm cơm nóng ấm.',
          extra: 'Độ khó: Trung bình • 60 phút',
          rating: '4.7 ⭐ (720 lượt dùng)'
        },
        {
          id: 'cook-4',
          title: 'Bánh Xèo Nam Bộ Giòn Rụm',
          desc: 'Vỏ bánh mỏng đều giòn rụm với nghệ tươi, cốt dừa thơm phức, tôm sú thịt ba chỉ ngọt mọng.',
          extra: 'Độ khó: Trung bình • 35 phút',
          rating: '4.6 ⭐ (590 lượt dùng)'
        }
      ]
    }
  },
  {
    id: 'maps_app',
    title: 'GeoMap Vina - Bản đồ tương tác & Du lịch',
    shortTitle: 'GeoMap',
    subtitle: 'Tìm kiếm lộ trình & Địa chỉ ăn chơi',
    description: 'Bản đồ số định vị thế hệ mới hỗ trợ tìm kiếm lộ trình giao thông thông minh tại Việt Nam. Không chỉ dẫn đường nhanh chóng, GeoMap còn là cẩm nang gợi ý du lịch, điểm check-in bụi và review ẩm thực đường phố chân thực nhất.',
    defaultGithubUrl: 'https://trungdeveloper1993.github.io/bandoviet/',
    githubRepoUrl: 'https://github.com/trungdeveloper1993/bandoviet',
    iconName: 'Map',
    iconBgColor: 'bg-emerald-500',
    iconTextColor: 'text-white',
    techStack: ['React', 'Leaflet JS', 'Mapbox GL', 'OpenStreetMap API', 'Geocoding', 'Tailwind CSS'],
    features: [
      'Chỉ đường tối ưu thời gian thực cho xe máy và ô tô.',
      'Cảnh báo kẹt xe, các khu ngập lún đô thị linh hoạt.',
      'Bản đồ ăn uống ẩm thực 63 tỉnh thành đặc trưng.',
      'Chia sẻ vị trí thời gian thực và đánh dấu tùy biến.'
    ],
    simulatedData: {
      title: 'Địa Điểm Check-In Hot Nhất',
      items: [
        {
          id: 'map-1',
          title: 'Thành Phố Sương Mù Đà Lạt',
          desc: 'Thung lũng ngàn hoa, đồi thông thơ mộng và các quán cafe vintage cực chill.',
          extra: 'Cách bạn: 240 km • Thời tiết: 16°C Se lạnh',
          rating: '4.9 ⭐ (4.5k reviews)'
        },
        {
          id: 'map-2',
          title: 'Phố Cổ Hội An lung linh',
          desc: 'Bình yên bên dòng sông Hoài, những mái ngói rêu phong và đèn lồng ngũ sắc về đêm.',
          extra: 'Cách bạn: 520 km • Thời tiết: 28°C Nắng nhẹ',
          rating: '4.8 ⭐ (3.8k reviews)'
        },
        {
          id: 'map-3',
          title: 'Kỳ quan Vịnh Hạ Long',
          desc: 'Chiêm ngưỡng hàng nghìn hòn đảo đá vôi nhấp nhô tuyệt tác giữa làn nước xanh lục bảo.',
          extra: 'Cách bạn: 120 km • Thời tiết: 25°C Đẹp',
          rating: '4.9 ⭐ (5k reviews)'
        },
        {
          id: 'map-4',
          title: 'Đảo Ngọc Phú Quốc hoang sơ',
          desc: 'Nails bãi tắm cát trắng mịn màng nước ngọc lam, rặng san hô tự nhiên tuyệt đẹp.',
          extra: 'Cách bạn: 350 km • Thời tiết: 31°C Giót nhẹ',
          rating: '4.7 ⭐ (2.9k reviews)'
        }
      ]
    }
  },
  {
    id: 'agriculture_app',
    title: 'AgroFarm - Chợ Nông sản Việt chất lượng',
    shortTitle: 'AgroFarm',
    subtitle: 'Sàn nông nghiệp sạch, chất lượng cao',
    description: 'Sàn thương mại điện tử trực tiếp kết nối nông dân 63 tỉnh thành với người tiêu dùng cả nước. Cam kết chất lượng đạt chuẩn VietGAP, GlobalGAP, không chất bảo quản, mua sắm tiện lợi với mức giá công bằng cốt lõi vì nông nghiệp Việt.',
    defaultGithubUrl: 'https://trungdeveloper1993.github.io/muabannongsan/',
    githubRepoUrl: 'https://github.com/trungdeveloper1993/muabannongsan',
    iconName: 'ShoppingBag',
    iconBgColor: 'bg-indigo-500',
    iconTextColor: 'text-white',
    techStack: ['Vite', 'React', 'Context API', 'Stripe Payment', 'Firebase DB', 'Tailwind Grid'],
    features: [
      'Nông sản truy xuất nguồn gốc QR code minh bạch.',
      'Giao sỉ lẻ trực tiếp từ nhà vườn Đà Lạt, Miền Tây.',
      'Sàn đấu giá giá bán nông sản mở linh hoạt.',
      'Giao hàng nhanh Fresh Express giữ độ tươi ngon 100%.'
    ],
    simulatedData: {
      title: 'Đặc Sản Ngon Rẻ Đang Bán',
      items: [
        {
          id: 'farm-1',
          title: 'Dâu Tây New Zealand Đà Lạt',
          desc: 'Quả to ngọt mọng thơm ngát đặc trưng, trồng nhà kính hữu cơ khép đạt chuẩn.',
          price: '185.000 đ/Hộp 500g',
          extra: 'Nguồn gốc: Vườn dâu Biofresh Đà Lạt'
        },
        {
          id: 'farm-2',
          title: 'Gạo Việt Nam ST25 Nhất Thế Giới',
          desc: 'Hạt cơm dẻo mềm mịn, thơm mùi lá dứa ngào ngạt tự nhiên mộc mạc thơm sâu.',
          price: '160.000 đ/Túi 5kg',
          extra: 'Nguồn gốc: Cánh đồng hữu cơ Sóc Trăng'
        },
        {
          id: 'farm-3',
          title: 'Măng Cụt Lái Thiêu Ruột Sữa',
          desc: 'Trái tươi hái sáng sớm, cơm trắng nõn ngọt bùi, vỏ mỏng chua ngọt thanh thanh mát.',
          price: '85.000 đ/kg',
          extra: 'Nguồn gốc: Hợp tác xã Lái Thiêu'
        },
        {
          id: 'farm-4',
          title: 'Vải Thiều Lục Ngạn Đỏ Hồng',
          desc: 'Quả to đều, cùi dày mọng nước lịm lịm, hạt nhỏ xíu thu hoạch đợt sớm tuyển chọn.',
          price: '65.000 đ/kg',
          extra: 'Nguồn gốc: Thủ phủ vải Lục Ngạn'
        }
      ]
    }
  }
];
