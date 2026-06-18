document.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo các trình quản lý nghiệp vụ chính

  const toastManager = new ToastManager();

  const themeManager = new ThemeManager();

  const cartManager = new CartManager(toastManager);

  const wishlistManager = new WishlistManager(toastManager, cartManager);

  // Khởi tạo giao diện tĩnh

  initNavbar(cartManager, wishlistManager);

  initHeroParticles();

  initStatsCounter();

  initHeroSlider();

  // Hiển thị sản phẩm ban đầu & lắp ráp bộ lọc

  const filterManager = new FilterManager(
    products,
    cartManager,
    wishlistManager,
  );

  filterManager.renderAll();

  // Khởi tạo bộ tìm kiếm trực tiếp

  const searchManager = new SearchManager(products, filterManager);

  // Khởi tạo hướng dẫn đồ án tốt nghiệp

  initProjects(toastManager, cartManager);

  // Xử lý gửi biểu mẫu

  initForms(toastManager);

  // Nút quay lại đầu trang

  initScrollTop();

  // View Switcher Logic
  const viewBtns = document.querySelectorAll("[data-view]");
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetView = btn.getAttribute("data-view");
      if (targetView) {
        document.querySelectorAll(".view-section").forEach((view) => {
          view.style.display = "none";
        });
        const viewEl = document.getElementById(targetView + "-view");
        if (viewEl) {
          viewEl.style.display = "block";
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    });
  });
});

// ==========================================

// 1. CƠ SỞ DỮ LIỆU SẢN PHẨM (60+ Linh Kiện Đã Dịch Tiếng Việt)

// ==========================================

