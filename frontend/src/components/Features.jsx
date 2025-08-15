import { Compass, Camera, Map, Users } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Khám phá điểm đến",
    description:
      "Tìm hiểu những địa điểm du lịch tuyệt vời nhất của Việt Nam với hướng dẫn chi tiết",
  },
  {
    icon: Camera,
    title: "Chia sẻ trải nghiệm",
    description:
      "Lưu giữ và chia sẻ những khoảnh khắc đáng nhớ trong chuyến du lịch của bạn",
  },
  {
    icon: Map,
    title: "Lập kế hoạch hành trình",
    description:
      "Tạo lịch trình du lịch hoàn hảo với công cụ lập kế hoạch thông minh",
  },
  {
    icon: Users,
    title: "Cộng đồng du lịch",
    description:
      "Kết nối với cộng đồng những người yêu thích du lịch và khám phá",
  },
];

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Tại sao chọn
            <span className="title-highlight"> Vietnam Explorer</span>
          </h2>
          <p className="section-description">
            Chúng tôi mang đến cho bạn những trải nghiệm du lịch tuyệt vời nhất
            với dịch vụ chuyên nghiệp và đam mê khám phá
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <IconComponent />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
