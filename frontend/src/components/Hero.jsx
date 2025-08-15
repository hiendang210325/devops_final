import { ChevronRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="hero-image-fallback">
          <img
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&q=80"
            alt="Vietnam Landscape"
            className="hero-background-image"
          />
        </div>
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles className="hero-badge-icon" />
          <span>Khám phá vẻ đẹp Việt Nam</span>
        </div>

        <h1 className="hero-title">
          Khám Phá Những
          <span className="hero-highlight"> Điểm Đến Tuyệt Vời </span>
          Của Việt Nam
        </h1>

        <p className="hero-description">
          Từ những phố cổ yên bình đến những vịnh biển hùng vĩ, từ những đỉnh
          núi mây mù đến những cánh đồng lúa xanh mướt. Hãy cùng chúng tôi khám
          phá vẻ đẹp thiên nhiên và văn hóa độc đáo của đất nước hình chữ S.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary">
            Bắt đầu khám phá
            <ChevronRight className="btn-icon" />
          </button>
          <button className="btn btn-secondary">Xem video giới thiệu</button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-number">63</div>
            <div className="stat-label">Tỉnh thành</div>
          </div>
          <div className="stat">
            <div className="stat-number">8</div>
            <div className="stat-label">Di sản thế giới</div>
          </div>
          <div className="stat">
            <div className="stat-number">3,444</div>
            <div className="stat-label">Km bờ biển</div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Cuộn xuống để khám phá</span>
      </div>
    </section>
  );
};

export default Hero;