const products = [
  // --- VI ĐIỀU KHIỂN & PHÁT TRIỂN ---

  {
    id: 1,

    name: "Bo Mạch Vi Điều Khiển Arduino Uno R3 (Chip Cắm ATmega328P)",

    category: "microcontrollers",

    brand: "Arduino",

    price: 295000,

    rating: 4.8,

    reviews: 142,

    stock: 24,

    badge: null,

    description:
      "Bo mạch vi điều khiển Arduino Uno R3 chính hãng là lựa chọn hàng đầu cho sinh viên bắt đầu học lập trình nhúng và điện tử. Sử dụng chip nạp ATmega328P thông dụng nhất hiện nay.",

    specs: [
      "Vi điều khiển chính: ATmega328P",
      "Điện áp hoạt động: 5V",
      "Điện áp vào khuyên dùng: 7-12V",
      "Số chân Digital I/O: 14 chân",
      "Số chân Analog Input: 6 chân",
    ],

    image: "arduino_uno",
  },

  {
    id: 2,

    name: "Bo Mạch Vi Điều Khiển Arduino Mega 2560 R3",

    category: "microcontrollers",

    brand: "Arduino",

    price: 485000,

    rating: 4.7,

    reviews: 88,

    stock: 15,

    badge: "HOT",

    description:
      "Phiên bản mở rộng hoàn hảo dành cho các đồ án phức tạp cần nhiều chân kết nối tín hiệu. Thường được sử dụng làm bộ não máy in 3D, máy CNC mini và cánh tay robot.",

    specs: [
      "Vi điều khiển: ATmega2560",
      "Bộ nhớ Flash: 256KB",
      "Bộ nhớ SRAM: 8KB",
      "Chân Digital I/O: 54 chân",
      "Chân Analog Inputs: 16 chân",
    ],

    image: "mega",
  },

  {
    id: 3,

    name: "Mạch Thu Phát ESP32 DevKit V1 WiFi & Bluetooth NodeMCU",

    category: "microcontrollers",

    brand: "Espressif",

    price: 185000,

    rating: 4.9,

    reviews: 215,

    stock: 120,

    badge: "HOT",

    description:
      "Dòng chip lõi kép hiệu năng cao tích hợp sẵn kết nối WiFi và Bluetooth. Lựa chọn tối ưu nhất cho các đồ án nhà thông minh, IoT công nghiệp và truyền nhận dữ liệu xa.",

    specs: [
      "Lõi xử lý: Tensilica 32-bit Dual-Core",
      "Tần số hoạt động: 240MHz",
      "Bộ nhớ SRAM: 520KB",
      "Bộ nhớ Flash: 4MB",
      "Cổng nạp: micro-USB / Type-C",
    ],

    image: "esp32",
  },

  {
    id: 4,

    name: "Mạch Thu Phát NodeMCU ESP8266 V3 Lua WiFi",

    category: "microcontrollers",

    brand: "Espressif",

    price: 75000,

    rating: 4.7,

    reviews: 149,

    stock: 85,

    badge: null,

    description:
      "Bo mạch truyền nhận dữ liệu qua mạng WiFi giá rẻ. Thích hợp xây dựng các trạm cảm biến khí tượng đo đạc không dây đơn giản.",

    specs: [
      "Chip chính: ESP8266EX",
      "Chuẩn WiFi: 802.11 b/g/n",
      "Bộ nhớ Flash: 4MB",
      "Ăng-ten: Vẽ trực tiếp trên mạch in PCB",
    ],

    image: "nodemcu",
  },

  {
    id: 5,

    name: "Mạch Phát Triển STM32F103C8T6 Blue Pill ARM Cortex-M3",

    category: "microcontrollers",

    brand: "STMicroelectronics",

    price: 95000,

    rating: 4.6,

    reviews: 94,

    stock: 60,

    badge: "NEW",

    description:
      "Bộ điều khiển 32-bit mạnh mẽ tốc độ cao. Dành cho các hệ thống đòi hỏi tính toán logic nhanh, nạp code thời gian thực RTOS và thiết bị điều khiển công nghiệp.",

    specs: [
      "Kiến trúc: ARM 32-bit Cortex-M3",
      "Tần số thạch anh: 72MHz",
      "Bộ nhớ Flash: 64KB",
      "SRAM: 20KB",
      "Điện áp hoạt động: 2.0V - 3.6V",
    ],

    image: "stm32",
  },

  {
    id: 6,

    name: "Máy Tính Nhúng Đơn Board Raspberry Pi 4 Model B (4GB RAM)",

    category: "microcontrollers",

    brand: "Raspberry Pi",

    price: 1850000,

    rating: 4.8,

    reviews: 110,

    stock: 8,

    badge: "HOT",

    description:
      "Máy tính mini chạy hệ điều hành Linux trực tiếp. Thích hợp làm trạm Edge Computing xử lý trí tuệ nhân tạo (AI), nhận diện khuôn mặt và điều khiển trung tâm xe tự hành.",

    specs: [
      "CPU: Quad-core ARM Cortex-A72 64-bit",
      "Bộ nhớ RAM: 4GB LPDDR4",
      "Kết nối: WiFi băng tần kép, Gigabit Ethernet",
      "Cổng USB: 2x USB 3.0, 2x USB 2.0",
      "Cổng hiển thị: 2x micro-HDMI xuất 4K",
    ],

    image: "raspi",
  },

  {
    id: 7,

    name: "Mạch Vi Điều Khiển Raspberry Pi Pico (RP2040 Lõi Kép)",

    category: "microcontrollers",

    brand: "Raspberry Pi",

    price: 125000,

    rating: 4.7,

    reviews: 53,

    stock: 140,

    badge: "NEW",

    description:
      "Mạch vi điều khiển giá rẻ đầu tiên được thiết kế bởi hãng Raspberry Pi. Hỗ trợ lập trình dễ dàng thông qua ngôn ngữ C/C++ và MicroPython.",

    specs: [
      "Lõi xử lý: RP2040 Dual ARM Cortex-M0+",
      "Bộ nhớ SRAM: 264KB",
      "Flash ngoài: 2MB QSPI",
      "Số chân GPIO: 26 chân",
      "Độ phân giải ADC: 12-bit",
    ],

    image: "pico",
  },

  // --- CẢM BIẾN & ĐO ĐẠC ---

  {
    id: 8,

    name: "Cảm Biến Đo Nhiệt Độ & Độ Ẩm Không Khí DHT22",

    category: "sensors",

    brand: "Generic",

    price: 45000,

    rating: 4.8,

    reviews: 130,

    stock: 150,

    badge: null,

    description:
      "Cảm biến đo độ ẩm nhiệt độ không khí kỹ thuật số thế hệ mới có độ chính xác rất cao, ổn định lâu dài.",

    specs: [
      "Dải đo độ ẩm: 0-100% RH",
      "Dải đo nhiệt độ: -40 đến 80°C",
      "Sai số đo: ±2% RH / ±0.5°C",
      "Kiểu giao tiếp: Kỹ thuật số 1 dây (Single-Bus)",
    ],

    image: "dht22",
  },

  {
    id: 9,

    name: "Cảm Biến Siêu Âm Đo Khoảng Cách HC-SR04",

    category: "sensors",

    brand: "Generic",

    price: 25000,

    rating: 4.6,

    reviews: 204,

    stock: 200,

    badge: null,

    description:
      "Hoạt động bằng cách phát sóng siêu âm và đo thời gian phản hồi lại để tính toán khoảng cách vật cản trước mặt.",

    specs: [
      "Điện áp cấp: 5V DC",
      "Dải đo hiệu quả: 2cm - 400cm",
      "Góc đo quét rộng: 15 độ",
      "Tín hiệu trigger đầu vào: 10µs TTL",
    ],

    image: "sieuam",
  },

  {
    id: 10,

    name: "Cảm Biến Hồng Ngoại Phát Hiện Người PIR HC-SR501",

    category: "sensors",

    brand: "Generic",

    price: 28000,

    rating: 4.5,

    reviews: 90,

    stock: 95,

    badge: null,

    description:
      "Thiết bị cảm biến chuyển động hồng ngoại thụ động. Thường dùng trong hệ thống chống trộm đột nhập hoặc tự bật đèn khi có người bước vào.",

    specs: [
      "Điện áp đầu vào: 4.5V-20V",
      "Thời gian trễ: Điều chỉnh 0.3 giây - 5 phút",
      "Cự ly phát hiện: 3 đến 7 mét",
      "Góc cảm ứng: < 120 độ",
    ],

    image: "pir",
  },

  {
    id: 11,

    name: "Module Cảm Biến Hồng Ngoại Tránh Vật Cản Cự Ly Gần",

    category: "sensors",

    brand: "Generic",

    price: 22000,

    rating: 4.4,

    reviews: 67,

    stock: 180,

    badge: null,

    description:
      "Bộ truyền nhận mắt hồng ngoại lắp ráp sẵn chiết áp chỉnh độ nhạy. Xuất tín hiệu mức thấp logic khi nhận diện được chướng ngại vật trước mặt.",

    specs: [
      "Khoảng cách phát hiện: 2-30cm",
      "Góc phát hiện vật: 35 độ",
      "Tín hiệu ra: Kỹ thuật số số 0 hoặc 1",
      "Điện áp hoạt động: 3.3V - 5V",
    ],

    image: "hongngoai",
  },

  {
    id: 12,

    name: "Cảm Biến Phát Hiện Rò Rỉ Khí Ga & Khói MQ-2",

    category: "sensors",

    brand: "Generic",

    price: 45000,

    rating: 4.7,

    reviews: 58,

    stock: 40,

    badge: "NEW",

    description:
      "Thích hợp làm mạch cảnh báo rò rỉ bình gas trong bếp hoặc mạch cảnh báo khói báo cháy tự động trong tòa nhà.",

    specs: [
      "Khí phát hiện được: Khí hóa lỏng LPG, Propane, Hydrogen, Khói",
      "Nồng độ nhạy: 300-10000ppm",
      "Đầu ra: Cả Analog và Digital",
    ],

    image: "khigas",
  },

  {
    id: 13,

    name: "Module Cảm Biến Ánh Sáng Sử Dụng Quang Trở LDR",

    category: "sensors",

    brand: "Generic",

    price: 18000,

    rating: 4.5,

    reviews: 34,

    stock: 220,

    badge: null,

    description:
      "Bộ cảm biến ánh sáng quang trở đi kèm mạch so sánh LM393. Tự động đóng ngắt bóng đèn khi trời tối.",

    specs: [
      "Điện áp cấp: 3.3V - 5V",
      "Đầu ra cổng: D0 (Digital) và A0 (Analog)",
      "IC so sánh: LM393 độ nhạy cao",
    ],

    image: "cbas",
  },

  {
    id: 14,

    name: "Cảm Biến Nhận Diện Vân Tay Quang Học AS608",

    category: "sensors",

    brand: "Generic",

    price: 195000,

    rating: 4.8,

    reviews: 45,

    stock: 14,

    badge: "NEW",

    description:
      "Cảm biến quét vân tay quang học hiệu năng cao tích hợp sẵn bộ nhớ lưu mẫu vân tay, đối chiếu dữ liệu vân tay trực tiếp.",

    specs: [
      "Điện áp cấp: 3.3V DC",
      "Dung lượng bộ nhớ: Lưu tối đa 120 mẫu vân tay",
      "Chuẩn giao tiếp: UART Serial",
      "Tốc độ baudrate mặc định: 9600 - 115200 bps",
    ],

    image: "cbvt",
  },

  // --- MÀN HÌNH HIỂN THỊ ---

  {
    id: 15,

    name: "Màn Hình OLED 0.96 inch I2C Xanh/Vàng-Xanh",

    category: "displays",

    brand: "Generic",

    price: 65000,

    rating: 4.9,

    reviews: 188,

    stock: 65,

    badge: "HOT",

    description:
      "Màn hình hiển thị chữ OLED 128x64 sắc nét tự phát sáng. Chỉ sử dụng 4 dây kết nối qua giao tiếp I2C tiện lợi.",

    specs: [
      "Độ phân giải hiển thị: 128x64 Pixels",
      "IC điều khiển driver: SSD1306",
      "Sơ đồ chân: VCC, GND, SCL, SDA",
      "Màu sắc: Xanh dương hoặc Vàng-Xanh kết hợp",
    ],

    image: "display",
  },

  {
    id: 16,

    name: "Màn Hình LCD 16x2 Chữ Kèm Module I2C Hàn Sẵn",

    category: "displays",

    brand: "Generic",

    price: 55000,

    rating: 4.6,

    reviews: 104,

    stock: 110,

    badge: null,

    description:
      "Màn hình ký tự tinh thể lỏng hiển thị 16 ký tự trên 2 dòng chữ. Đã hàn sẵn mạch chuyển đổi I2C giúp tiết kiệm chân I/O tối đa.",

    specs: [
      "Định dạng hiển thị: 16 ký tự x 2 dòng",
      "Đèn nền nền: Màu xanh dương / Chữ trắng",
      "Địa chỉ I2C mặc định: 0x27 hoặc 0x3F",
      "Điện áp nuôi mạch: 5V DC",
    ],

    image: "lcd16x2",
  },

  {
    id: 17,

    name: "Màn Hình Cảm Ứng TFT LCD 2.4 inch SPI Touch Shield",

    category: "displays",

    brand: "Generic",

    price: 175000,

    rating: 4.5,

    reviews: 32,

    stock: 22,

    badge: "NEW",

    description:
      "Shield màn hình TFT cảm ứng hiển thị màu sắc đầy đủ. Thiết kế cắm chồng khít lên Arduino Uno không cần nối dây nhợ.",

    specs: [
      "Kích thước đường chéo: 2.4 inch",
      "Độ phân giải màu: 240x320 Pixels",
      "Độ sâu màu: 16-bit 65K màu",
      "IC điều khiển hiển thị: ILI9341",
    ],

    image: "TFT",
  },

  {
    id: 18,

    name: "Module LED 7 Đo 4 Số 0.36 inch TM1637",

    category: "displays",

    brand: "Generic",

    price: 32000,

    rating: 4.7,

    reviews: 28,

    stock: 75,

    badge: null,

    description:
      "Mạch hiển thị LED 7 đoạn chuyên dùng làm đồng hồ hiển thị thời gian hoặc hiển thị nhiệt độ đo đạc thực tế.",

    specs: [
      "Số ký số: 4 số LED đỏ",
      "IC chuyên dụng điều khiển: TM1637",
      "Điện áp hoạt động: 3.3V - 5V",
      "Màu sắc hiển thị: Đỏ sáng",
    ],

    image: "7d4",
  },

  {
    id: 19,

    name: "Module LED Ma Trận Điểm Đỏ 8x32 MAX7219",

    category: "displays",

    brand: "Generic",

    price: 85000,

    rating: 4.8,

    reviews: 59,

    stock: 45,

    badge: "HOT",

    description:
      "Mạch ma trận LED ghép nối tiếp từ 4 mắt LED 8x8. Hỗ trợ hiển thị chữ chạy dài cảnh báo hoặc biểu đồ thời gian.",

    specs: [
      "Kích thước ma trận: 8 hàng x 32 cột",
      "IC điều khiển: MAX7219 ghép nối",
      "Chuẩn giao tiếp: SPI Serial",
      "Điện áp nuôi: 5V DC",
    ],

    image: "matrix",
  },

  // --- BỘ NGUểN & PIN SẠC ---

  {
    id: 20,

    name: "Mạch Hạ Áp DC-DC LM2596S 3A Có Biến Trở Chỉnh",

    category: "power",

    brand: "Generic",

    price: 35000,

    rating: 4.8,

    reviews: 165,

    stock: 300,

    badge: null,

    description:
      "Mạch nguồn hạ áp dạng xung hiệu năng cao. Có chiết áp xoay tinh chỉnh dòng áp đầu ra theo mong muốn.",

    specs: [
      "Dải áp đầu vào: 3.2V - 40V DC",
      "Dải áp đầu ra điều chỉnh: 1.25V - 35V DC",
      "Dòng tải tối đa: 2A (Hoặc 3A nếu có tản nhiệt)",
      "Hiệu suất chuyển đổi: Lên tới 92%",
    ],

    image: "haap",
  },

  {
    id: 21,

    name: "Mạch Tăng Áp DC-DC XL6009E1 4A Hiệu Suất Cao",

    category: "power",

    brand: "Generic",

    price: 38000,

    rating: 4.6,

    reviews: 79,

    stock: 140,

    badge: null,

    description:
      "Mạch kích nguồn tăng điện áp DC. Chuyên dùng nâng điện áp pin sạc lithium lên mức 9V, 12V cấp cho motor hoặc board vi điều khiển.",

    specs: [
      "Dải áp vào cấp: 3V - 32V DC",
      "Dải áp ra nâng lên: 5V - 35V DC",
      "Dòng tải chịu tối đa: 4A",
      "IC tăng áp: XL6009E1",
    ],

    image: "tangap",
  },

  {
    id: 22,

    name: "Pin Sạc Lithium-ion 18650 LG Dung Lượng 3000mAh",

    category: "power",

    brand: "Generic",

    price: 85000,

    rating: 4.9,

    reviews: 140,

    stock: 85,

    badge: "HOT",

    description:
      "Dòng pin lithium sạc chất lượng cao có dòng xả ổn định. Chuyên sử dụng chạy nguồn cho các mô hình xe robot hoặc đèn sạc pin cầm tay.",

    specs: [
      "Dung lượng định danh: 3000mAh",
      "Điện áp tiêu chuẩn: 3.7V",
      "Điện áp sạc đầy tối đa: 4.2V",
      "Điện áp ngắt khi cạn: 2.5V",
    ],

    image: "pinlithiumion",
  },

  {
    id: 23,

    name: "Mạch Sạc Pin Lipo TP4056 Có Bảo Vệ (Cổng USB-C)",

    category: "power",

    brand: "Generic",

    price: 25000,

    rating: 4.9,

    reviews: 240,

    stock: 450,

    badge: null,

    description:
      "Mạch sạc pin 1S lithium nhỏ gọn thông minh. Bảo vệ pin khỏi tình trạng quá xả cạn kiệt nguồn điện hoặc quá tải dòng sạc đầu vào.",

    specs: [
      "Chuẩn cổng cắm sạc: Type-C USB",
      "Dòng sạc mặc định: 1A (Có thể chỉnh bằng điện trở)",
      "Điện áp sạc đầy ngắt sạc: 4.2V",
      "Chức năng bảo vệ: Có ngắt bảo vệ chống cạn pin",
    ],

    image: "machsaclipo",
  },

  {
    id: 24,

    name: "IC Ổn Áp Tuyến Tính L7805CV 5V 1.5A (TO-220)",

    category: "power",

    brand: "STMicroelectronics",

    price: 15000,

    rating: 4.5,

    reviews: 74,

    stock: 500,

    badge: null,

    description:
      "IC ổn áp tuyến tính 3 chân kinh điển. Đầu ra cố định 5.0V cực kỳ sạch không bị nhiễu sóng xung, tải ổn định.",

    specs: [
      "Điện áp ra cố định: 5.0V DC",
      "Điện áp chênh áp vào-ra tối thiểu: 2.0V",
      "Dòng tải đầu ra tối đa: 1.5A",
      "Kiểu chân đóng gói: TO-220",
    ],

    image: "iconap",
  },

  {
    id: 25,

    name: "Nguồn Tổ Ong 12V 10A (Bộ Nguồn Xung Kim Loại)",

    category: "power",

    brand: "Generic",

    price: 345000,

    rating: 4.8,

    reviews: 39,

    stock: 12,

    badge: "HOT",

    description:
      "Bộ biến áp nguồn xung tổ ong vỏ nhôm. Cung cấp nguồn 12V tải khỏe, chạy ổn định cho quạt tản nhiệt, LED dây hoặc động cơ bước công suất trung bình.",

    specs: [
      "Điện áp vào cấp: 110V/220V AC xoay chiều",
      "Điện áp ra cố định: 12V DC (Tinh chỉnh được ±10%)",
      "Dòng dòng tải tối đa: 10A",
      "Công suất tải định mức: 120W",
    ],

    image: "nguontoong",
  },

  // --- ROBOTICS & ĐỘNG CƠ ---

  {
    id: 26,

    name: "Động Cơ Servo Micro SG90 Góc Xoay 180 Độ",

    category: "robotics",

    brand: "Generic",

    price: 35000,

    rating: 4.7,

    reviews: 280,

    stock: 140,

    badge: null,

    description:
      "Động cơ servo cỡ nhỏ điều khiển góc quay bằng xung PWM. Phổ biến nhất trong các bài thực hành học vi xử lý cơ bản.",

    specs: [
      "Lực kéo động cơ: 1.6kg-cm",
      "Tốc độ phản hồi: 0.12 giây/60 độ (4.8V)",
      "Thứ tự chân cắm: Cam (Xung), Đỏ (VCC), Nâu (GND)",
      "Trọng lượng siêu nhẹ: 9 grams",
    ],

    image: "servo",
  },

  {
    id: 27,

    name: "Động Cơ Servo MG996R Bánh Răng Kim Loại (Lực Kéo Cao)",

    category: "robotics",

    brand: "Generic",

    price: 125000,

    rating: 4.8,

    reviews: 67,

    stock: 45,

    badge: null,

    description:
      "Động cơ servo kích thước lớn lực kéo cực kỳ khỏe. Trục nhông truyền động hoàn toàn bằng kim loại đồng chống mòn gãy trục.",

    specs: [
      "Lực kéo động cơ: 12kg-cm (ở nguồn cấp 6V)",
      "Góc xoay hành trình: 180 độ",
      "Chất liệu bánh răng: Kim loại đồng và nhôm",
      "Dải nguồn hoạt động: 4.8 - 7.2V",
    ],

    image: "servomg996r",
  },

  {
    id: 28,

    name: "Động Cơ Bước NEMA 17 Stepper Motor 1.5A 40Ncm",

    category: "robotics",

    brand: "Generic",

    price: 185000,

    rating: 4.8,

    reviews: 55,

    stock: 28,

    badge: "NEW",

    description:
      "Động cơ bước định vị góc xoay siêu chính xác. Linh kiện bắt buộc phải có cho máy in 3D, máy vẽ laser CNC và khớp nối cơ khí.",

    specs: [
      "Góc bước chuẩn: 1.8 độ / 1 bước",
      "Momen xoắn giữ trục: 40 Ncm",
      "Dòng điện pha chịu được: 1.5A mỗi pha",
      "Đường kính trục ra: 5mm trục chữ D",
    ],

    image: "nema",
  },

  {
    id: 29,

    name: "Mạch Cầu H Điều Khiển Động Cơ L298N",

    category: "robotics",

    brand: "STMicroelectronics",

    price: 65000,

    rating: 4.7,

    reviews: 154,

    stock: 75,

    badge: null,

    description:
      "Mạch cầu H đôi chịu tải tốt chuyên dùng điều tốc độ và đảo chiều quay cho 2 động cơ DC độc lập hoặc 1 động cơ bước 4 dây.",

    specs: [
      "IC điều khiển chính: L298N",
      "Điện áp logic hoạt động: 5V",
      "Điện áp động cơ cấp: 5V - 35V DC",
      "Dòng tải chịu tối đa: 2A cho mỗi cầu H",
    ],

    image: "l298n",
  },

  {
    id: 30,

    name: "Bộ Khung Xe Robot Thông Minh 4 Bánh 4WD Mica",

    category: "robotics",

    brand: "Generic",

    price: 245000,

    rating: 4.6,

    reviews: 82,

    stock: 18,

    badge: "NEW",

    description:
      "Gói khung gầm xe robot hoàn chỉnh bao gồm 2 tấm mica dày, 4 động cơ giảm tốc vàng, 4 bánh xe cao su, hộp pin và các ốc vít cố định.",

    specs: [
      "Vật liệu khung xe: Tấm Mica acrylic đen bóng hoặc trong suốt",
      "Động cơ bao gồm: 4 động cơ giảm tốc trục đơn",
      "Nguồn nuôi hoạt động: 3 - 6V DC",
    ],

    image: "4wd",
  },

  {
    id: 31,

    name: "Bộ 4 Bánh Xe Vạn Hướng Mecanum Omnidirectional 60mm",

    category: "robotics",

    brand: "Generic",

    price: 195000,

    rating: 4.7,

    reviews: 23,

    stock: 25,

    badge: null,

    description:
      "Bộ 4 bánh xe Mecanum (2 trái, 2 phải) giúp xe robot của bạn di chuyển theo mọi hướng ngang dọc hoặc tự xoay tròn tại chỗ cực kỳ linh hoạt.",

    specs: [
      "Đường kính ngoài bánh: 60mm",
      "Số con lăn nhỏ: 8 con lăn cao su trên mỗi bánh",
      "Chất liệu thân bánh: Nhựa ABS đúc chịu lực tốt",
      "Khớp trục nối: Trục chữ D kích thước 4mm",
    ],

    image: "mo60mm",
  },

  {
    id: 32,

    name: "Khung Cánh Tay Robot Cơ Khí Acrylic 4 Bậc Tự Do (4-DOF)",

    category: "robotics",

    brand: "Generic",

    price: 345000,

    rating: 4.5,

    reviews: 41,

    stock: 0,

    badge: "HOT",

    description:
      "Các mảnh mica được gia công cắt CNC chính xác, đi kèm các ốc vít kim loại lắp ráp cánh tay gắp (Sản phẩm không kèm động cơ servo).",

    specs: [
      "Chất liệu mảnh: Mica đen chống bám bẩn",
      "Số khớp xoay (bậc tự do): 4 trục khớp",
      "Hỗ trợ loại servo: 4 động cơ Servo micro SG90",
      "Lắp ráp: Người dùng tự lắp ráp theo sách hướng dẫn",
    ],

    image: "4dof",
  },

  // --- LINH KIỆN MÁY TÍNH ---

  {
    id: 33,

    name: "Bộ Vi Xử Lý Intel Core i5-12400F CPU (LGA1700)",

    category: "computer",

    brand: "Intel",

    price: 4200000,

    rating: 4.9,

    reviews: 73,

    stock: 15,

    badge: "HOT",

    description:
      "Bộ vi xử lý hiệu năng phân khúc tầm trung với 6 nhân và 12 luồng xử lý. Tối ưu cực tốt cho việc chạy trình biên dịch code nặng.",

    specs: [
      "Số nhân / luồng: 6 nhân / 12 luồng",
      "Xung nhịp cơ bản: 2.5GHz",
      "Xung nhịp Turbo tối đa: 4.4GHz",
      "Bộ nhớ Cache L3: 18MB",
      "Hỗ trợ chuẩn socket: LGA1700",
    ],

    image: "cpu",
  },

  {
    id: 34,

    name: "Bo Mạch Chủ ASUS ROG Strix B760-F Gaming",

    category: "computer",

    brand: "Generic",

    price: 5200000,

    rating: 4.8,

    reviews: 29,

    stock: 5,

    badge: "NEW",

    description:
      "Bo mạch chủ PC phân khúc gaming cao cấp hỗ trợ RAM DDR5 thế hệ mới, tản nhiệt VRM dày và các cổng PCIe 5.0 băng thông cao.",

    specs: [
      "Chipset bo mạch: Intel B760",
      "Socket tương thích: LGA1700",
      "Khe cắm RAM: 4 khe cắm DDR5 (Tối đa 192GB)",
      "Kết nối ổ cứng: 3x khe cắm M.2 PCIe 4.0 SSD",
    ],

    image: "b760f",
  },

  {
    id: 35,

    name: "Card Đồ Họa NVIDIA RTX 3060 Graphics Card 12GB",

    category: "computer",

    brand: "NVIDIA",

    price: 8500000,

    rating: 4.9,

    reviews: 44,

    stock: 8,

    badge: "HOT",

    description:
      "Bộ tăng tốc xử lý đồ họa GPU tích hợp nhân Tensor Core. Chuyên trị các tác vụ huấn luyện trí tuệ nhân tạo Deep Learning và chạy mô phỏng.",

    specs: [
      "Bộ nhớ đồ họa: 12GB GDDR6",
      "Số nhân tính toán CUDA: 3584 nhân",
      "Chuẩn kết nối: PCIe 4.0",
      "Cổng kết nối ra: 3x DisplayPort, 1x HDMI",
    ],

    image: "rtx3060",
  },

  {
    id: 36,

    name: "Ram Samsung 8GB DDR4 3200MHz Desktop RAM",

    category: "computer",

    brand: "Samsung",

    price: 850000,

    rating: 4.8,

    reviews: 110,

    stock: 35,

    badge: null,

    description:
      "RAM bộ nhớ trong máy tính chất lượng cao của Samsung giúp chạy đa nhiệm các phần mềm IDE lập trình mượt mà không lo giật lag.",

    specs: [
      "Dung lượng RAM: 8GB",
      "Chuẩn chân cắm: DDR4 UDIMM",
      "Tốc độ xung nhịp bus: 3200MHz",
      "Điện áp RAM hoạt động: 1.2V",
    ],

    image: "ram8gbddr4ss",
  },

  {
    id: 37,

    name: "Ổ Cứng Thể Rắn Kingston 256GB SATA III SSD",

    category: "computer",

    brand: "Kingston",

    price: 1150000,

    rating: 4.7,

    reviews: 86,

    stock: 27,

    badge: null,

    description:
      "Ổ cứng thể rắn SSD tăng tốc độ khởi động hệ điều hành Windows, nạp các chương trình biên dịch và tải tài liệu kỹ thuật nhanh chóng.",

    specs: [
      "Chuẩn giao tiếp: SATA III (6Gb/s)",
      "Dung lượng chứa: 256GB",
      "Tốc độ đọc tối đa: 500MB/s",
      "Kích thước ổ: 2.5 inch",
    ],

    image: "ssd",
  },

  {
    id: 38,

    name: "Ổ Cứng HDD Seagate BarraCuda 1TB",

    category: "computer",

    brand: "Generic",

    price: 950000,

    rating: 4.5,

    reviews: 58,

    stock: 40,

    badge: null,

    description:
      "Ổ cứng cơ học truyền thống dung lượng lớn. Thích hợp lưu trữ thư viện code khổng lồ, bộ cài đặt IDE và tài liệu nghiên cứu dài hạn.",

    specs: [
      "Dung lượng chứa: 1TB",
      "Tốc độ quay đĩa: 7200 vòng/phút",
      "Bộ nhớ đệm đĩa Cache: 64MB",
      "Kết nối: SATA III 6Gb/s",
    ],

    image: "hdd",
  },

  {
    id: 39,

    name: "Bộ Nguồn PC Corsair RM750e 750W Gold Modular",

    category: "computer",

    brand: "Generic",

    price: 2450000,

    rating: 4.9,

    reviews: 31,

    stock: 14,

    badge: null,

    description:
      "Nguồn PC đạt chuẩn chứng nhận vàng 80 Plus Gold. Thiết kế dây cáp rời hoàn toàn giúp lòng case máy tính gọn gàng thông thoáng khí.",

    specs: [
      "Công suất nguồn thực: 750W",
      "Tiêu chuẩn kiểm định: 80 PLUS Gold Certified",
      "Dây kết nối: Full Modular (Dây rời rời)",
      "Kích thước quạt tản: 120mm êm ái",
    ],

    image: "pow",
  },

  {
    id: 40,

    name: "Quạt Tản Nhiệt Khí CPU Noctua NH-D15 Siêu Êm",

    category: "computer",

    brand: "Generic",

    price: 2150000,

    rating: 4.9,

    reviews: 49,

    stock: 9,

    badge: "HOT",

    description:
      "Vua tản nhiệt khí CPU tháp đôi cao cấp. Giữ cho hệ thống PC luôn mát mẻ kể cả khi chạy biên dịch code suốt đêm.",

    specs: [
      "Kiểu tản nhiệt: Tháp đôi kim loại",
      "Quạt làm mát: 2x NF-A15 PWM 140mm",
      "Tốc độ quạt quay tối đa: 1500 RPM",
      "Độ ồn tối đa phát ra: 24.6 dB(A)",
    ],

    image: "noc",
  },

  {
    id: 41,

    name: "Vỏ Case Máy Tính NZXT H5 Flow Premium (Đen)",

    category: "computer",

    brand: "Generic",

    price: 1850000,

    rating: 4.8,

    reviews: 25,

    stock: 10,

    badge: null,

    description:
      "Vỏ máy tính mid-tower thiết kế mặt lưới trước tổ ong đột lỗ giúp lưu thông luồng khí tản nhiệt tốt, bảo vệ linh kiện PC.",

    specs: [
      "Kích thước case: Mid-Tower",
      "Kính cường lực hông: Mặt kính chịu lực",
      "Số quạt hỗ trợ: Lắp tối đa 6 quạt 120mm",
      "Cổng giao tiếp trước: USB 3.2 Type-A và Type-C",
    ],

    image: "nzxt",
  },

  // --- LINH KIỆN CƠ BẢN ---

  {
    id: 42,

    name: "Túi Trở Vạch Carbon 10k Ohms 1/4W (Gói 100 Chiếc)",

    category: "components",

    brand: "Generic",

    price: 25000,

    rating: 4.9,

    reviews: 320,

    stock: 500,

    badge: null,

    description:
      "Điện trở vạch carbon công suất 0.25W ổn định. Linh kiện cơ bản bắt buộc phải có để chống cháy chân tín hiệu IO.",

    specs: [
      "Trở kháng chuẩn: 10k Ohms",
      "Dung sai trị số: ±5%",
      "Công suất chịu đựng: 0.25 Watt (1/4W)",
      "Số lượng gói: Gói đóng 100 chiếc điện trở",
    ],

    image: "10k",
  },

  {
    id: 43,

    name: "Hộp Tụ Hóa Điện Dịch Nhiều Dải Giá Trị (Hộp 120 Chiếc)",

    category: "components",

    brand: "Generic",

    price: 55000,

    rating: 4.8,

    reviews: 142,

    stock: 150,

    badge: null,

    description:
      "Hộp sắp xếp nhiều dải giá trị dung lượng tụ hóa thông dụng. Dùng để lọc điện áp nhiễu sóng trong các mạch tương tự.",

    specs: [
      "Dải dung lượng tụ: 0.1µF - 1000µF",
      "Điện áp chịu tối đa: 16V, 25V, 50V",
      "Tổng số lượng tụ trong hộp: Hộp sắp xếp 120 chiếc",
    ],

    image: "120",
  },

  {
    id: 44,

    name: "Đi-ốt Chỉnh Lưu 1N4007 1A 1000V (Gói 100 Chiếc)",

    category: "components",

    brand: "Generic",

    price: 20000,

    rating: 4.7,

    reviews: 95,

    stock: 400,

    badge: null,

    description:
      "Ngăn chặn dòng điện chạy ngược chiều bảo vệ mạch nhúng, dập tắt các xung điện ngược phát ra từ rơ-le.",

    specs: [
      "Dòng chỉnh lưu: 1.0 Ampere",
      "Điện áp ngược đỉnh tối đa: 1000V",
      "Kiểu chân đóng gói: Chân cắm DO-41",
      "Số lượng đóng gói: Gói 100 chiếc đi-ốt",
    ],

    image: "1n4007",
  },

  {
    id: 45,

    name: "Bóng Bán Dẫn Transistor PN2222 NPN (Gói 50 Chiếc)",

    category: "components",

    brand: "STMicroelectronics",

    price: 24000,

    rating: 4.6,

    reviews: 62,

    stock: 250,

    badge: null,

    description:
      "Transistor phân cực ngược NPN thông dụng. Thích hợp đóng ngắt rơ-le, còi buzzer từ tín hiệu vi điều khiển yếu.",

    specs: [
      "Phân cực: NPN",
      "Dòng cực C liên tục chịu tối đa: 600mA",
      "Điện áp cực C-E tối đa: 40V DC",
      "Kiểu đóng gói: TO-92 chân cắm",
    ],

    image: "pn2222",
  },

  {
    id: 46,

    name: "Transistor Trường MOSFET IRF540N N-Channel 33A (TO-220)",

    category: "components",

    brand: "Generic",

    price: 15000,

    rating: 4.8,

    reviews: 115,

    stock: 190,

    badge: null,

    description:
      "Transistor trường công suất MOSFET dòng xả cao. Đóng ngắt nhanh, không bị tia lửa điện như relay cơ truyền thống.",

    specs: [
      "Kênh dẫn dòng: N-Channel",
      "Dòng dẫn liên tục tối đa: 33A",
      "Điện áp cực D-S chịu được: 100V DC",
      "Đóng gói chân cắm: TO-220",
    ],

    image: "irf540n",
  },

  {
    id: 47,

    name: "IC Tạo Trễ Thời Gian NE555 Precision Timer (Gói 10 Con)",

    category: "components",

    brand: "Texas Instruments",

    price: 35000,

    rating: 4.9,

    reviews: 83,

    stock: 180,

    badge: null,

    description:
      "IC tạo xung nhịp dao động vuông kinh điển. Dùng để thiết kế mạch còi chớp tắt, điều khiển nhịp xung không cần nạp code.",

    specs: [
      "Loại IC chức năng: Analog Timer",
      "Kiểu chân đóng gói: DIP-8 chân cắm",
      "Dải nguồn hoạt động nuôi chip: 4.5V - 16V",
      "Số lượng gói: Gói đóng 10 con chip",
    ],

    image: "ne5555",
  },

  {
    id: 48,

    name: "Module Rơ-le Relay 5V 1 Kênh Cách Ly Quang",

    category: "components",

    brand: "Generic",

    price: 25000,

    rating: 4.8,

    reviews: 156,

    stock: 90,

    badge: null,

    description:
      "Đóng ngắt thiết bị điện gia dụng xoay chiều 220V từ tín hiệu điều khiển 5V DC. Có tích hợp transistor cách ly quang chống giật ngược áp.",

    specs: [
      "Điện áp cuộn hút kích: 5V DC",
      "Tải xoay chiều AC chịu tối đa: 250V AC 10A",
      "Tải một chiều DC chịu tối đa: 30V DC 10A",
      "Cách ly chống giật: Optocoupler quang bảo vệ",
    ],

    image: "relay5v",
  },

  {
    id: 49,

    name: "Thạch Anh Dao Động 16.000MHz (Gói 10 Chiếc)",

    category: "components",

    brand: "Generic",

    price: 22000,

    rating: 4.7,

    reviews: 31,

    stock: 130,

    badge: null,

    description:
      "Linh kiện thạch anh tạo tần số nhịp xung chuẩn 16MHz cho bo mạch vi điều khiển AVR như ATmega328P hoạt động đồng bộ.",

    specs: [
      "Tần số dao động chuẩn: 16.000 MHz",
      "Sai số tần số thạch anh: ±20ppm",
      "Dạng đóng gói chân cắm: HC-49S vỏ sắt dẹt",
      "Số lượng đóng gói: Gói 10 chiếc thạch anh",
    ],

    image: "16kmhz",
  },

  {
    id: 50,

    name: "Bộ Dây Cắm Test Board Jumper Wire 3 Loại (Gói 120 Sợi)",

    category: "components",

    brand: "Generic",

    price: 45000,

    rating: 4.9,

    reviews: 290,

    stock: 160,

    badge: "HOT",

    description:
      "Bộ cáp cắm bọc nhựa kết nối chân test board nhanh. Gồm đầy đủ 3 loại đầu dây: Đực-Đực, Cái-Cái và Đực-Cái.",

    specs: [
      "Chiều dài dây nối: 20cm",
      "Chất liệu lõi dẫn: Hợp kim đồng mạ kẽm",
      "Khoảng cách bước chân: 2.54mm tương thích breadboard",
      "Số lượng dây: 3 vỉ x 40 sợi tổng cộng 120 sợi",
    ],

    image: "jumperwire",
  },

  // --- DỤNG CỤ KỸ THUẬT ---

  {
    id: 51,

    name: "Trạm Hàn Thiếc Yihua 60W Có Chỉnh Nhiệt Độ Tay Hàn",

    category: "tools",

    brand: "Yihua",

    price: 345000,

    rating: 4.8,

    reviews: 95,

    stock: 20,

    badge: "HOT",

    description:
      "Bộ tay hàn nhiệt có núm điều chỉnh nhiệt độ nóng. Thích hợp cho sinh viên hàn chân cắm sensor và sửa bo mạch in hư hỏng.",

    specs: [
      "Công suất ra tay hàn: 60W",
      "Dải điều chỉnh nhiệt độ hàn: 200 - 480°C",
      "Điện áp cắm vào nuôi nguồn: 220V AC dân dụng",
      "Điện trở rò rỉ nối đất: < 2 Ohms bảo vệ IC",
    ],

    image: "yihua",
  },

  {
    id: 52,

    name: "Đồng Hồ Đo Vạn Năng Số DT830D Nhỏ Gọn",

    category: "tools",

    brand: "Generic",

    price: 185000,

    rating: 4.5,

    reviews: 87,

    stock: 50,

    badge: null,

    description:
      "Dụng cụ đo đạc không thể thiếu cho bàn học kỹ thuật. Hỗ trợ đo điện áp xoay chiều, đo một chiều DC, thông mạch và trở kháng.",

    specs: [
      "Dải đo điện áp một chiều DC: 200mV - 1000V",
      "Dải đo điện áp xoay chiều AC: 200V - 750V",
      "Dải đo điện trở đo được: 200 Ohm - 2 Megaohm",
      "Tính năng đo đi kèm: Còi thông mạch buzzer, đo hệ số khuếch đại hFE transistor",
    ],

    image: "dt830d",
  },

  {
    id: 53,

    name: "Máy Hiện Sóng Cầm Tay Mini Digital Oscilloscope DSO150",

    category: "tools",

    brand: "Generic",

    price: 685000,

    rating: 4.6,

    reviews: 32,

    stock: 12,

    badge: "NEW",

    description:
      "Máy hiển thị sóng PWM, đo tần số xung tín hiệu nhỏ gọn. Rất hữu ích khi học và gỡ lỗi truyền nhận giao tiếp UART/SPI.",

    specs: [
      "Băng thông analog đo được: 0 - 200KHz",
      "Tốc độ lấy mẫu tối đa: 1MSps",
      "Độ nhạy dọc hiển thị: 5mV/Div - 20V/Div",
      "Kích thước màn hình đồ họa: 2.4 inch TFT màu LCD",
    ],

    image: "dso150",
  },

  {
    id: 54,

    name: "Bộ Tua Vít Đa Năng Sửa Chữa Thiết Bị Jackly 45-in-1",

    category: "tools",

    brand: "Generic",

    price: 135000,

    rating: 4.7,

    reviews: 141,

    stock: 35,

    badge: null,

    description:
      "Bộ hộp tua vít đầu nam châm hút chống rơi ốc. Đầy đủ các đầu lục giác, dẹt, 3 cạnh tháo lắp laptop và đồ cơ khí robot car.",

    specs: [
      "Các loại đầu vít: Torx, Hex, Slotted, Phillips, Triangle",
      "Chất liệu chế tạo đầu: Thép Chrome Vanadium siêu cứng",
      "Tay cầm bọc cao su: Cao su nhám chống trượt tay",
    ],

    image: "45i1",
  },

  {
    id: 55,

    name: "Kìm Cắt Chân Linh Kiện Plato 170 Chuyên Dụng",

    category: "tools",

    brand: "Generic",

    price: 35000,

    rating: 4.8,

    reviews: 215,

    stock: 90,

    badge: null,

    description:
      "Kìm cắt chân sắt đồng, cắt thừa sau khi hàn mạch hoặc cắt vỏ nhựa tuốt dây cắm tín hiệu nhúng dễ dàng.",

    specs: [
      "Đường kính cắt tối đa: 1.2mm dây đồng mềm",
      "Lò xo đàn hồi tự mở: Có lò xo trợ lực tự mở tay kìm",
      "Tay bọc bảo vệ: Nhựa bọc PVC màu xanh dương",
    ],

    image: "plato",
  },

  {
    id: 56,

    name: "Bộ Làm Mạch In Thủ Công (Phíp Đồng + Bột Sắt Ăn Mòn)",

    category: "tools",

    brand: "Generic",

    price: 85000,

    rating: 4.5,

    reviews: 28,

    stock: 45,

    badge: null,

    description:
      "Gói vật liệu cơ bản tự vẽ tự ngâm rửa bo mạch in một lớp. Dành cho môn thực tập thiết kế PCB cơ bản.",

    specs: [
      "Phíp đồng bao gồm: 3 tấm phíp đồng kích thước 10x15cm",
      "Bột sắt ăn mòn: 200g bột sắt ngâm FeCl3",
      "Sách hướng dẫn quy trình: Có kèm hướng dẫn an toàn",
    ],

    image: "pcb",
  },

  // --- DIY & KẾT NỐI KHÔNG DÂY ---

  {
    id: 57,

    name: "Bộ Học Tập Nhà Thông Minh IoT Arduino Smart Home Kit",

    category: "iot",

    brand: "Arduino",

    price: 685000,

    rating: 4.9,

    reviews: 38,

    stock: 14,

    badge: "HOT",

    description:
      "Bộ Kit học lập trình hệ thống IoT thông minh. Đầy đủ cảm biến và module điều khiển đóng ngắt, kèm file hướng dẫn lắp ráp mạch chi tiết.",

    specs: [
      "Board điều khiển trung tâm: Arduino Uno R3",
      "Thiết bị bao gồm: Servo SG90, LCD 16x2 I2C, DHT11, MQ-2, Rơ-le, Còi báo động",
      "Tài liệu kèm theo: Bộ PDF bài học nạp code mẫu",
    ],

    image: "iot",
  },

  {
    id: 58,

    name: "Module WiFi ESP-01S Giao Tiếp Nối Tiếp UART Siêu Nhỏ",

    category: "iot",

    brand: "Espressif",

    price: 35000,

    rating: 4.6,

    reviews: 90,

    stock: 110,

    badge: null,

    description:
      "Card WiFi siêu nhỏ gọn giao tiếp qua giao thức Serial lệnh AT. Giúp thêm tính năng gửi tin nhắn WiFi lên internet cho Arduino Uno dễ dàng.",

    specs: [
      "Chế độ mạng WiFi: Station / SoftAP kết hợp",
      "Tốc độ baudrate mặc định: 115200 bps",
      "Dung lượng bộ nhớ chip: 1MB Flash",
      "Điện áp nuôi: 3.3V DC (Cắm 5V sẽ gây cháy chip ngay lập tức)",
    ],

    image: "esp01s",
  },

  {
    id: 59,

    name: "Module Bluetooth HC-05 Kết Nối Truyền Nhận UART Không Dây",

    category: "iot",

    brand: "Generic",

    price: 85000,

    rating: 4.7,

    reviews: 79,

    stock: 65,

    badge: "HOT",

    description:
      "Module truyền nhận sóng Bluetooth không dây chuẩn UART. Dùng điều khiển hướng chạy xe robot từ điện thoại Android thông qua ứng dụng.",

    specs: [
      "Chuẩn kết nối không dây: Bluetooth v2.0+EDR",
      "Chế độ cấu hình hoạt động: Master / Slave (Chủ hoặc Tớ)",
      "Cự ly truyền nhận tối đa: < 10 mét trong phòng",
      "Điện áp cấp nuôi: 3.6V - 6V DC",
    ],

    image: "hc05",
  },

  {
    id: 60,

    name: "Bộ Đọc Thẻ Từ Không Tiếp Xúc MFRC522 RFID Kit",

    category: "iot",

    brand: "Generic",

    price: 48000,

    rating: 4.8,

    reviews: 149,

    stock: 90,

    badge: null,

    description:
      "Bộ module đọc/ghi thẻ thông minh RFID tần số 13.56MHz. Trọn bộ gồm mạch đọc, thẻ từ trắng móc khóa và thẻ ATM từ.",

    specs: [
      "Tần số sóng RFID: 13.56 MHz",
      "Loại thẻ tương thích: Thẻ Mifare1 S50, Mifare1 S70",
      "Băng thông truyền dữ liệu: Tối đa 10Mbit/s",
      "Điện áp nuôi mạch đọc: 3.3V DC",
    ],

    image: "rfid",
  },

  {
    id: 61,

    name: "Cảm Biến Áp Suất Khí Quyển & Nhiệt Độ BMP280",

    category: "sensors",

    brand: "Generic",

    price: 38000,

    rating: 4.6,

    reviews: 42,

    stock: 80,

    badge: null,

    description:
      "Cảm biến áp suất khí quyển BMP280 độ chính xác cao, tiêu thụ năng lượng cực thấp, hỗ trợ đo cả nhiệt độ và áp suất khí quyển của môi trường xung quanh.",

    specs: [
      "Điện áp cấp: 1.8 - 3.6V DC",
      "Giao tiếp: I2C hoặc SPI",
      "Dải đo áp suất: 300 - 1100 hPa",
      "Dải đo nhiệt độ: -40 đến 85°C",
    ],

    image: "bmp280",
  },

  {
    id: 62,

    name: "Bo Mạch Vi Điều Khiển Arduino Nano V3 (Chip nạp CH340)",

    category: "microcontrollers",

    brand: "Arduino",

    price: 65000,

    rating: 4.7,

    reviews: 84,

    stock: 120,

    badge: null,

    description:
      "Phiên bản thu nhỏ cực kỳ tiện lợi của Arduino Uno R3, tích hợp cổng nạp Mini-USB và chip nạp CH340, phù hợp làm các mạch ứng dụng kích thước nhỏ gọn.",

    specs: [
      "Vi điều khiển: ATmega328P",
      "Điện áp hoạt động: 5V",
      "Số chân Digital I/O: 14 chân",
      "Số chân Analog Input: 8 chân",
    ],

    image: "nanov3",
  },

  {
    id: 63,

    name: "Mạch Vi Điều Khiển Giá Rẻ STM8S103F3P6 Hệ 8-bit",

    category: "microcontrollers",

    brand: "STMicroelectronics",

    price: 35000,

    rating: 4.4,

    reviews: 23,

    stock: 150,

    badge: null,

    description:
      "Mạch phát triển vi điều khiển 8-bit giá siêu rẻ từ hãng ST, phù hợp cho học sinh, sinh viên nghiên cứu các bài thực hành nhúng cơ bản siêu tiết kiệm.",

    specs: [
      "Lõi xử lý: STM8S 16MHz",
      "Bộ nhớ Flash: 8KB",
      "Bộ nhớ RAM: 1KB",
      "Giao tiếp: UART, SPI, I2C",
    ],

    image: "stm8s",
  },

  {
    id: 64,

    name: "Mạch Nạp ST-Link V2 Cho STM8 và STM32 ARM",

    category: "microcontrollers",

    brand: "STMicroelectronics",

    price: 85000,

    rating: 4.8,

    reviews: 92,

    stock: 45,

    badge: "HOT",

    description:
      "Bộ mạch nạp và gỡ lỗi chuyên nghiệp hỗ trợ đầy đủ các dòng vi điều khiển STM8 qua giao tiếp SWIM và STM32 qua giao tiếp SWD.",

    specs: [
      "Kết nối PC: Cổng USB 2.0",
      "Hỗ trợ gỡ lỗi: SWIM và SWD",
      "Nguồn cấp đầu ra: 3.3V và 5V DC",
    ],

    image: "napstm",
  },

  {
    id: 65,

    name: "Cảm Biến Đo Độ Ẩm Đất Vách Nhôm Chống Ăn Mòn",

    category: "sensors",

    brand: "Generic",

    price: 25000,

    rating: 4.6,

    reviews: 67,

    stock: 95,

    badge: null,

    description:
      "Cảm biến đo độ ẩm đất dạng kim loại mạ niken chống ăn mòn hóa học cao, xuất tín hiệu tương tự analog A0 và tín hiệu số D0.",

    specs: [
      "Điện áp cấp nuôi: 3.3V - 5V DC",
      "Đầu ra cổng: Cả Analog và Digital",
      "IC so sánh tích hợp: LM393 chỉnh độ nhạy",
    ],

    image: "cambiendoam",
  },

  {
    id: 66,

    name: "Cảm Biến Đo Nhịp Tim & Nồng Độ Oxy Máu MAX30102",

    category: "sensors",

    brand: "Generic",

    price: 85000,

    rating: 4.5,

    reviews: 31,

    stock: 40,

    badge: "NEW",

    description:
      "Cảm biến đo nhịp tim và nồng độ bão hòa oxy trong máu (SpO2) bằng công nghệ quang học, giao tiếp qua bus I2C ổn định.",

    specs: [
      "Điện áp nuôi mạch: 1.8V - 3.3V",
      "Giao tiếp chính: Bus I2C tiện lợi",
      "LED phát xạ tích hợp: Đỏ và Hồng ngoại",
    ],

    image: "max30102",
  },

  {
    id: 67,

    name: "Cảm Biến Gia Tốc & Góc Nghiêng 6 Trục MPU6050",

    category: "sensors",

    brand: "Generic",

    price: 55000,

    rating: 4.8,

    reviews: 110,

    stock: 65,

    badge: "HOT",

    description:
      "Cảm biến con quay hồi chuyển Gyroscope kết hợp gia tốc kế accelerometer 6 trục, linh kiện cốt lõi làm robot tự cân bằng hoặc thiết bị bay drone.",

    specs: [
      "Số trục cảm ứng: 3 trục Gyro + 3 trục Accel",
      "Giao thức truyền dữ liệu: Bus I2C",
      "Bộ chuyển đổi ADC tích hợp: 16-bit",
    ],

    image: "mpu6050",
  },

  {
    id: 68,

    name: "Cảm Biến La Bàn Số 3 Trục Định Hướng HMC5883L",

    category: "sensors",

    brand: "Generic",

    price: 45000,

    rating: 4.6,

    reviews: 45,

    stock: 55,

    badge: null,

    description:
      "Cảm biến từ trường đo hướng đi la bàn số 3 trục, hỗ trợ xác định chính xác phương hướng di chuyển cho xe robot tự hành ngoài trời.",

    specs: [
      "Độ phân giải hướng: 1 đến 2 độ",
      "Giao tiếp: Bus I2C tốc độ cao",
      "Dải đo từ trường: ±0.88 đến ±8.1 gauss",
    ],

    image: "hmc5883m",
  },

  {
    id: 69,

    name: "Màn Hình E-Paper 1.54 inch Tiết Kiệm Điện Hiển Thị Mực Điện Tử",

    category: "displays",

    brand: "Generic",

    price: 285000,

    rating: 4.7,

    reviews: 14,

    stock: 12,

    badge: "NEW",

    description:
      "Màn hình mực điện tử e-ink hiển thị chữ sắc nét không tốn điện năng khi giữ nguyên trạng thái. Thích hợp làm bảng tên thông minh.",

    specs: [
      "Kích thước đường chéo: 1.54 inch",
      "Độ phân giải hiển thị: 200x200 Pixels",
      "Chuẩn giao tiếp điều khiển: SPI 3-wire/4-wire",
    ],

    image: "ep",
  },

  {
    id: 70,

    name: "Module LED 7 Đo 8 Chữ Số Sử Dụng Chip MAX7219",

    category: "displays",

    brand: "Generic",

    price: 45000,

    rating: 4.7,

    reviews: 38,

    stock: 60,

    badge: null,

    description:
      "Mạch hiển thị LED 7 đoạn gồm 8 chữ số độc lập nối tiếp nhau qua driver MAX7219, hiển thị số đếm hoặc thời gian lớn rõ ràng.",

    specs: [
      "Tổng số ký số hiển thị: 8 chữ số",
      "IC chuyên dụng điều khiển: MAX7219",
      "Chuẩn giao tiếp nối tiếp: SPI Serial 3 chân",
    ],

    image: "led78",
  },

  {
    id: 71,

    name: "Đế Sạc Pin Lithium 18650 Đôi 2 Khe Cắm Tiện Lợi",

    category: "power",

    brand: "Generic",

    price: 15000,

    rating: 4.5,

    reviews: 120,

    stock: 300,

    badge: null,

    description:
      "Khay nhựa lắp ráp sẵn lò xo kim loại giữ chặt 2 viên pin 18650, có sẵn đầu dây dẫn ra nguồn cấp cho robot.",

    specs: [
      "Số khe lắp pin: 2 khe nối tiếp",
      "Điện áp danh định đầu ra: 7.4V (nếu dùng 2 pin 3.7V)",
      "Chất liệu vỏ khay: Nhựa ABS chịu lực tốt",
    ],

    image: "18650",
  },

  {
    id: 72,

    name: "Mạch Hạ Áp DC-DC Tích Hợp Sạc Nhanh QC3.0 USB",

    category: "power",

    brand: "Generic",

    price: 35000,

    rating: 4.8,

    reviews: 53,

    stock: 80,

    badge: "HOT",

    description:
      "Mạch chuyển đổi nguồn điện DC dải rộng thành ngõ ra USB hỗ trợ sạc nhanh QualComm Quick Charge 3.0 tự động nhận diện thiết bị.",

    specs: [
      "Dải điện áp đầu vào: 6V - 32V DC",
      "Chuẩn sạc nhanh hỗ trợ: QC 3.0, FCP, SCP, AFC",
      "Công suất sạc ra tối đa: 24W",
    ],

    image: "MachHaAp",
  },

  {
    id: 73,

    name: "Bộ Adapter Nguồn 5V 2A DC Jack 5.5x2.1mm",

    category: "power",

    brand: "Generic",

    price: 45000,

    rating: 4.6,

    reviews: 79,

    stock: 140,

    badge: null,

    description:
      "Củ sạc chuyển đổi nguồn AC dân dụng thành 5V DC đầu ra ổn áp sạch, cấp nguồn qua giắc cắm DC tròn phổ thông cho Arduino.",

    specs: [
      "Điện áp cấp vào: 100V - 240V AC",
      "Điện áp ngõ ra cố định: 5.0V DC",
      "Dòng tải ngõ ra tối đa: 2.0A",
    ],

    image: "adt",
  },

  {
    id: 74,

    name: "Động Cơ Giảm Tốc Vàng DC 3-6V Trục Đơn Lực Khỏe",

    category: "robotics",

    brand: "Generic",

    price: 25000,

    rating: 4.7,

    reviews: 290,

    stock: 450,

    badge: null,

    description:
      "Động cơ giảm tốc vỏ nhựa màu vàng phổ thông nhất chuyên dùng thiết kế các mô hình xe robot tránh vật cản hoặc xe dò đường.",

    specs: [
      "Điện áp hoạt động: 3V - 6V DC",
      "Tỷ số truyền giảm tốc: 1:48",
      "Tốc độ không tải ở 6V: 200 vòng/phút",
    ],

    image: "DongCoGiamToc",
  },

  {
    id: 75,

    name: "Bánh Xe Robot Mecanum Đúc Cao Su Đường Kính 80mm Tải Khỏe",

    category: "robotics",

    brand: "Generic",

    price: 75000,

    rating: 4.8,

    reviews: 34,

    stock: 40,

    badge: "NEW",

    description:
      "Bánh xe Mecanum đơn kích thước lớn 80mm đúc cao su đặc ma sát cao, hỗ trợ chịu lực và tải trọng lớn cho robot công nghiệp.",

    specs: [
      "Đường kính ngoài bánh: 80mm",
      "Vật liệu con lăn nhỏ: Cao su đặc chịu tải",
      "Lõi khớp nối: Trục lục giác đồng 6mm",
    ],

    image: "BanhXeRobot",
  },

  {
    id: 76,

    name: "Mạch Driver Điều Khiển Động Cơ Bước A4988 Có Tản Nhiệt",

    category: "robotics",

    brand: "Generic",

    price: 30000,

    rating: 4.7,

    reviews: 82,

    stock: 110,

    badge: null,

    description:
      "Mạch driver vi bước chuyên dụng chạy động cơ bước NEMA 17 cho máy in 3D và CNC mini, đi kèm miếng nhôm dán tản nhiệt.",

    specs: [
      "Điện áp động cơ chịu tối đa: 8V - 35V DC",
      "Dòng tải pha chịu được: 1.0A (Hoặc 2.0A nếu có quạt)",
      "Chế độ vi bước tối đa: 1/16 bước",
    ],

    image: "a4988",
  },

  {
    id: 77,

    name: "Thanh RAM Kingston Fury Beast 16GB DDR4 3200MHz Máy Tính",

    category: "computer",

    brand: "Kingston",

    price: 1650000,

    rating: 4.9,

    reviews: 58,

    stock: 22,

    badge: "HOT",

    description:
      "Thanh nhớ RAM DDR4 dung lượng cao 16GB có tản nhiệt nhôm đen mát mẻ, tăng tốc khả năng đa nhiệm cho PC thiết kế lập trình nhúng.",

    specs: [
      "Dung lượng RAM: 16GB",
      "Xung nhịp bus tối đa: 3200MHz",
      "Kiểu RAM: DDR4 UDIMM có tản nhiệt nhôm",
    ],

    image: "MachDriver-A4988",
  },

  {
    id: 78,

    name: "Keo Tản Nhiệt CPU Cao Cấp Arctic MX-4 (Tuýp 4 Grams)",

    category: "computer",

    brand: "Generic",

    price: 125000,

    rating: 4.9,

    reviews: 145,

    stock: 80,

    badge: null,

    description:
      "Keo tản nhiệt silicon carbon dẫn nhiệt cực tốt chuyên dùng bôi mặt lưng CPU/GPU giúp giảm nóng máy hiệu quả khi render nặng.",

    specs: [
      "Trọng lượng tịnh: 4g dạng xi lanh",
      "Độ dẫn nhiệt: 8.5 W/(mK)",
      "Độ nhớt keo: 870 poise",
    ],

    image: "KeoTanNhietCPU",
  },

  {
    id: 79,

    name: "Hộp Nút Nhấn Tactile Switch Nhiều Kích Cỡ (Hộp 100 Chiếc)",

    category: "components",

    brand: "Generic",

    price: 45000,

    rating: 4.7,

    reviews: 62,

    stock: 130,

    badge: null,

    description:
      "Hộp sắp xếp nhiều nút nhấn cơ đóng ngắt phím bấm 2 chân, 4 chân có độ nảy tốt, thích hợp làm nút Reset hoặc cài đặt thông số.",

    specs: [
      "Số nút nhấn trong hộp: Hộp 100 chiếc",
      "Kích cỡ thông dụng gồm: 6x6x5mm đến 12x12x7.3mm",
    ],

    image: "HopNutNhan",
  },

  {
    id: 80,

    name: "Chiết Áp Xoay Đơn Trị Số 10k Ohms WH148 Kèm Núm Chụp",

    category: "components",

    brand: "Generic",

    price: 8000,

    rating: 4.6,

    reviews: 95,

    stock: 500,

    badge: null,

    description:
      "Điện trở xoay tinh chỉnh giá trị dòng điện và điện áp tương tự analog, đi kèm núm nhựa chụp đầu trục bảo vệ thẩm mỹ.",

    specs: [
      "Trị số trở kháng chuẩn: 10k Ohms",
      "Góc xoay hành trình: 300 độ ±10%",
      "Kiểu đóng gói: Chân cắm WH148 trục dẹt",
    ],

    image: "ChietApXoayDonWh148",
  },

  {
    id: 81,

    name: "Còi Báo Động Buzzer 5V Active Có Sẵn Màng Rung",

    category: "components",

    brand: "Generic",

    price: 5000,

    rating: 4.5,

    reviews: 215,

    stock: 600,

    badge: null,

    description:
      "Còi báo động phát tiếng kêu tít tít chói tai liên tục khi cấp nguồn 5V trực tiếp, còi cảnh báo an toàn cho hệ thống chống trộm.",

    specs: [
      "Điện áp hoạt động: 4V - 7V DC",
      "Dòng điện tiêu thụ: < 30mA khi kêu",
      "Tần số âm thanh phát ra: 2300Hz ±300Hz",
    ],

    image: "CoiBaoDongBuzzer",
  },

  {
    id: 82,

    name: "Cuộn Dây Thiếc Hàn Không Chì Chứa Flux Nhựa Thông Hanxin 100g",

    category: "tools",

    brand: "Generic",

    price: 85000,

    rating: 4.8,

    reviews: 83,

    stock: 90,

    badge: "HOT",

    description:
      "Dây thiếc hàn không chì bảo vệ sức khỏe người dùng, bóng thiếc và dễ bám dính nhờ có pha sẵn lõi nhựa thông trợ hàn bên trong.",

    specs: [
      "Trọng lượng cuộn: 100 grams",
      "Đường kính dây thiếc: 0.8mm",
      "Thành phần hợp kim: Thiếc và Đồng",
    ],

    image: "CuonDayThepHan",
  },

  {
    id: 83,

    name: "Nhíp Gắp Linh Kiện Điện Tử Dán SMD Chống Tĩnh Điện ESD-15",

    category: "tools",

    brand: "Generic",

    price: 25000,

    rating: 4.6,

    reviews: 56,

    stock: 120,

    badge: null,

    description:
      "Nhíp thép gắp linh kiện dán siêu nhỏ đầu nhọn cong ESD-15, phủ lớp sơn tĩnh điện đen nhám chống nhiễm điện từ làm hỏng chip.",

    specs: [
      "Chất liệu chế tạo: Thép không gỉ",
      "Kiểu dáng đầu: Đầu nhọn cong ESD-15",
      "Tính năng bảo vệ: Chống tĩnh điện",
    ],

    image: "NhipGapLinhKien",
  },

  {
    id: 84,

    name: "Bộ Module Thu Phát Sóng Vô Tuyến RF 433MHz Siêu Tái Sinh",

    category: "iot",

    brand: "Generic",

    price: 25000,

    rating: 4.5,

    reviews: 74,

    stock: 110,

    badge: null,

    description:
      "Bộ module truyền nhận không dây qua sóng vô tuyến RF tần số 433MHz bao gồm 1 mạch truyền phát FS1000A và 1 mạch nhận tín hiệu.",

    specs: [
      "Tần số sóng hoạt động: 433.92 MHz",
      "Khoảng cách truyền nhận: 20m - 200m (tùy ăng ten)",
      "Điện áp cấp nuôi: 3.3V - 5V DC",
    ],

    image: "BoModule",
  },

  {
    id: 85,

    name: "Module RFID NFC Đọc Ghi Thẻ Từ Thông Minh PN532",

    category: "iot",

    brand: "Generic",

    price: 135000,

    rating: 4.8,

    reviews: 29,

    stock: 35,

    badge: "NEW",

    description:
      "Module đọc ghi thẻ từ giao thức không tiếp xúc tầm gần NFC tần số 13.56MHz đa giao tiếp hỗ trợ kết nối nhanh với điện thoại.",

    specs: [
      "Chip xử lý chính: NXP PN532",
      "Hỗ trợ chuẩn giao tiếp: I2C, SPI, UART HSU",
      "Khoảng cách đọc ghi tối đa: < 5cm",
    ],

    image: "Module-Pn532",
  },

  {
    id: 86,

    name: "Mạch Phát Triển WiFi ESP8266 ESP-12F WeMos D1 Mini",

    category: "microcontrollers",

    brand: "Espressif",

    price: 65000,

    rating: 4.7,

    reviews: 45,

    stock: 90,

    badge: null,

    description:
      "Bo mạch kích thước siêu nhỏ gọn dựa trên chip WiFi ESP8266. Thích hợp cho các đồ án IoT mini, tiết kiệm không gian và chi phí.",

    specs: [
      "Chip chính: ESP8266EX ESP-12F",
      "Bộ nhớ Flash: 4MB",
      "Chân I/O: 11 chân GPIO (hỗ trợ Interrupt/PWM/I2C/1-Wire)",
      "Chân Analog Input: 1 cổng (Tối đa 3.2V)",
    ],

    image: "MachESp8266",
  },

  {
    id: 87,

    name: "Mạch Nạp Bootloader Cho STM8 STM32 ST-Link V2 Mini",

    category: "microcontrollers",

    brand: "STMicroelectronics",

    price: 95000,

    rating: 4.8,

    reviews: 88,

    stock: 40,

    badge: null,

    description:
      "Mạch nạp nhỏ gọn hỗ trợ giao tiếp debug SWD nạp chương trình cho dòng vi điều khiển STM32 và giao tiếp SWIM cho dòng STM8.",

    specs: [
      "Giao tiếp nạp: SWD / SWIM",
      "Điện áp ra: 3.3V và 5V DC (chân cấp nguồn)",
      "Hỗ trợ cầu chì tự phục hồi chống quá dòng bảo vệ cổng USB",
    ],

    image: "MachSTM8",
  },

  {
    id: 88,

    name: "Mạch Phát Triển LGT8F328P Type-C (Tương Thích Arduino Nano)",

    category: "microcontrollers",

    brand: "Generic",

    price: 95000,

    rating: 4.6,

    reviews: 32,

    stock: 50,

    badge: "NEW",

    description:
      "Mạch tương thích chân kết nối với Arduino Nano nhưng sử dụng MCU LGT8F328P cho tốc độ tính toán gấp đôi và tích hợp sẵn bộ chuyển đổi DAC nội.",

    specs: [
      "Vi điều khiển chính: LGT8F328P (nhân AVR 8-bit)",
      "Tần số thạch anh: 32MHz",
      "Cổng kết nối nạp code: USB Type-C",
      "Tích hợp sẵn DAC 8-bit nội",
    ],

    image: "CamBien-BMP180",
  },

  {
    id: 89,

    name: "Cảm Biến Áp Suất Khí Quyển & Độ Cao BMP180",

    category: "sensors",

    brand: "Bosch",

    price: 35000,

    rating: 4.6,

    reviews: 54,

    stock: 80,

    badge: null,

    description:
      "Cảm biến đo áp suất khí quyển áp dụng thuật toán tính toán độ cao tương đối so với mực nước biển, độ chính xác cao độ ồn cực thấp.",

    specs: [
      "Chuẩn giao tiếp: I2C",
      "Dải đo áp suất khí quyển: 300 - 1100 hPa",
      "Độ cao tối đa đo được: 9000m so với mực nước biển",
      "Tích hợp cảm biến đo nhiệt độ môi trường",
    ],

    image: "CamBien-BMP180",
  },

  {
    id: 90,

    name: "Cảm Biến Cường Độ Ánh Sáng BH1750 Lux I2C",

    category: "sensors",

    brand: "Generic",

    price: 45000,

    rating: 4.7,

    reviews: 62,

    stock: 70,

    badge: null,

    description:
      "Cảm biến đo cường độ ánh sáng kỹ thuật số với dải đo rộng đơn vị đo Lux tiêu chuẩn, không phụ thuộc vào nguồn sáng và phổ nhiệt màu xung quanh.",

    specs: [
      "Chip đo chính: BH1750FVI",
      "Chuẩn giao tiếp: I2C",
      "Dải cường độ đo: 1 - 65535 lx",
      "Không yêu cầu linh kiện tính toán cân chỉnh bên ngoài",
    ],

    image: "CamBienBH1750",
  },

  {
    id: 91,

    name: "Cảm Biến Đo Khoảng Cách Bằng Laser VL53L0X Time-of-Flight",

    category: "sensors",

    brand: "STMicroelectronics",

    price: 115000,

    rating: 4.8,

    reviews: 29,

    stock: 25,

    badge: "HOT",

    description:
      "Cảm biến đo khoảng cách dựa trên nguyên lý đo thời gian bay (Time-of-Flight) của chùm tia laser hồng ngoại cực kỳ chính xác không bị ảnh hưởng bởi màu sắc vật cản.",

    specs: [
      "Chuẩn giao tiếp: I2C",
      "Khoảng cách đo tối đa: 2 mét (chế độ trong nhà)",
      "Bước sóng laser hoạt động: 940nm (an toàn cho mắt)",
      "Dòng điện hoạt động: 10mA",
    ],

    image: "CamBien-VL53LOX",
  },

  {
    id: 92,

    name: "Cảm Biến Nhận Diện Màu Sắc Vật Thể TCS3200",

    category: "sensors",

    brand: "Generic",

    price: 95000,

    rating: 4.4,

    reviews: 18,

    stock: 15,

    badge: null,

    description:
      "Cảm biến chuyển đổi cường độ ánh sáng màu sắc phản xạ RGB sang tần số tín hiệu để vi điều khiển phân tích và nhận biết màu của bề mặt vật thể.",

    specs: [
      "Chip cảm biến chính: TCS3200",
      "Đèn chiếu sáng tích hợp: 4 bóng LED trắng siêu sáng",
      "Đầu ra tín hiệu: Tần số xung tương ứng tỷ lệ màu RGB",
      "Điện áp hoạt động: 3V - 5V DC",
    ],

    image: "CamBien-TCS3200",
  },

  {
    id: 93,

    name: "Màn Hình LCD Character 20x4 Đèn Nền Xanh Dương",

    category: "displays",

    brand: "Generic",

    price: 125000,

    rating: 4.7,

    reviews: 42,

    stock: 30,

    badge: null,

    description:
      "Màn hình tinh thể lỏng hiển thị ký tự cỡ lớn với 4 dòng, mỗi dòng hiển thị tối đa 20 ký tự chữ số. Thích hợp cho các trạm giám sát thông số lớn.",

    specs: [
      "Độ phân giải hiển thị: 20 ký tự x 4 dòng",
      "Điện áp hoạt động: 5V DC",
      "Đèn nền màu: Xanh dương chữ trắng",
      "Hỗ trợ kết nối song song 8-bit hoặc 4-bit thông dụng",
    ],

    image: "MangHinh-LCD20x4",
  },

  {
    id: 94,

    name: "Màn Hình Màu TFT 1.8 inch SPI ST7735 128x160",

    category: "displays",

    brand: "Generic",

    price: 105000,

    rating: 4.6,

    reviews: 37,

    stock: 40,

    badge: null,

    description:
      "Màn hình màu TFT LCD giá tốt giao tiếp bus SPI tốc độ cao, hỗ trợ vẽ hình học cơ bản hiển thị văn bản màu sắc sinh động.",

    specs: [
      "Chip Driver điều khiển: ST7735",
      "Chuẩn giao tiếp: SPI (tiết kiệm chân cắm)",
      "Độ phân giải: 128x160 pixel",
      "Hỗ trợ khe cắm thẻ nhớ SD ở mặt sau màn hình",
    ],

    image: "ManHinhMáuT7735-128x160",
  },

  {
    id: 95,

    name: "Khối Hiển Thị Led Báo Số 7 Đoạn 4 Số TM1637",

    category: "displays",

    brand: "Generic",

    price: 35000,

    rating: 4.8,

    reviews: 51,

    stock: 60,

    badge: null,

    description:
      "Khối hiển thị LED 7 đoạn gồm 4 ký số tích hợp sẵn dấu hai chấm ở giữa, chuyên dùng làm đồng hồ số đo thời gian đếm ngược hoặc bộ đếm sản phẩm.",

    specs: [
      "Chip IC quét LED chính: TM1637",
      "Số chân giao tiếp: 2 chân (DIO, CLK)",
      "Màu sắc hiển thị: Led đỏ nổi bật",
      "Điện áp hoạt động: 3.3V - 5V DC",
    ],

    image: "KhoiHienThiLed-TM1637",
  },

  {
    id: 96,

    name: "Mạch Tăng Áp DC-DC Boost Converter XL6009",

    category: "power",

    brand: "Generic",

    price: 35000,

    rating: 4.6,

    reviews: 85,

    stock: 120,

    badge: null,

    description:
      "Mạch nguồn tăng áp DC sang DC sử dụng biến trở vi chỉnh để nâng điện áp nguồn thấp lên điện áp đích hoạt động cực kỳ ổn định hiệu suất cao.",

    specs: [
      "Chip biến đổi chính: XL6009",
      "Điện áp đầu vào: 3V - 32V DC",
      "Điện áp đầu ra điều chỉnh: 5V - 35V DC",
      "Dòng tải tối đa liên tục: 3A (cần tản nhiệt nếu tải nặng)",
    ],

    image: "MachTangAp-XL6009",
  },

  {
    id: 97,

    name: "Mạch Hạ Áp DC-DC Mini Đa Năng 3A Siêu Nhỏ",

    category: "power",

    brand: "Generic",

    price: 15000,

    rating: 4.7,

    reviews: 95,

    stock: 200,

    badge: "NEW",

    description:
      "Mạch hạ áp biến đổi DC-DC kích thước siêu mini tích hợp biến trở chỉnh nguồn đầu ra hoặc có thể hàn trực tiếp chân cố định nguồn.",

    specs: [
      "Điện áp đầu vào: 4.5V - 24V DC",
      "Điện áp đầu ra thiết lập sẵn: 1.8V, 2.5V, 3.3V, 5V, 9V, 12V",
      "Dòng tải ra tối đa liên tục: 1.5A (đỉnh ngắn hạn 3A)",
      "Tần số chuyển mạch: 1.5MHz",
    ],

    image: "MachHaApDc-Dc3ÁieuNho",
  },

  {
    id: 98,

    name: "Module Sạc Pin Lithium 18650 Tích Hợp Tăng Áp 5V/9V/12V",

    category: "power",

    brand: "Generic",

    price: 30000,

    rating: 4.8,

    reviews: 110,

    stock: 85,

    badge: "HOT",

    description:
      "Module 2 trong 1 vừa sạc pin Lithium 18650 vừa kích tăng áp nguồn ngõ ra có công tắc chọn nguồn, giải pháp nguồn lưu điện UPS mini dự phòng.",

    specs: [
      "Chip quản lý sạc: TP4056 tích hợp bảo vệ pin",
      "Cổng nạp nguồn vào: Type-C",
      "Điện áp đầu ra tùy chỉnh: 5V / 9V / 12V DC thông qua mối hàn",
      "Dòng sạc tối đa cho pin: 1A",
    ],

    image: "ModuleSacPin-18650",
  },

  {
    id: 99,

    name: "Cánh Tay Robot Acrylic 4 Bậc Tự Do Cho Servo SG90",

    category: "robotics",

    brand: "Generic",

    price: 145000,

    rating: 4.5,

    reviews: 23,

    stock: 10,

    badge: null,

    description:
      "Bộ khung cánh tay robot mini bằng chất liệu mica acrylic đen bền đẹp cắt laser chính xác hỗ trợ xoay gắp góc tự do (chưa kèm các động cơ servo).",

    specs: [
      "Chất liệu khung vỏ: Nhựa Acrylic đen dày 3mm",
      "Số bậc tự do: 4 trục chuyển động độc lập",
      "Động cơ tương thích: 4x Động cơ Servo SG90 / MG90S",
      "Bộ sản phẩm bao gồm: Ốc vít và linh kiện cơ khí",
    ],

    image: "CanhTayRobot-SG90",
  },

  {
    id: 100,

    name: "Khung Xe Robot 3 Bánh Tròn Mica Thông Minh",

    category: "robotics",

    brand: "Generic",

    price: 125000,

    rating: 4.6,

    reviews: 45,

    stock: 15,

    badge: null,

    description:
      "Khung xe robot 3 bánh gồm 2 tầng mica tròn đầy đủ động cơ giảm tốc bánh xe và bánh xe mắt trâu xoay chiều, cơ bản cho robot tự hành tránh vật cản.",

    specs: [
      "Động cơ đi kèm: 2x Động cơ DC bánh vàng có bánh xe 65mm",
      "Bánh xe điều hướng: 1x Bánh xe mắt trâu kim loại",
      "Mặt đế: 2 tầng Mica tròn đường kính 140mm",
    ],

    image: "KhungXeoRobotMica",
  },

  {
    id: 101,

    name: "Mạch Điều Khiển Động Cơ Bước A4988 Kèm Tản Nhiệt Nhôm",

    category: "robotics",

    brand: "Allegro",

    price: 22000,

    rating: 4.7,

    reviews: 72,

    stock: 150,

    badge: null,

    description:
      "Mạch driver cắm module điều khiển động cơ bước thông dụng, hỗ trợ chỉnh dòng giới hạn tối đa và nhiều chế độ vi bước để động cơ chuyển động êm ái.",

    specs: [
      "Dòng điện tải ra tối đa: 2A",
      "Điện áp hoạt động cho động cơ: 8V - 35V DC",
      "Chế độ vi bước tối đa: 1/16 bước",
      "Tích hợp sẵn nhôm tản nhiệt màu xanh dương",
    ],

    image: "MachDieuKieu-A4988",
  },

  {
    id: 102,

    name: "Keo Tản Nhiệt CPU Arctic Cooling MX-4 Xịn 4g",

    category: "computer",

    brand: "Arctic",

    price: 125000,

    rating: 4.9,

    reviews: 310,

    stock: 80,

    badge: "HOT",

    description:
      "Dòng keo tản nhiệt máy tính phân khúc cao cấp giúp tối ưu hóa hiệu quả tản nhiệt cho chíp xử lý CPU/GPU của laptop, PC để hoạt động mát mẻ.",

    specs: [
      "Trọng lượng keo: 4 gram",
      "Độ dẫn nhiệt lý thuyết: 8.5 W/(mK)",
      "Độ nhớt chuẩn: 870 poise",
      "Không chứa thành phần kim loại (an toàn tuyệt đối không dẫn điện)",
    ],

    image: "KeoMX-4",
  },

  {
    id: 103,

    name: "Quạt Tản Nhiệt Case Máy Tính LED RGB 12cm Siêu Êm",

    category: "computer",

    brand: "Generic",

    price: 65000,

    rating: 4.6,

    reviews: 140,

    stock: 100,

    badge: null,

    description:
      "Quạt làm mát vỏ thùng máy PC kích thước tissue 120mm trang bị dải đèn Led xoay màu RGB cố định, đệm cao su giảm chấn hạn chế ồn rung.",

    specs: [
      "Kích thước khung quạt: 120 x 120 x 25 mm",
      "Tốc độ vòng quay tối đa: 1200 RPM",
      "Lưu lượng khí làm mát: 38 CFM",
      "Đầu kết nối nguồn: 4-pin Molex cắm trực tiếp nguồn PC",
    ],

    image: "QuatTanNhietRGB12cm",
  },

  {
    id: 104,

    name: "Bộ Đầu Đổi Nguồn Sạc USB Type-C Sang Jack DC 5.5x2.1mm",

    category: "computer",

    brand: "Generic",

    price: 25000,

    rating: 4.7,

    reviews: 53,

    stock: 150,

    badge: null,

    description:
      "Đầu adapter chuyển đổi nguồn từ dây sạc điện thoại USB Type-C sang cổng tròn DC kích thước 5.5x2.1mm thông dụng cấp điện cho các mạch dự án.",

    specs: [
      "Điện áp chịu tải tối đa: 20V DC",
      "Dòng tải tối đa khuyên dùng: 5A",
      "Chất liệu vỏ ngoài: Nhựa đúc bọc cao su chống đứt gãy",
      "Kích thước đầu ra: Tròn ngoài 5.5mm / Kim trong 2.1mm",
    ],

    image: "adt",
  },

  {
    id: 105,

    name: "Hộp Linh Kiện Nhựa Đa Năng 15 Ngăn Trong Suốt",

    category: "components",

    brand: "Generic",

    price: 45000,

    rating: 4.8,

    reviews: 160,

    stock: 50,

    badge: null,

    description:
      "Hộp đựng linh kiện cơ bản phân chia làm 15 ngăn nhỏ giúp phân nhóm dễ dàng các linh kiện nhỏ như điện trở, led, tụ điện không bị thất lạc.",

    specs: [
      "Số ngăn chia: 15 ngăn (có vách ngăn nhựa tháo rời điều chỉnh được)",
      "Kích thước hộp ngoài: 17.4 x 9.8 x 2.2 cm",
      "Chất liệu nhựa: PP trong suốt dày dặn cứng cáp",
    ],

    image: "HopLinhKienNhua-15",
  },

  {
    id: 106,

    name: "Bộ Còi Chip Còi Báo Buzzer 12V Thạch Anh Có Sẵn Màng Rung",

    category: "components",

    brand: "Generic",

    price: 6000,

    rating: 4.5,

    reviews: 38,

    stock: 220,

    badge: null,

    description:
      "Còi báo động phát tiếng bíp bíp liên tục khi được cấp điện áp 12V trực tiếp không cần xung tạo tần số bên ngoài như loa gốm piezo.",

    specs: [
      "Điện áp hoạt động: 9V - 15V DC",
      "Tần số âm thanh phát ra: 2300 Hz (+/- 300Hz)",
      "Mức cường độ âm lượng phát ra: > 85dB ở khoảng cách 10cm",
      "Đường kính loa còi: 12mm",
    ],

    image: "BoCoiCHipCoiBao12v",
  },

  {
    id: 107,

    name: "Hàng Rào Đực Đơn Pin Header 2.54mm 40 Chân (10 Sợi)",

    category: "components",

    brand: "Generic",

    price: 12000,

    rating: 4.8,

    reviews: 190,

    stock: 400,

    badge: null,

    description:
      "Bộ 10 sợi hàng rào đực đơn bước chân tiêu chuẩn 2.54mm dài 40 chân đồng mạ thiếc, dễ dàng bẻ ngắn theo nhu cầu để hàn vào mạch in PCB.",

    specs: [
      "Khoảng cách chân cắm: 2.54mm",
      "Số chân trên 1 sợi: 40 chân đực thẳng",
      "Kiểu chân: Chân đồng thẳng dẹt mạ thiếc tiếp xúc dẫn điện tốt",
    ],

    image: "HảngaoDucDon2.54mm40chan",
  },

  {
    id: 108,

    name: "Kìm Cắt Chân Linh Kiện Điện Tử Plato 170 Cầm Tay Nhỏ",

    category: "tools",

    brand: "Plato",

    price: 35000,

    rating: 4.8,

    reviews: 245,

    stock: 95,

    badge: "HOT",

    description:
      "Kìm cắt chuyên dụng với lưỡi cắt góc chéo nhọn sắc giúp người dùng dễ dàng bấm sát bề mặt cắt gọn các chân linh kiện thừa sau khi hàn mạch.",

    specs: [
      "Thương hiệu: Plato (Model 170)",
      "Khả năng cắt dây đồng tối đa: 1mm",
      "Chất liệu tay cầm: Bọc nhựa cao su chống trượt êm tay",
      "Chiều dài kìm cắt: 130mm",
    ],

    image: "KImCatChanLinhKienPalato170",
  },

  {
    id: 109,

    name: "Thiết Bị Hút Thiếc Bơm Hút Chì Hàn Nhôm Nhựa Cầm Tay",

    category: "tools",

    brand: "Generic",

    price: 30000,

    rating: 4.6,

    reviews: 92,

    stock: 110,

    badge: null,

    description:
      "Bơm hút thiếc hàn cầm tay với lực hút lò xo mạnh giúp thu gom sạch thiếc hàn nóng chảy trên các lỗ mạch in PCB khi tháo rã tháo gỡ linh kiện.",

    specs: [
      "Chất liệu vỏ thân: Nhựa cứng bọc ống nhôm gia cường",
      "Lực hút chân không: Mạnh bằng cơ cấu nhấn lò xo thả phanh",
      "Đầu hút thiếc: Nhựa Teflon chịu nhiệt độ cao không chảy",
    ],

    image: "THietBiHutThietBomHutChi",
  },

  {
    id: 110,

    name: "Mạch Chuyển Đổi Giao Tiếp USB Sang TTL UART CP2102",

    category: "iot",

    brand: "Silicon Labs",

    price: 45000,

    rating: 4.7,

    reviews: 83,

    stock: 75,

    badge: null,

    description:
      "Module chuyển đổi nạp code giao tiếp cổng USB máy tính sang giao thức nối tiếp mức TTL UART để giao tiếp gỡ lỗi nạp code cho vi điều khiển ESP8266, STM32.",

    specs: [
      "Chip điều khiển chính: CP2102 của hãng Silicon Labs",
      "Ngõ ra giao tiếp: 3.3V, 5V, TXD, RXD, GND, DTR",
      "Tích hợp sẵn đèn LED chỉ báo luồng truyền dữ liệu RX/TX",
    ],

    image: "MachChuyendoiUSB-CP2102",
  },
];

