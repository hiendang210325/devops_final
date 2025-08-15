import { useState } from "react";
import PropTypes from "prop-types";
import { MapPin, Star, Clock, ArrowRight, Heart, Share2 } from "lucide-react";

const DestinationCard = ({ destination }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getDestinationImage = (name) => {
    const images = {
      "Hội An":
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop&q=80",
      "Hạ Long Bay":
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop&q=80",
      Sapa: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=80",
      "Mekong Delta":
        "https://khanhantravel.com.vn/backend/web/uploads/images/1665471151_301520891_498737665592641_7884737262358814171_n-1024x683.jpg",
      "Phú Quốc":
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=400&fit=crop&q=80",
    };
    return (
      images[name] ||
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop&q=80"
    );
  };

  const getDestinationIcon = (name) => {
    const icons = {
      "Hội An": "🏮",
      "Hạ Long Bay": "🏝️",
      Sapa: "⛰️",
      "Mekong Delta": "🚣",
      "Phú Quốc": "🏖️",
    };
    return icons[name] || "🌟";
  };

  const getDestinationRating = (name) => {
    const ratings = {
      "Hội An": 4.8,
      "Hạ Long Bay": 4.9,
      Sapa: 4.7,
      "Mekong Delta": 4.6,
      "Phú Quốc": 4.8,
    };
    return ratings[name] || 4.5;
  };

  const getDestinationTime = (name) => {
    const times = {
      "Hội An": "2-3 ngày",
      "Hạ Long Bay": "1-2 ngày",
      Sapa: "3-4 ngày",
      "Mekong Delta": "1-2 ngày",
      "Phú Quốc": "4-5 ngày",
    };
    return times[name] || "2-3 ngày";
  };

  return (
    <div className="destination-card">
      <div className="card-image-container">
        <img
          src={getDestinationImage(destination.name)}
          alt={destination.name}
          className={`card-image ${imageLoaded ? "loaded" : ""}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className="card-image-overlay">
          <button
            className={`card-action-btn ${isLiked ? "liked" : ""}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className="action-icon" />
          </button>
          <button className="card-action-btn">
            <Share2 className="action-icon" />
          </button>
        </div>
        <div className="card-badge">
          <span className="badge-icon">
            {getDestinationIcon(destination.name)}
          </span>
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{destination.name}</h3>
          <div className="card-rating">
            <Star className="star-icon filled" />
            <span className="rating-value">
              {getDestinationRating(destination.name)}
            </span>
          </div>
        </div>

        <p className="card-description">{destination.description}</p>

        <div className="card-meta">
          <div className="meta-item">
            <MapPin className="meta-icon" />
            <span>Việt Nam</span>
          </div>
          <div className="meta-item">
            <Clock className="meta-icon" />
            <span>{getDestinationTime(destination.name)}</span>
          </div>
        </div>

        <div className="card-footer">
          <button className="card-btn">
            Khám phá ngay
            <ArrowRight className="btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Destinations = ({ destinations, loading, error }) => {
  if (loading) {
    return (
      <section className="destinations loading-section" id="destinations">
        <div className="container">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <h2>Đang tải những điểm đến tuyệt vời...</h2>
            <p>Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="destinations error-section" id="destinations">
        <div className="container">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Có lỗi xảy ra</h2>
            <p>Lỗi: {error}</p>
            <button className="retry-btn">Thử lại</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="destinations" id="destinations">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Những Điểm Đến
            <span className="title-highlight"> Nổi Bật</span>
          </h2>
          <p className="section-description">
            Khám phá những điểm đến đẹp nhất và nổi tiếng nhất của Việt Nam, từ
            di sản văn hóa thế giới đến thiên nhiên hoang sơ tuyệt đẹp
          </p>
        </div>

        <div className="destinations-grid">
          {destinations.length === 0 ? (
            <div className="no-destinations">
              <h3>Chưa có điểm đến nào</h3>
              <p>Vui lòng kiểm tra lại kết nối database.</p>
            </div>
          ) : (
            destinations.map((destination) => (
              <DestinationCard
                key={destination.id || destination._id}
                destination={destination}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

Destinations.propTypes = {
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default Destinations;
