import { useState, useEffect } from "react";
import { Menu, X, MapPin } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav-container">
        <div className="nav-brand">
          <MapPin className="nav-icon" />
          <span className="nav-title">Vietnam Explorer</span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
          <a href="#home" className="nav-link">
            Trang chủ
          </a>
          <a href="#destinations" className="nav-link">
            Điểm đến
          </a>
          <a href="#about" className="nav-link">
            Về chúng tôi
          </a>
          <a href="#contact" className="nav-link">
            Liên hệ
          </a>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  );
};

export default Header;