// ==========================================

// 2. THEME MANAGER (Quản Lý Giao Diện Sáng/Tối)

// ==========================================

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle");

    this.themeToggleThumb = document.getElementById("theme-toggle-thumb");

    this.root = document.documentElement;

    // Load theme

    const savedTheme = localStorage.getItem("theme") || "dark";

    this.applyTheme(savedTheme);

    // Event Listener

    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
    }
  }

  applyTheme(theme) {
    this.root.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);

    // Update Icon inside Thumb

    if (this.themeToggleThumb) {
      const icon = this.themeToggleThumb.querySelector("i");

      if (icon) {
        if (theme === "light") {
          icon.className = "fa-solid fa-sun";
        } else {
          icon.className = "fa-solid fa-moon";
        }
      }
    }
  }

  toggleTheme() {
    const currentTheme = this.root.getAttribute("data-theme") || "dark";

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    this.applyTheme(newTheme);
  }
}

// ==========================================

// 3. TOAST NOTIFICATION SYSTEM (Hộp Thông Báo Nhanh)

// ==========================================

class ToastManager {
  constructor() {
    this.container = document.getElementById("toast-container");
  }

  show(message, type = "success", duration = 3000) {
    if (!this.container) return;

    const toast = document.createElement("div");

    toast.className = `toast toast-${type}`;

    let iconClass = "fa-solid fa-circle-check";

    if (type === "error") iconClass = "fa-solid fa-circle-xmark";

    if (type === "warning") iconClass = "fa-solid fa-circle-exclamation";

    if (type === "info") iconClass = "fa-solid fa-circle-info";

    toast.innerHTML = `

      <span class="toast-icon"><i class="${iconClass}"></i></span>

      <span class="toast-message">${message}</span>

      <button class="toast-close"><i class="fa-solid fa-xmark"></i></button>

      <div class="toast-progress"></div>

    `;

    // Progress bar animation time

    const progressBar = toast.querySelector(".toast-progress");

    if (progressBar) {
      progressBar.style.animationDuration = `${duration}ms`;
    }

    this.container.appendChild(toast);

    // Auto Dismiss Timer

    const dismissTimer = setTimeout(() => {
      this.removeToast(toast);
    }, duration);

    // Close Button click

    const closeBtn = toast.querySelector(".toast-close");

    closeBtn.addEventListener("click", () => {
      clearTimeout(dismissTimer);

      this.removeToast(toast);
    });
  }

