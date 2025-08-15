import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <Destinations
        destinations={destinations}
        loading={loading}
        error={error}
      />
      <Footer />
    </div>
  );
}

export default App;
("// Trigger workflow");
