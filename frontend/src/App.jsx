import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Thay thế bằng URL backend thực tế khi triển khai
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    fetch(`${backendUrl}/api/destinations`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch destinations");
        }
        return res.json();
      })
      .then((data) => {
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy destinations:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Hàm lấy ảnh cho từng điểm đến
  const getDestinationImage = (name) => {
    const images = {
      "Hội An":
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=300&fit=crop&q=80",
      "Hạ Long Bay":
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&q=80",
      Sapa: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80",
      "Mekong Delta":
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=300&fit=crop&q=80",
      "Phú Quốc":
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&q=80",
    };
    return (
      images[name] ||
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=300&fit=crop&q=80"
    );
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">
          <h2>🌟 Đang tải những điểm đến tuyệt vời...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error">
          <h2>⚠️ Oops! Có lỗi xảy ra</h2>
          <p>Lỗi: {error}</p>
          <p>Vui lòng kiểm tra kết nối và thử lại sau.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="header">
        <h1>🌟 Khám Phá Việt Nam</h1>
        <p>
          Khám phá vẻ đẹp tuyệt vời của đất nước hình chữ S với những điểm đến
          độc đáo và ấn tượng
        </p>
      </header>

      <main className="main">
        <div className="hero">
          <h2>Những Điểm Đến Nổi Bật</h2>
          <p>
            Việt Nam tự hào sở hữu những cảnh quan thiên nhiên tuyệt đẹp, di sản
            văn hóa phong phú và ẩm thực độc đáo. Hãy cùng khám phá những điểm
            đến không thể bỏ qua!
          </p>
        </div>

        <div className="destination-list">
          {destinations.length === 0 ? (
            <div className="no-destinations">
              <h3>Chưa có điểm đến nào</h3>
              <p>Vui lòng kiểm tra lại kết nối database.</p>
            </div>
          ) : (
            destinations.map((destination) => (
              <div key={destination.id} className="card">
                <div className="card-image">
                  <img
                    src={getDestinationImage(destination.name)}
                    alt={destination.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="card-image-fallback">
                    {destination.name === "Hội An" && "🏮"}
                    {destination.name === "Hạ Long Bay" && "🏝️"}
                    {destination.name === "Sapa" && "⛰️"}
                    {destination.name === "Mekong Delta" && "🚣"}
                    {destination.name === "Phú Quốc" && "🏖️"}
                    {![
                      "Hội An",
                      "Hạ Long Bay",
                      "Sapa",
                      "Mekong Delta",
                      "Phú Quốc",
                    ].includes(destination.name) && "🌟"}
                  </div>
                </div>
                <div className="card-content">
                  <h2>{destination.name}</h2>
                  <p>{destination.description}</p>
                  <div className="card-footer">
                    <span className="destination-id">#{destination.id}</span>
                    <a href="#" className="explore-btn">
                      Khám Phá
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className="footer">
        <p>🌟 Được tạo với ❤️ cho việc học DevOps - Khám phá vẻ đẹp Việt Nam</p>
      </footer>
    </div>
  );
}

export default App;
"// Trigger workflow" 