  removeToast(toast) {
    toast.classList.add("removing");

    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }
}

// ==========================================

// 4. CART MANAGER (Quản Lý Giỏ Hàng)

// ==========================================

class CartManager {
  constructor(toastManager) {
    this.toastManager = toastManager;

    // Load cart safely

    try {
      const savedCart = localStorage.getItem("ts_cart");

      this.cart = savedCart ? JSON.parse(savedCart) : [];

      if (!Array.isArray(this.cart)) this.cart = [];
    } catch (e) {
      console.error("Error parsing ts_cart from localStorage:", e);

      this.cart = [];
    }

    // Sidebar elements

    this.cartSidebar = document.getElementById("cart-sidebar");

    this.cartOverlay = document.getElementById("cart-sidebar-overlay");

    this.cartItemsContainer = document.getElementById("cart-items-container");

    this.cartTotalValue = document.getElementById("cart-total-value");

    this.initListeners();

    this.updateBadges();

    this.renderCartUI();
  }

  initListeners() {
    // Open sidebar triggers

    const cartBtnNav = document.getElementById("cart-btn-nav");

    if (cartBtnNav) {
      cartBtnNav.addEventListener("click", () => this.openCart());
    }

    // Close triggers

    const closeBtn = document.getElementById("cart-close-btn");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeCart());
    }

    if (this.cartOverlay) {
      this.cartOverlay.addEventListener("click", () => this.closeCart());
    }

    const continueBtn = document.getElementById("cart-continue-btn");

    if (continueBtn) {
      continueBtn.addEventListener("click", () => this.closeCart());
    }

    // Checkout button

    const checkoutBtn = document.getElementById("cart-checkout-btn");

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (this.cart.length === 0) {
          this.toastManager.show("Giỏ hàng của bạn đang trống!", "warning");

          return;
        }

        checkoutBtn.innerHTML = `<span class="spinner"></span> Đang tạo đơn...`;

        checkoutBtn.disabled = true;

        setTimeout(() => {
          this.toastManager.show(
            "Đặt hàng thành công! Nhân viên TechStore sẽ gọi điện xác nhận đơn cho bạn.",
            "success",
          );

          this.clearCart();

          this.closeCart();

          checkoutBtn.innerHTML = `<i class="fa-solid fa-credit-card"></i> Tiến Hành Đặt Hàng`;

          checkoutBtn.disabled = false;
        }, 1500);
      });
    }
  }

  openCart() {
    if (this.cartSidebar) this.cartSidebar.classList.add("open");

    if (this.cartOverlay) this.cartOverlay.classList.add("open");
  }

  closeCart() {
    if (this.cartSidebar) this.cartSidebar.classList.remove("open");

    if (this.cartOverlay) this.cartOverlay.classList.remove("open");
  }

  addItem(productId, qty = 1, silent = false) {
    const product = products.find((p) => p.id === productId);

    if (!product) return;

    if (product.stock === 0) {
      if (!silent)
        this.toastManager.show(
          `Sản phẩm "${product.name}" hiện tại đã hết hàng.`,
          "error",
        );

      return;
    }

    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      if (existingItem.qty + qty > product.stock) {
        if (!silent)
          this.toastManager.show(
            `Vượt quá số lượng tồn kho của chúng tôi (Tối đa: ${product.stock}).`,
            "warning",
          );

        existingItem.qty = product.stock;
      } else {
        existingItem.qty += qty;

        if (!silent)
          this.toastManager.show(
            `Đã cộng thêm ${qty}x ${product.name} vào giỏ hàng.`,
            "success",
          );
      }
    } else {
      this.cart.push({ id: productId, qty: qty });

      if (!silent)
        this.toastManager.show(
          `Đã thêm ${product.name} vào giỏ hàng thành công.`,
          "success",
        );
    }

    this.saveCart();

    this.updateBadges();

    this.renderCartUI();

    this.animateCartIcon();
  }

  removeItem(productId) {
    const index = this.cart.findIndex((item) => item.id === productId);

    if (index !== -1) {
      this.cart.splice(index, 1);

      this.saveCart();

      this.updateBadges();

      this.renderCartUI();

      this.toastManager.show("Đã xóa sản phẩm khỏi giỏ hàng.", "info");
    }
  }

  updateQuantity(productId, qty) {
    const product = products.find((p) => p.id === productId);

    if (!product) return;

    if (qty <= 0) {
      this.removeItem(productId);

      return;
    }

    if (qty > product.stock) {
      this.toastManager.show(
        `Số lượng vượt quá tồn kho (Tối đa: ${product.stock}).`,
        "warning",
      );

      qty = product.stock;
    }

    const item = this.cart.find((item) => item.id === productId);

    if (item) {
      item.qty = qty;

      this.saveCart();

      this.updateBadges();

      this.renderCartUI();
    }
  }

  clearCart() {
    this.cart = [];

    this.saveCart();

    this.updateBadges();

    this.renderCartUI();
  }

  saveCart() {
    localStorage.setItem("ts_cart", JSON.stringify(this.cart));
  }

  updateBadges() {
    const totalQty = this.cart.reduce((sum, item) => sum + item.qty, 0);

    const countBadge = document.getElementById("cart-count");

    const sidebarCountBadge = document.getElementById("cart-count-sidebar");

    if (countBadge) countBadge.textContent = totalQty;

    if (sidebarCountBadge) sidebarCountBadge.textContent = totalQty;
  }

  animateCartIcon() {
    const cartBtnNav = document.getElementById("cart-btn-nav");

    if (cartBtnNav) {
      cartBtnNav.style.animation = "cartBounce 0.4s ease";

      cartBtnNav.addEventListener(
        "animationend",
        () => {
          cartBtnNav.style.animation = "";
        },
        { once: true },
      );
    }
  }

  renderCartUI() {
    if (!this.cartItemsContainer) return;

    this.cartItemsContainer.innerHTML = "";

    if (this.cart.length === 0) {
      this.cartItemsContainer.innerHTML = `

        <div class="cart-empty">

          <span class="cart-empty-icon">🛒</span>

          <p>Giỏ hàng của bạn đang trống.</p>

        </div>

      `;

      if (this.cartTotalValue) this.cartTotalValue.textContent = "0đ";

      return;
    }

    let subtotal = 0;

    this.cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);

      if (!product) return;

      subtotal += product.price * cartItem.qty;

      const itemElement = document.createElement("div");

      itemElement.className = "cart-item";

      itemElement.innerHTML = `

        <div class="cart-item-img">

          <img src="images/${product.image}.png" alt="${product.name}" class="product-img" style="width: 100%; height: 100%; object-fit: cover;">

        </div>

        <div class="cart-item-info">

          <div class="cart-item-name">${product.name}</div>

          <div class="cart-item-price">${formatVND(product.price)}</div>

          <div class="cart-item-qty">

            <button class="cart-qty-btn qty-minus" data-id="${product.id}">-</button>

            <span class="cart-qty-num">${cartItem.qty}</span>

            <button class="cart-qty-btn qty-plus" data-id="${product.id}">+</button>

          </div>

        </div>

        <button class="cart-item-remove" data-id="${product.id}"><i class="fa-regular fa-trash-can"></i></button>

      `;

      // Gắn sự kiện tăng giảm số lượng bên trong giỏ hàng

      itemElement.querySelector(".qty-minus").addEventListener("click", () => {
        this.updateQuantity(product.id, cartItem.qty - 1);
      });

      itemElement.querySelector(".qty-plus").addEventListener("click", () => {
        this.updateQuantity(product.id, cartItem.qty + 1);
      });

      itemElement
        .querySelector(".cart-item-remove")
        .addEventListener("click", () => {
          this.removeItem(product.id);
        });

      this.cartItemsContainer.appendChild(itemElement);
    });

    if (this.cartTotalValue) {
      this.cartTotalValue.textContent = formatVND(subtotal);
    }
  }
}

