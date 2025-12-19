import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <MapPin className="footer-icon" />
              <span className="footer-title">Vietnam Explorer</span>
            </div>
            <p className="footer-description">
              Hello VTC 
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Instagram className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Youtube className="social-icon" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Điểm đến</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Hà Nội</a>
              </li>
              <li>
                <a href="#">Hồ Chí Minh</a>
              </li>
              <li>
                <a href="#">Đà Nẵng</a>
              </li>
              <li>
                <a href="#">Nha Trang</a>
              </li>
              <li>
                <a href="#">Phú Quốc</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Dịch vụ</h3>
            <ul className="footer-links">
              <li>
                <a href="#">Tour du lịch</a>
              </li>
              <li>
                <a href="#">Đặt phòng khách sạn</a>
              </li>
              <li>
                <a href="#">Vé máy bay</a>
              </li>
              <li>
                <a href="#">Thuê xe</a>
              </li>
              <li>
                <a href="#">Hướng dẫn viên</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Liên hệ</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+84 123 456 789</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>info@vietnamexplorer.com</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2025 Vietnam Explorer. Tất cả quyền được bảo lưu.</p>
          </div>
          <div className="footer-links-bottom">
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Điều khoản sử dụng</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