// ==========================================

// 5. WISHLIST MANAGER (Sản Phẩm Yêu Thích)

// ==========================================

class WishlistManager {
  constructor(toastManager, cartManager) {
    this.toastManager = toastManager;

    this.cartManager = cartManager;

    // Load wishlist safely

    try {
      const savedWishlist = localStorage.getItem("ts_wishlist");

      this.wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];

      if (!Array.isArray(this.wishlist)) this.wishlist = [];
    } catch (e) {
      console.error("Error parsing ts_wishlist from localStorage:", e);

      this.wishlist = [];
    }

    // Sidebar elements

    this.wishlistSidebar = document.getElementById("wishlist-sidebar");

    this.wishlistOverlay = document.getElementById("wishlist-sidebar-overlay");

    this.wishlistItemsContainer = document.getElementById(
      "wishlist-items-container",
    );

    this.wishlistCountSidebar = document.getElementById(
      "wishlist-count-sidebar",
    );

    this.initListeners();

    this.updateBadge();

    this.renderWishlistUI();
  }

  initListeners() {
    // Open triggers

    const wishlistBtnNav = document.getElementById("wishlist-btn-nav");

    if (wishlistBtnNav) {
      wishlistBtnNav.addEventListener("click", () => this.openWishlist());
    }

    // Close triggers

    const closeBtn = document.getElementById("wishlist-close-btn");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeWishlist());
    }

    if (this.wishlistOverlay) {
      this.wishlistOverlay.addEventListener("click", () =>
        this.closeWishlist(),
      );
    }

    const continueBtn = document.getElementById("wishlist-continue-btn");

    if (continueBtn) {
      continueBtn.addEventListener("click", () => this.closeWishlist());
    }

    // Add all to cart button

    const addAllBtn = document.getElementById("wishlist-add-all-cart-btn");

    if (addAllBtn) {
      addAllBtn.addEventListener("click", () => {
        if (this.wishlist.length === 0) {
          this.toastManager.show("Danh sách yêu thích đang trống!", "warning");

          return;
        }

        let addedCount = 0;

        const itemsToAdd = [...this.wishlist];

        itemsToAdd.forEach((productId) => {
          const product = products.find((p) => p.id === productId);

          if (product && product.stock > 0) {
            this.cartManager.addItem(productId, 1, true);

            addedCount++;
          }
        });

        if (addedCount > 0) {
          this.toastManager.show(
            `Đã thêm tất cả ${addedCount} sản phẩm yêu thích vào giỏ hàng!`,
            "success",
          );

          this.closeWishlist();

          this.cartManager.openCart();
        } else {
          this.toastManager.show(
            "Không có linh kiện nào còn hàng để thêm vào giỏ!",
            "warning",
          );
        }
      });
    }
  }

  openWishlist() {
    if (this.wishlistSidebar) this.wishlistSidebar.classList.add("open");

    if (this.wishlistOverlay) this.wishlistOverlay.classList.add("open");

    this.renderWishlistUI();
  }

  closeWishlist() {
    if (this.wishlistSidebar) this.wishlistSidebar.classList.remove("open");

    if (this.wishlistOverlay) this.wishlistOverlay.classList.remove("open");
  }

  toggle(productId) {
    const product = products.find((p) => p.id === productId);

    if (!product) return;

    const index = this.wishlist.indexOf(productId);

    if (index !== -1) {
      this.wishlist.splice(index, 1);

      this.toastManager.show(
        `Đã xóa ${product.name} khỏi danh sách yêu thích.`,
        "info",
      );
    } else {
      this.wishlist.push(productId);

      this.toastManager.show(
        `Đã thêm ${product.name} vào mục yêu thích.`,
        "success",
      );
    }

    localStorage.setItem("ts_wishlist", JSON.stringify(this.wishlist));

    this.updateBadge();

    this.updateAllGridButtons();

    this.renderWishlistUI();
  }

  isWishlisted(productId) {
    return this.wishlist.includes(productId);
  }

  updateBadge() {
    const badge = document.getElementById("wishlist-count");

    if (badge) badge.textContent = this.wishlist.length;

    if (this.wishlistCountSidebar)
      this.wishlistCountSidebar.textContent = this.wishlist.length;
  }

  updateAllGridButtons() {
    const buttons = document.querySelectorAll(".wishlist-btn");

    buttons.forEach((btn) => {
      const pid = parseInt(btn.getAttribute("data-id"));

      if (pid) {
        if (this.isWishlisted(pid)) {
          btn.classList.add("active");

          btn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        } else {
          btn.classList.remove("active");

          btn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        }
      }
    });
  }

  renderWishlistUI() {
    if (!this.wishlistItemsContainer) return;

    this.wishlistItemsContainer.innerHTML = "";

    if (this.wishlist.length === 0) {
      this.wishlistItemsContainer.innerHTML = `

        <div class="cart-empty">

          <span class="cart-empty-icon" style="color: var(--accent-pink);">❤️</span>

          <p>Danh sách yêu thích trống.</p>

        </div>

      `;

      return;
    }

    this.wishlist.forEach((productId) => {
      const product = products.find((p) => p.id === productId);

      if (!product) return;

      const itemElement = document.createElement("div");

      itemElement.className = "cart-item";

      itemElement.innerHTML = `

        <div class="cart-item-img">

          <img src="images/${product.image}.png" alt="${product.name}" class="product-img" style="width: 100%; height: 100%; object-fit: cover;">

        </div>

        <div class="cart-item-info">

          <div class="cart-item-name">${product.name}</div>

          <div class="cart-item-price">${formatVND(product.price)}</div>

          <button class="add-to-cart-btn" data-id="${product.id}" style="margin-top: 8px; padding: 4px 10px; font-size: 11px; height: auto; width: auto; display: inline-flex;">

            <i class="fa-solid fa-cart-shopping"></i> Thêm Giỏ Hàng

          </button>

        </div>

        <button class="cart-item-remove" data-id="${product.id}" title="Xóa khỏi yêu thích"><i class="fa-regular fa-trash-can"></i></button>

      `;

      itemElement
        .querySelector(".add-to-cart-btn")
        .addEventListener("click", () => {
          this.cartManager.addItem(product.id, 1);
        });

      itemElement
        .querySelector(".cart-item-remove")
        .addEventListener("click", () => {
          this.toggle(product.id);
        });

      this.wishlistItemsContainer.appendChild(itemElement);
    });
  }
}

// ==========================================

// 6. PRODUCT FILTER & RENDERING MANAGER (Bộ Lọc Sản Phẩm)

// ==========================================

class FilterManager {
  constructor(productsList, cartManager, wishlistManager) {
    this.productsList = productsList;

    this.cartManager = cartManager;

    this.wishlistManager = wishlistManager;

    // Grids

    this.productsGrid = document.getElementById("products-grid");
    this.featuredProductsGrid = document.getElementById(
      "featured-products-grid",
    );

    // Filters Inputs

    this.catSelect = document.getElementById("filter-category");

    this.priceSelect = document.getElementById("filter-price");

    this.brandSelect = document.getElementById("filter-brand");

    this.availSelect = document.getElementById("filter-availability");

    this.ratingSelect = document.getElementById("filter-rating");

    this.sortSelect = document.getElementById("filter-sort");

    this.resetBtn = document.getElementById("filter-reset-btn");

    this.activeTab = "all";

    // Pagination / Load More variables

    this.visibleLimit = 20;

    this.loadMoreContainer = document.getElementById("load-more-container");

    this.loadMoreBtn = document.getElementById("load-more-btn");

    this.initFilterEvents();

    this.initModalEvents();

    this.initLoadMoreEvents();
  }

  initFilterEvents() {
    const handleFilterChange = () => {
      this.visibleLimit = 20;

      this.renderFilteredProducts();
    };

    if (this.catSelect)
      this.catSelect.addEventListener("change", handleFilterChange);

    if (this.priceSelect)
      this.priceSelect.addEventListener("change", handleFilterChange);

    if (this.brandSelect)
      this.brandSelect.addEventListener("change", handleFilterChange);

    if (this.availSelect)
      this.availSelect.addEventListener("change", handleFilterChange);

    if (this.ratingSelect)
      this.ratingSelect.addEventListener("change", handleFilterChange);

    if (this.sortSelect)
      this.sortSelect.addEventListener("change", handleFilterChange);

    if (this.resetBtn) {
      this.resetBtn.addEventListener("click", () => {
        if (this.catSelect) this.catSelect.value = "all";

        if (this.priceSelect) this.priceSelect.value = "all";

        if (this.brandSelect) this.brandSelect.value = "all";

        if (this.availSelect) this.availSelect.value = "all";

        if (this.ratingSelect) this.ratingSelect.value = "all";

        if (this.sortSelect) this.sortSelect.value = "default";

        this.visibleLimit = 20;

        this.renderFilteredProducts();
      });
    }

    // Tabs

    const tabBtns = document.querySelectorAll(".tab-btn");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"));

        btn.classList.add("active");

        this.activeTab = btn.getAttribute("data-tab");

        this.visibleLimit = 20;

        this.renderFilteredProducts();
      });
    });
  }

  initLoadMoreEvents() {
    if (this.loadMoreBtn) {
      this.loadMoreBtn.addEventListener("click", () => {
        this.visibleLimit += 20;

        this.renderFilteredProducts(true);
      });
    }
  }

  renderAll() {
    this.renderFilteredProducts();
  }

  renderFilteredProducts(appendOnly = false) {
    if (!appendOnly && this.productsGrid) this.productsGrid.innerHTML = "";
    if (!appendOnly && this.featuredProductsGrid)
      this.featuredProductsGrid.innerHTML = "";

    let items = [...this.productsList];

    // Lọc theo danh mục

    const catVal = this.catSelect ? this.catSelect.value : "all";

    if (catVal !== "all") {
      items = items.filter((p) => p.category === catVal);
    }

    // Lọc theo mức giá

    const priceVal = this.priceSelect ? this.priceSelect.value : "all";

    if (priceVal !== "all") {
      const [low, high] = priceVal.split("-");

      const lowNum = parseInt(low);

      if (high === "up") {
        items = items.filter((p) => p.price >= lowNum);
      } else {
        const highNum = parseInt(high);

        items = items.filter((p) => p.price >= lowNum && p.price <= highNum);
      }
    }

    // Lọc theo hãng sản xuất

    const brandVal = this.brandSelect ? this.brandSelect.value : "all";

    if (brandVal !== "all") {
      items = items.filter((p) => p.brand === brandVal);
    }

    // Lọc theo tình trạng còn hàng

    const availVal = this.availSelect ? this.availSelect.value : "all";

    if (availVal !== "all") {
      if (availVal === "in-stock") {
        items = items.filter((p) => p.stock > 0);
      } else if (availVal === "out-of-stock") {
        items = items.filter((p) => p.stock === 0);
      }
    }

    // Lọc theo xếp hạng sao

    const ratingVal = this.ratingSelect ? this.ratingSelect.value : "all";

    if (ratingVal !== "all") {
      const minRating = parseFloat(ratingVal);

      items = items.filter((p) => p.rating >= minRating);
    }

    // Lọc theo Tabs điều hướng nhanh

    if (this.activeTab === "best-sellers") {
      items = items.filter((p) => p.rating >= 4.8);
    } else if (this.activeTab === "new-arrivals") {
      items = items.filter((p) => p.badge === "NEW");
    } else if (this.activeTab === "trending") {
      items = items.filter((p) => p.badge === "HOT");
    }

    // Sắp xếp tăng giảm

    const sortVal = this.sortSelect ? this.sortSelect.value : "default";

    if (sortVal === "price-asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sortVal === "price-desc") {
      items.sort((a, b) => b.price - a.price);
    } else if (sortVal === "rating-desc") {
      items.sort((a, b) => b.rating - a.rating);
    }

    // Trình bày kết quả lọc

    if (items.length === 0) {
      this.productsGrid.innerHTML = `

        <div class="no-results">

          <div class="no-results-icon">🔍</div>

          <p>Không tìm thấy linh kiện nào khớp với bộ lọc hiện tại.</p>

        </div>

      `;

      if (this.loadMoreContainer) this.loadMoreContainer.style.display = "none";

      return;
    }

    const totalItems = items.length;

    if (appendOnly) {
      const prevLimit = this.visibleLimit - 20;
      const newItems = items.slice(prevLimit, this.visibleLimit);
      newItems.forEach((product) => {
        if (this.productsGrid) {
          const card = this.generateCardHTML(product);
          this.productsGrid.appendChild(card);
        }
      });
    } else {
      const itemsToRender = items.slice(0, this.visibleLimit);

      itemsToRender.forEach((product) => {
        if (this.productsGrid) {
          const card = this.generateCardHTML(product);
          this.productsGrid.appendChild(card);
        }
      });

      if (this.featuredProductsGrid) {
        const limit = parseInt(
          this.featuredProductsGrid.getAttribute("data-limit") || 8,
        );
        items.slice(0, limit).forEach((product) => {
          const card = this.generateCardHTML(product);
          this.featuredProductsGrid.appendChild(card);
        });
      }
    }

    // Hiện / ẩn nút Xem Thêm

    if (this.loadMoreContainer) {
      if (totalItems > this.visibleLimit) {
        this.loadMoreContainer.style.display = "flex";
      } else {
        this.loadMoreContainer.style.display = "none";
      }
    }
  }

  generateCardHTML(product) {
    const card = document.createElement("div");

    card.className = "product-card";

    card.setAttribute("data-category", product.category);

    card.setAttribute("data-price", product.price);

    card.setAttribute("data-rating", product.rating);

    const isWish = this.wishlistManager.isWishlisted(product.id);

    let badgesHTML = "";

    if (product.badge) {
      let vnBadge = product.badge;

      if (product.badge === "NEW") vnBadge = "MỚI";

      if (product.badge === "HOT") vnBadge = "BÁN CHẠY";

      badgesHTML += `<span class="badge-chip badge-${product.badge.toLowerCase()}">${vnBadge}</span>`;
    }

    const isOutOfStock = product.stock === 0;

    card.innerHTML = `

      <div class="product-image-wrap">

        <img src="images/${product.image}.png" alt="${product.name}" class="product-img" style="width: 100%; height: 100%; object-fit: contain;">

        <div class="product-badges">

          ${badgesHTML}

        </div>

        <button class="wishlist-btn ${isWish ? "active" : ""}" data-id="${product.id}" aria-label="Thêm vào yêu thích">

          <i class="${isWish ? "fa-solid" : "fa-regular"} fa-heart"></i>

        </button>

      </div>

      <div class="product-body">

        <span class="product-category-tag">${getVnCatName(product.category)}</span>

        <h3 class="product-name">${product.name}</h3>

        <div class="product-rating">

          <div class="stars">${getStarIcons(product.rating)}</div>

          <span class="rating-count">(${product.reviews})</span>

        </div>

        <div class="product-price-row">

          <span class="product-price">${formatVND(product.price)}</span>

        </div>

        <div class="product-stock" style="color: ${isOutOfStock ? "var(--accent-pink)" : "var(--accent-green)"}">

          <div class="stock-dot" style="background: ${isOutOfStock ? "var(--accent-pink)" : "var(--accent-green)"}"></div> 

          ${isOutOfStock ? "Hết hàng tạm thời" : `Còn hàng (${product.stock})`}

        </div>

      </div>

      <div class="product-actions">

        <button class="add-to-cart-btn btn-add-cart-grid" data-id="${product.id}" ${isOutOfStock ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ""}>

          <i class="fa-solid fa-cart-shopping"></i> ${isOutOfStock ? "Hết hàng" : "Thêm Giỏ Hàng"}

        </button>

        <button class="quick-view-btn btn-quick-view-grid" data-id="${product.id}" aria-label="Xem chi tiết">

          <i class="fa-solid fa-eye"></i>

        </button>

      </div>

    `;

    // Gắn sự kiện click nút tim và giỏ hàng trực tiếp

    card.querySelector(".wishlist-btn").addEventListener("click", (e) => {
      e.stopPropagation();

      this.wishlistManager.toggle(product.id);
    });

    if (!isOutOfStock) {
      card
        .querySelector(".btn-add-cart-grid")
        .addEventListener("click", (e) => {
          e.stopPropagation();

          this.cartManager.addItem(product.id, 1);
        });
    }

    card
      .querySelector(".btn-quick-view-grid")
      .addEventListener("click", (e) => {
        e.stopPropagation();

        openQuickView(product.id, this.cartManager, this.wishlistManager);
      });

    return card;
  }

  initModalEvents() {
    const modal = document.getElementById("product-modal");

    const closeBtn = document.getElementById("modal-close-btn");

    if (modal && closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("open");
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("open");
        }
      });
    }
  }

  filterByCategory(cat) {
    if (this.catSelect) {
      this.catSelect.value = cat;

      this.visibleLimit = 20;

      this.renderFilteredProducts();

      const target = document.getElementById("products");

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}

// ==========================================

// 7. PRODUCT QUICK VIEW MODAL (Chi Tiết Sản Phẩm)

// ==========================================

let currentModalQty = 1;

function openQuickView(productId, cartManager, wishlistManager) {
  const modal = document.getElementById("product-modal");

  const product = products.find((p) => p.id === productId);

  if (!modal || !product) return;

  currentModalQty = 1;

  // Lắp dữ liệu vào Modal

  document.getElementById("modal-product-cat").textContent = getVnCatName(
    product.category,
  ).toUpperCase();

  document.getElementById("modal-product-name").textContent = product.name;

  document.getElementById("modal-product-price").textContent = formatVND(
    product.price,
  );

  document.getElementById("modal-product-desc").textContent =
    product.description;

  // Stars đánh giá

  document.getElementById("modal-product-stars").innerHTML = getStarIcons(
    product.rating,
  );

  document.getElementById("modal-product-reviews").textContent =
    `(${product.reviews} lượt đánh giá thực tế)`;

  // Spec List danh sách thông số kỹ thuật

  const specsList = document.getElementById("modal-product-specs-list");

  specsList.innerHTML = "";

  product.specs.forEach((spec) => {
    const div = document.createElement("div");

    div.className = "spec-item";

    div.innerHTML = `<div class="spec-dot"></div> <span>${spec}</span>`;

    specsList.appendChild(div);
  });

  // Reset lại bộ chọn số lượng

  const qtyInput = document.getElementById("modal-qty-input");

  if (qtyInput) qtyInput.value = currentModalQty;

  // Ảnh thay thế mạch điện tử

  const imageContainer = document.getElementById("modal-image-container");

  if (imageContainer) {
    imageContainer.innerHTML = `<img src="images/${product.image}.png" alt="${product.name}" class="product-img" style="max-height: 280px; max-width: 100%; object-fit: contain;">`;
  }

  // Khởi tạo trạng thái yêu thích bên trong Modal

  const wishlistBtn = document.getElementById("modal-wishlist-btn");

  if (wishlistBtn) {
    const updateWishlistBtnState = () => {
      if (wishlistManager.isWishlisted(product.id)) {
        wishlistBtn.innerHTML = `<i class="fa-solid fa-heart" style="color: var(--accent-pink);"></i>`;
      } else {
        wishlistBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
      }
    };

    updateWishlistBtnState();

    const newWishBtn = wishlistBtn.cloneNode(true);

    wishlistBtn.parentNode.replaceChild(newWishBtn, wishlistBtn);

    newWishBtn.addEventListener("click", () => {
      wishlistManager.toggle(product.id);

      updateWishlistBtnState();
    });
  }

  // Khởi tạo trạng thái nút Mua hàng

  const addToCartBtn = document.getElementById("modal-add-to-cart-btn");

  const isOutOfStock = product.stock === 0;

  if (addToCartBtn) {
    const newCartBtn = addToCartBtn.cloneNode(true);

    addToCartBtn.parentNode.replaceChild(newCartBtn, addToCartBtn);

    if (isOutOfStock) {
      newCartBtn.disabled = true;

      newCartBtn.style.opacity = "0.6";

      newCartBtn.style.cursor = "not-allowed";

      newCartBtn.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Hết Hàng Tạm Thời`;
    } else {
      newCartBtn.disabled = false;

      newCartBtn.style.opacity = "1";

      newCartBtn.style.cursor = "pointer";

      newCartBtn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Thêm Vào Giỏ Hàng`;

      newCartBtn.addEventListener("click", () => {
        cartManager.addItem(product.id, currentModalQty);

        modal.classList.remove("open");
      });
    }
  }

  // Tăng giảm số lượng trong Modal

  const btnMinus = document.getElementById("modal-qty-minus");

  const btnPlus = document.getElementById("modal-qty-plus");

  if (btnMinus && btnPlus && qtyInput) {
    const newMinus = btnMinus.cloneNode(true);

    const newPlus = btnPlus.cloneNode(true);

    btnMinus.parentNode.replaceChild(newMinus, btnMinus);

    btnPlus.parentNode.replaceChild(newPlus, btnPlus);

    if (isOutOfStock) {
      qtyInput.value = "0";
    } else {
      newMinus.addEventListener("click", () => {
        if (currentModalQty > 1) {
          currentModalQty--;

          qtyInput.value = currentModalQty;
        }
      });

      newPlus.addEventListener("click", () => {
        if (currentModalQty < product.stock) {
          currentModalQty++;

          qtyInput.value = currentModalQty;
        }
      });
    }
  }

  modal.classList.add("open");
}

// ==========================================

// 8. LIVE SEARCH SYSTEM (Tìm Kiếm Thời Gian Thực)

// ==========================================

class SearchManager {
  constructor(productsList, filterManager) {
    this.productsList = productsList;

    this.filterManager = filterManager;

    this.triggerInput = document.getElementById("search-input-nav-trigger");

    this.overlay = document.getElementById("search-overlay");

    this.overlayInput = document.getElementById("search-overlay-input");

    this.closeBtn = document.getElementById("search-close-btn");

    this.resultsContainer = document.getElementById("search-results");

    this.initEvents();
  }

  initEvents() {
    // Ẩn overlayInput vì ta sẽ gõ trực tiếp trên triggerInput
    if (this.triggerInput) {
      this.triggerInput.addEventListener("focus", () => this.openOverlay());

      // Ấn ESC để đóng
      window.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          this.overlay &&
          this.overlay.classList.contains("open")
        ) {
          this.closeOverlay();
        }
      });

      // Gõ vào input chính
      let timeout = null;
      this.triggerInput.addEventListener("input", () => {
        if (!this.overlay.classList.contains("open")) {
          this.openOverlay();
        }
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.performSearch(this.triggerInput.value);
        }, 300);
      });
    }

    // Click ra ngoài thì đóng
    document.addEventListener("click", (e) => {
      if (
        this.overlay &&
        this.overlay.classList.contains("open") &&
        !this.overlay.contains(e.target) &&
        e.target !== this.triggerInput
      ) {
        this.closeOverlay();
      }
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeOverlay());
    }
  }

  openOverlay() {
    if (this.overlay) this.overlay.classList.add("open");
    // Khi vừa focus (hoặc mở) -> hiển thị kết quả luôn
    this.performSearch(this.triggerInput ? this.triggerInput.value : "");
  }

  closeOverlay() {
    if (this.overlay) this.overlay.classList.remove("open");
  }

  performSearch(query) {
    if (!this.resultsContainer) return;
    this.resultsContainer.innerHTML = "";

    const cleanQuery = query.toLowerCase().trim();

    // ── 1. LỌC SẢN PHẨM (giống VLAPTOP: name + category + brand) ──
    let filtered;
    if (cleanQuery === "") {
      // Chưa gõ gì → gợi ý 6 sản phẩm nổi bật (HOT badge trước)
      filtered = [...this.productsList]
        .sort(
          (a, b) => (b.badge === "HOT" ? 1 : 0) - (a.badge === "HOT" ? 1 : 0),
        )
        .slice(0, 6);
    } else {
      filtered = this.productsList.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery) ||
          p.brand.toLowerCase().includes(cleanQuery),
      );
    }

    // ── 2. KHÔNG CÓ KẾT QUẢ ──
    if (filtered.length === 0) {
      this.resultsContainer.innerHTML = `
        <div style="text-align:center;padding:40px 20px;color:var(--text-muted)">
          <i class="fa-solid fa-magnifying-glass" style="font-size:28px;margin-bottom:10px;display:block;opacity:.4"></i>
          <p style="margin:0;font-size:14px">Không tìm thấy linh kiện nào khớp với</p>
          <p style="margin:6px 0 0;font-weight:600;color:var(--accent-blue)">"${query}"</p>
        </div>`;
      return;
    }

    // ── 3. NHÓM THEO DANH MỤC (tham khảo từ VLAPTOP keyword grouping) ──
    const grouped = {};
    filtered.slice(0, 12).forEach((p) => {
      const cat = getVnCatName(p.category);
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(p);
    });

    // ── 4. RENDER KẾT QUẢ ──
    Object.entries(grouped).forEach(([catName, items]) => {
      // Header nhóm danh mục
      const header = document.createElement("div");
      header.style.cssText = `
        padding: 8px 16px 4px;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--text-muted);
        border-bottom: 1px solid rgba(255,255,255,0.06);
      `;
      header.textContent = catName;
      this.resultsContainer.appendChild(header);

      items.forEach((p) => {
        const item = document.createElement("div");
        item.className = "search-result-item";
        item.style.cssText = `
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          cursor: pointer;
          transition: background .15s;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        `;
        item.addEventListener(
          "mouseenter",
          () => (item.style.background = "var(--bg-card)"),
        );
        item.addEventListener("mouseleave", () => (item.style.background = ""));

        // Badge tình trạng kho (tham khảo VLAPTOP cart-count badge)
        const inStock = p.stock > 0;
        const stockBadge = `
          <span style="
            font-size: 9px;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 20px;
            background: ${inStock ? "rgba(0,255,136,0.15)" : "rgba(255,70,70,0.15)"};
            color: ${inStock ? "var(--accent-green)" : "#ff4646"};
            flex-shrink: 0;
          ">${inStock ? "Còn hàng" : "Hết hàng"}</span>`;

        // Highlight từ khóa (tham khảo VLAPTOP highlightText)
        const highlightName = cleanQuery
          ? p.name.replace(
              new RegExp(`(${cleanQuery})`, "gi"),
              '<mark style="background:rgba(0,212,255,0.25);color:var(--accent-blue);border-radius:2px;padding:0 1px">$1</mark>',
            )
          : p.name;

        item.innerHTML = `
          <div style="
            width: 44px; height: 44px;
            border-radius: 8px;
            overflow: hidden;
            background: var(--bg-card);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
          ">
            <img src="images/${p.image}.png" alt="${p.name}"
              style="width:100%;height:100%;object-fit:cover"
              onerror="this.style.display='none';this.parentNode.innerHTML='<i class=\\'fa-solid fa-microchip\\' style=\\'font-size:20px;opacity:.3\\'></i>'">
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
              ${highlightName}
            </div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:2px">
              ${p.brand}
              ${p.badge ? `<span style="margin-left:4px;background:var(--accent-blue);color:#000;font-size:9px;padding:1px 5px;border-radius:3px;font-weight:700">${p.badge}</span>` : ""}
            </div>
          </div>
          ${stockBadge}
          <div style="
            font-family: 'Orbitron', sans-serif;
            font-size: 13px;
            font-weight: 700;
            color: var(--accent-blue);
            flex-shrink: 0;
          ">${formatVND(p.price)}</div>`;

        // Click → mở Quick View (giữ nguyên hành vi cũ)
        item.addEventListener("click", () => {
          this.closeOverlay();
          openQuickView(
            p.id,
            this.filterManager.cartManager,
            this.filterManager.wishlistManager,
          );
        });

        this.resultsContainer.appendChild(item);
      });
    });

    // Footer: tổng số kết quả + nút xem tất cả
    if (filtered.length > 12) {
      const footer = document.createElement("div");
      footer.style.cssText = `
        padding: 12px 16px;
        text-align: center;
        border-top: 1px solid rgba(255,255,255,0.08);
      `;
      footer.innerHTML = `
        <button style="
          background: none; border: 1px solid var(--accent-blue);
          color: var(--accent-blue); padding: 6px 20px;
          border-radius: 20px; font-size: 12px; cursor: pointer;
          font-family: 'Orbitron', sans-serif; letter-spacing: .5px;
        " onclick="
          document.getElementById('search-close-btn').click();
          document.getElementById('filter-category').value='all';
          document.querySelector('.filter-btn').click();
        ">
          Xem tất cả ${filtered.length} kết quả
        </button>`;
      this.resultsContainer.appendChild(footer);
    }
  }
}

// ==========================================

// 10. HÀM TRỢ GIÚP (Định Dạng Tiền, Sao, SVG)

// ==========================================

function formatVND(value) {
  return value.toLocaleString("vi-VN") + "đ";
}

function getVnCatName(category) {
  const mapping = {
    microcontrollers: "Vi Điều Khiển",

    sensors: "Cảm Biến",

    displays: "Màn Hình",

    power: "Nguồn & Pin",

    robotics: "Robotics & Động Cơ",

    computer: "Phần Cứng PC",

    components: "Linh Kiện Cơ Bản",

    tools: "Dụng Cụ Thiết Bị",

    iot: "IoT & Không Dây",
  };

  return mapping[category] || category;
}

function getStarIcons(rating) {
  let stars = "";

  const fullStars = Math.floor(rating);

  const hasHalf = rating % 1 >= 0.4;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += '<i class="fa-solid fa-star"></i>';
    } else if (i === fullStars && hasHalf) {
      stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    } else {
      stars += '<i class="fa-regular fa-star"></i>';
    }
  }

  return stars;
}

// ==========================================

// 11. GENERAL UI SETUP (Navbar, Particles, Stats)

// ==========================================

function initNavbar(cartManager, wishlistManager) {
  const navbar = document.getElementById("navbar");

  const hamburger = document.getElementById("hamburger-menu");

  const mobileMenu = document.getElementById("mobile-menu");

  const overlay = document.getElementById("mobile-menu-overlay");

  const stickyWrapper = document.querySelector(".sticky-filter-wrapper");
  let lastScrollY = window.scrollY;
  let isToggling = false;

  // Thêm viền mờ khi trượt trang
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      if (navbar) navbar.classList.add("scrolled");
    } else {
      if (navbar) navbar.classList.remove("scrolled");
    }

    // Tự động thu gọn thanh bộ lọc khi cuộn trang xuống (cách ly sự kiện cuộn tự động của trình duyệt)
    if (stickyWrapper) {
      if (isToggling) {
        lastScrollY = currentScrollY;
      } else {
        if (Math.abs(currentScrollY - lastScrollY) > 10) {
          if (
            stickyWrapper.getBoundingClientRect().top <= 61 &&
            currentScrollY > 300
          ) {
            if (
              currentScrollY > lastScrollY &&
              !stickyWrapper.classList.contains("compact")
            ) {
              stickyWrapper.classList.add("compact");
              isToggling = true;
              setTimeout(() => {
                isToggling = false;
              }, 400);
            } else if (
              currentScrollY < lastScrollY &&
              stickyWrapper.classList.contains("compact")
            ) {
              stickyWrapper.classList.remove("compact");
              isToggling = true;
              setTimeout(() => {
                isToggling = false;
              }, 400);
            }
          } else if (currentScrollY <= 300) {
            stickyWrapper.classList.remove("compact");
          }
          lastScrollY = currentScrollY;
        }
      }
    }
  });

  // Đóng mở menu trên điện thoại

  if (hamburger && mobileMenu && overlay) {
    const toggleMenu = () => {
      hamburger.classList.toggle("open");

      mobileMenu.classList.toggle("open");

      overlay.classList.toggle("open");
    };

    hamburger.addEventListener("click", toggleMenu);

    overlay.addEventListener("click", toggleMenu);

    const mLinks = mobileMenu.querySelectorAll(".mobile-nav-link");

    mLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("open")) toggleMenu();
      });
    });
  }

  // Kết nối sự kiện nhấp chuột vào danh mục

  const setupCatClicks = (selector) => {
    const items = document.querySelectorAll(selector);

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const cat = item.getAttribute("data-category");

        if (cat) {
          const catDropdown = document.getElementById("filter-category");

          if (catDropdown) {
            catDropdown.value = cat;

            catDropdown.dispatchEvent(new Event("change"));

            const gridEl = document.getElementById("products");
            if (gridEl) {
              const y =
                gridEl.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }
        }
      });
    });
  };

  setupCatClicks(".mega-cat-item");

  setupCatClicks(".mega-cat-item-mobile");

  setupCatClicks(".mega-cat-item-footer");

  setupCatClicks(".category-card");
}

// Tạo hạt bay bay trên Banner Hero

function initHeroParticles() {
  const container = document.getElementById("hero-particles");

  if (!container) return;

  const particleIcons = ["🤖", "⚡", "🔋", "⚙️", "📶", "🔌"];

  for (let i = 0; i < 15; i++) {
    const p = document.createElement("div");

    p.className = "particle";

    p.textContent =
      particleIcons[Math.floor(Math.random() * particleIcons.length)];

    p.style.left = `${Math.random() * 100}%`;

    p.style.top = `${Math.random() * 100}%`;

    p.style.fontSize = `${Math.random() * 20 + 14}px`;

    p.style.animationDuration = `${Math.random() * 10 + 8}s`;

    p.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(p);
  }
}

// Bộ đếm tăng tự động các số liệu thống kê

function initStatsCounter() {
  // Fix selector to target correct stats elements in index.html

  const stats = document.querySelectorAll(".stat-value");

  const countUp = (el) => {
    const targetAttr = el.getAttribute("data-target");

    if (!targetAttr) return;

    const target = parseInt(targetAttr);

    if (isNaN(target)) return;

    let count = 0;

    const speed = target / 100;

    const update = () => {
      count += speed;

      if (count < target) {
        el.textContent =
          Math.floor(count).toLocaleString("vi-VN") +
          (target === 99 ? "%" : "+");

        requestAnimationFrame(update);
      } else {
        el.textContent =
          target.toLocaleString("vi-VN") + (target === 99 ? "%" : "+");
      }
    };

    update();
  };

  stats.forEach((stat) => countUp(stat));
}

// ==========================================

// 12. HERO SLIDER CAROUSEL SYSTEM

// ==========================================

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");

  const indicators = document.querySelectorAll(".indicator");

  const prevBtn = document.getElementById("slider-prev");

  const nextBtn = document.getElementById("slider-next");

  if (slides.length === 0) return;

  let currentSlide = 0;

  let autoPlayTimer = null;

  const showSlide = (index) => {
    slides.forEach((slide) => slide.classList.remove("active"));

    indicators.forEach((ind) => ind.classList.remove("active"));

    slides[index].classList.add("active");

    indicators[index].classList.add("active");

    currentSlide = index;
  };

  const nextSlide = () => {
    let next = currentSlide + 1;

    if (next >= slides.length) next = 0;

    showSlide(next);
  };

  const prevSlide = () => {
    let prev = currentSlide - 1;

    if (prev < 0) prev = slides.length - 1;

    showSlide(prev);
  };

  const resetTimer = () => {
    clearInterval(autoPlayTimer);

    autoPlayTimer = setInterval(nextSlide, 5000);
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();

      resetTimer();
    });

    nextBtn.addEventListener("click", () => {
      nextSlide();

      resetTimer();
    });
  }

  indicators.forEach((ind, i) => {
    ind.addEventListener("click", () => {
      showSlide(i);

      resetTimer();
    });
  });

  autoPlayTimer = setInterval(nextSlide, 5000);
}

// ==========================================

// 13. GRADUATION PROJECT SCHEMATICS & TUTORIALS (Dữ Liệu Đấu Nối Đồ Án Kỹ Thuật)

// ==========================================

const projectDatabase = {
  smarthome: {
    title: "Hệ Thống Nhà Thông Minh IoT",

    difficulty: "Trung Bình",

    desc: "Mô hình nhà tự động giám sát rò rỉ khí ga, báo cháy nồng độ khói và theo dõi nhiệt độ ẩm, xuất dữ liệu lên web server.",

    components: [3, 8, 12, 15, 48],

    wiring: [
      { from: "DHT22 Chân Data", to: "ESP32 Chân GPIO 23" },

      { from: "Cảm Biến MQ-2 Chân AO", to: "ESP32 Chân GPIO 34 (ADC1)" },

      { from: "OLED Chân SDA", to: "ESP32 Chân GPIO 21" },

      { from: "OLED Chân SCL", to: "ESP32 Chân GPIO 22" },

      { from: "Relay Chân tín hiệu IN", to: "ESP32 Chân GPIO 18" },
    ],

    code: `

#include <Wire.h>

#include <Adafruit_SSD1306.h>

#include <DHT.h>



#define DHTPIN 23

#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);



void setup() {

  Serial.begin(115200);

  dht.begin();

  pinMode(18, OUTPUT); // Khai báo chân kích Relay còi báo

}



void loop() {

  float h = dht.readHumidity();

  float t = dht.readTemperature();

  int gasValue = analogRead(34);

  

  if (gasValue > 500) {

    digitalWrite(18, HIGH); // Bật quạt thông gió hoặc còi hú

  } else {

    digitalWrite(18, LOW);

  }

  delay(2000);

}`,
  },

  robotcar: {
    title: "Xe Robot Tự Hành Tránh Vật Cản",

    difficulty: "Nâng Cao",

    desc: "Mô hình xe robot 4 bánh tự động tính toán tránh chướng ngại vật trước mặt sử dụng cảm biến siêu âm gắn trên động cơ servo.",

    components: [1, 9, 29, 26, 30],

    wiring: [
      { from: "HC-SR04 Chân Trig", to: "Arduino Chân D12" },

      { from: "HC-SR04 Chân Echo", to: "Arduino Chân D11" },

      { from: "Servo SG90 Dây Cam", to: "Arduino Chân D9 (PWM)" },

      { from: "L298N Chân IN1, IN2", to: "Arduino Chân D5, D6" },

      { from: "L298N Chân IN3, IN4", to: "Arduino Chân D7, D8" },
    ],

    code: `

#include <Servo.h>

Servo radarServo;



const int trigPin = 12;

const int echoPin = 11;



void setup() {

  radarServo.attach(9);

  pinMode(trigPin, OUTPUT);

  pinMode(echoPin, INPUT);

  // Cấu hình chân động cơ DC...

}



long getDistance() {

  digitalWrite(trigPin, LOW);

  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);

  delayMicroseconds(10);

  digitalWrite(trigPin, LOW);

  return pulseIn(echoPin, HIGH) * 0.034 / 2;

}



void loop() {

  long distance = getDistance();

  if (distance < 20) {

    // Dừng lại và xoay cảm biến đo hai bên

    radarServo.write(45);

    delay(500);

    radarServo.write(135);

    delay(500);

  }

}`,
  },

  weather: {
    title: "Trạm Giám Sát Thời Tiết WiFi Mini",

    difficulty: "Cơ Bản",

    desc: "Mô hình trạm đo thời tiết hiển thị áp suất khí quyển độ cao, nhiệt độ ẩm và đẩy gói dữ liệu lên Cloud WiFi.",

    components: [4, 8, 61, 50],

    wiring: [
      { from: "DHT22 Chân Data", to: "ESP8266 Chân D4" },

      { from: "BMP280 Chân SDA", to: "ESP8266 Chân D2" },

      { from: "BMP280 Chân SCL", to: "ESP8266 Chân D1" },
    ],

    code: `

#include <ESP8266WiFi.h>

#include <Adafruit_BMP280.h>



const char* ssid = "WIFI_CUA_BAN";

const char* password = "MAT_KHAU_WIFI";



void setup() {

  Serial.begin(115200);

  WiFi.begin(ssid, password);

  // Kết nối cơ sở dữ liệu Firebase / Blynk...

}



void loop() {

  // Đọc dữ liệu từ BMP280 và DHT22...

  // Đẩy gói JSON lên mạng...

  delay(15000);

}`,
  },

  security: {
    title: "Khóa Cửa RFID & Mật Mã Không Tiếp Xúc",

    difficulty: "Trung Bình",

    desc: "Mô hình khóa thông minh mở cửa bằng cách quẹt thẻ RFID tần số 13.56MHz hoặc nhập mật khẩu trên bàn phím số hiển thị LCD.",

    components: [4, 60, 26, 16, 50],

    wiring: [
      { from: "RC522 RFID SDA", to: "NodeMCU D8" },

      { from: "RC522 RFID SCK", to: "NodeMCU D5" },

      { from: "RC522 RFID MOSI", to: "NodeMCU D7" },

      { from: "RC522 RFID MISO", to: "NodeMCU D6" },

      { from: "Servo SG90 PWM", to: "NodeMCU D4" },

      { from: "LCD 16x2 I2C SDA", to: "NodeMCU D2" },

      { from: "LCD 16x2 I2C SCL", to: "NodeMCU D1" },
    ],

    code: `

#include <SPI.h>

#include <MFRC522.h>

#include <Servo.h>

#include <Wire.h>

#include <LiquidCrystal_I2C.h>



#define SS_PIN 10

#define RST_PIN 9

MFRC522 rfid(SS_PIN, RST_PIN);

Servo lockServo;

LiquidCrystal_I2C lcd(0x27, 16, 2);



void setup() {

  Serial.begin(9600);

  SPI.begin();

  rfid.PCD_Init();

  lockServo.attach(4);

  lcd.init();

  lcd.backlight();

  lcd.print("Quet the RFID...");

}



void loop() {

  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;

  

  String uid = "";

  for (byte i = 0; i < rfid.uid.size; i++) {

    uid += String(rfid.uid.uidByte[i] < 0x10 ? "0" : "") + String(rfid.uid.uidByte[i], HEX);

  }

  

  if (uid == "e2a1b9f3") { // ID thẻ hợp lệ

    lcd.clear();

    lcd.print("Mo Cua Thanh Cong");

    lockServo.write(90);

    delay(3000);

    lockServo.write(0);

    lcd.clear();

    lcd.print("Quet the RFID...");

  }

}`,
  },

  plantmonitor: {
    title: "Hệ Thống Tưới Cây Tự Động Thông Minh",

    difficulty: "Cơ Bản",

    desc: "Trạm kiểm tra giám sát độ ẩm đất, nhiệt độ độ ẩm môi trường xung quanh và tự động kích hoạt máy bơm tưới nước qua rơ-le.",

    components: [1, 8, 13, 48],

    wiring: [
      { from: "DHT22 Chân Data", to: "Arduino Uno D2" },

      { from: "Cảm Biến Ánh Sáng A0", to: "Arduino Uno A0" },

      { from: "Module Relay IN", to: "Arduino Uno D8" },
    ],

    code: `

#include <DHT.h>

#define DHTPIN 2

#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);



const int pumpPin = 8;

const int sensorPin = A0;



void setup() {

  Serial.begin(9600);

  dht.begin();

  pinMode(pumpPin, OUTPUT);

  digitalWrite(pumpPin, LOW);

}



void loop() {

  int moisture = analogRead(sensorPin);

  float temp = dht.readTemperature();

  

  if (moisture > 700) { // Đất khô

    digitalWrite(pumpPin, HIGH); // Bơm nước

    delay(5000); // Bơm 5s

    digitalWrite(pumpPin, LOW);

  }

  delay(10000);

}`,
  },

  industrial: {
    title: "Bộ Điều Khiển Giám Sát Thiết Bị Công Nghiệp",

    difficulty: "Nâng Cao",

    desc: "Hệ thống điều khiển giám sát đóng ngắt động cơ công suất lớn từ xa sử dụng chip ARM Cortex-M3 và cảm biến báo động an toàn khí MQ-2.",

    components: [5, 48, 12, 15],

    wiring: [
      { from: "OLED SDA", to: "STM32 PB7" },

      { from: "OLED SCL", to: "STM32 PB6" },

      { from: "Relay IN", to: "STM32 PA1" },

      { from: "Cảm biến MQ-2 AO", to: "STM32 PA0 (ADC)" },
    ],

    code: `

#include <Wire.h>

#include <Adafruit_SSD1306.h>



Adafruit_SSD1306 display(128, 64, &Wire, -1);



void setup() {

  pinMode(PA1, OUTPUT);

  digitalWrite(PA1, LOW);

  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);

  display.clearDisplay();

  display.setTextSize(1);

  display.setTextColor(WHITE);

}



void loop() {

  int gasVal = analogRead(PA0);

  display.clearDisplay();

  display.setCursor(0,0);

  display.print("Nong do ga: ");

  display.print(gasVal);

  

  if(gasVal > 1500) {

    digitalWrite(PA1, HIGH); // Bật quạt hút công nghiệp

    display.setCursor(0,20);

    display.print("CANH BAO RÒ RỈ KHÍ!");

  } else {

    digitalWrite(PA1, LOW);

  }

  display.display();

  delay(1000);

}`,
  },
};

function initProjects(toastManager, cartManager) {
  const buttons = document.querySelectorAll(".tutorial-btn");

  const modal = document.getElementById("tutorial-modal");

  const closeBtn = document.getElementById("tutorial-modal-close-btn");

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const projId = btn.getAttribute("data-project");

      const proj = projectDatabase[projId];

      if (!proj) return;

      const diffTag = document.getElementById("tutorial-proj-difficulty");

      if (diffTag) {
        diffTag.textContent = proj.difficulty;

        diffTag.className = `section-tag difficulty-${proj.difficulty === "Cơ Bản" ? "beginner" : proj.difficulty === "Trung Bình" ? "intermediate" : "advanced"}`;
      }

      document.getElementById("tutorial-proj-title").textContent = proj.title;

      document.getElementById("tutorial-proj-desc").textContent = proj.desc;

      // Hiển thị danh sách linh kiện thực tế vào #tutorial-proj-components-list

      const listContainer = document.getElementById(
        "tutorial-proj-components-list",
      );

      if (listContainer) {
        listContainer.innerHTML = "";

        proj.components.forEach((productId) => {
          const product = products.find((p) => p.id === productId);

          if (!product) return;

          const row = document.createElement("div");

          row.className = "tutorial-component-row";

          row.innerHTML = `

            <div class="tutorial-component-img" style="width: 40px; height: 40px; border-radius: var(--radius-sm); overflow: hidden; background: var(--bg-card); display: flex; align-items: center; justify-content: center;">

              <img src="images/${product.image}.png" alt="${product.name}" class="product-img" style="width: 100%; height: 100%; object-fit: cover;">

            </div>

            <div class="tutorial-component-info" style="flex: 1; min-width: 0;">

              <div class="tutorial-component-name" style="font-size: 13px; font-weight: 600; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; color: var(--text-primary);">${product.name}</div>

              <div class="tutorial-component-price" style="font-size: 12px; color: var(--accent-blue); font-weight: 700;">${formatVND(product.price)}</div>

            </div>

            <button class="tutorial-component-btn" data-id="${product.id}" style="padding: 6px 12px; background: var(--gradient-blue); border: none; color: #fff; font-size: 11px; font-weight: 600; border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition);">

              Mua Lẻ

            </button>

          `;

          row
            .querySelector(".tutorial-component-btn")
            .addEventListener("click", () => {
              cartManager.addItem(product.id, 1);
            });

          listContainer.appendChild(row);
        });
      }

      // Cấu hình nút "Thêm Tất Cả Linh Kiện Vào Giỏ Hàng"

      const addAllBtn = document.getElementById("tutorial-add-all-cart-btn");

      if (addAllBtn) {
        const newAddAllBtn = addAllBtn.cloneNode(true);

        addAllBtn.parentNode.replaceChild(newAddAllBtn, addAllBtn);

        newAddAllBtn.addEventListener("click", () => {
          let addedCount = 0;

          proj.components.forEach((productId) => {
            const product = products.find((p) => p.id === productId);

            if (product && product.stock > 0) {
              cartManager.addItem(productId, 1, true);

              addedCount++;
            }
          });

          if (addedCount > 0) {
            toastManager.show(
              `Đã thêm tất cả ${addedCount} linh kiện của đồ án vào giỏ hàng!`,
              "success",
            );

            modal.classList.remove("open");

            cartManager.openCart();
          } else {
            toastManager.show(
              "Không có linh kiện nào còn hàng để thêm vào giỏ!",
              "warning",
            );
          }
        });
      }

      // Sơ đồ chân nối dây

      const wiringTable = document.getElementById("tutorial-wiring-table");

      if (wiringTable) {
        wiringTable.innerHTML = `

          <tr>

            <th>Module Chân Nối Dây</th>

            <th>Vi Điều Khiển Chân Đấu Nối</th>

          </tr>

        `;

        proj.wiring.forEach((w) => {
          const tr = document.createElement("tr");

          tr.innerHTML = `

            <td style="color: var(--text-primary); font-weight: 500;">${w.from}</td>

            <td style="color: var(--accent-blue); font-family: monospace;">${w.to}</td>

          `;

          wiringTable.appendChild(tr);
        });
      }

      // Đoạn mã nạp

      const codeBlock = document.getElementById("tutorial-code-block");

      if (codeBlock) {
        codeBlock.textContent = proj.code.trim();
      }

      // Tải xuống zip giả lập

      const downloadBtn = document.getElementById("tutorial-download-code-btn");

      if (downloadBtn) {
        const newDownloadBtn = downloadBtn.cloneNode(true);

        downloadBtn.parentNode.replaceChild(newDownloadBtn, downloadBtn);

        newDownloadBtn.addEventListener("click", () => {
          newDownloadBtn.innerHTML = `<span class="spinner"></span> Đang nén file...`;

          newDownloadBtn.disabled = true;

          setTimeout(() => {
            toastManager.show(
              `Tải xuống tài liệu đồ án "${proj.title}" hoàn tất!`,
              "success",
            );

            newDownloadBtn.innerHTML = `<i class="fa-solid fa-download"></i> Tải Toàn Bộ Code & Sơ Đồ Mạch (.zip)`;

            newDownloadBtn.disabled = false;
          }, 1200);
        });
      }

      modal.classList.add("open");
    });
  });
}

// ==========================================

// 14. FORMS VALIDATION (Biểu Mẫu)

// ==========================================

function initForms(toastManager) {
  const newsForm = document.getElementById("newsletter-form");

  if (newsForm) {
    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const input = newsForm.querySelector("input");

      toastManager.show(
        `Đã đăng ký Email nhận tin tức linh kiện thành công cho: ${input.value}!`,
        "success",
      );

      input.value = "";
    });
  }

  const contactForm = document.getElementById("contact-form");

  const contactBtn = document.getElementById("contact-submit-btn");

  if (contactForm && contactBtn) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      contactBtn.innerHTML = `<span class="spinner"></span> Đang gửi...`;

      contactBtn.disabled = true;

      setTimeout(() => {
        toastManager.show(
          "Lời nhắn đã gửi! Kỹ thuật viên của TechStore VN sẽ phản hồi email cho bạn sớm nhất.",
          "success",
        );

        contactForm.reset();

        contactBtn.innerHTML = `Gửi Lời Nhắn <i class="fa-solid fa-paper-plane"></i>`;

        contactBtn.disabled = false;
      }, 1500);
    });
  }
}

// ==========================================

// 15. SCROLL TO TOP TRIGGER

// ==========================================

function initScrollTop() {
  const btn = document.getElementById("scroll-top-btn");

  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==========================================

// 16. INTERSECTION OBSERVER FOR SCROLL REVEALS

// ==========================================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

revealElements.forEach((el) => observer.observe(el));

// Global Escape keydown listener to close all overlays/modals

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close Product Modal

    const productModal = document.getElementById("product-modal");

    if (productModal && productModal.classList.contains("open")) {
      productModal.classList.remove("open");
    }

    // Close Tutorial Modal

    const tutorialModal = document.getElementById("tutorial-modal");

    if (tutorialModal && tutorialModal.classList.contains("open")) {
      tutorialModal.classList.remove("open");
    }

    // Close Wishlist Drawer

    const wishlistSidebar = document.getElementById("wishlist-sidebar");

    const wishlistOverlay = document.getElementById("wishlist-sidebar-overlay");

    if (wishlistSidebar && wishlistSidebar.classList.contains("open")) {
      wishlistSidebar.classList.remove("open");

      wishlistOverlay.classList.remove("open");
    }

    // Close Cart Drawer

    const cartSidebar = document.getElementById("cart-sidebar");

    const cartOverlay = document.getElementById("cart-sidebar-overlay");

    if (cartSidebar && cartSidebar.classList.contains("open")) {
      cartSidebar.classList.remove("open");

      cartOverlay.classList.remove("open");
    }
  }
});
