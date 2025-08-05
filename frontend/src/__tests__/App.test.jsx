import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App.jsx";

describe("App Component", () => {
  beforeEach(() => {
    fetch.mockClear();
    // Mock fetch để trả về Promise mặc định cho các test không cần API
    fetch.mockResolvedValue({
      ok: true,
      json: async () => []
    });
  });

  it("renders heading", async () => {
    render(<App />);
    const heading = await screen.findByText(/Khám Phá Việt Nam/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders hero section", async () => {
    render(<App />);
    const heroText = await screen.findByText(/Những Điểm Đến Nổi Bật/i);
    expect(heroText).toBeInTheDocument();
  });

  it("shows loading state initially", () => {
    render(<App />);
    const loadingText = screen.getByText(/Đang tải những điểm đến tuyệt vời/i);
    expect(loadingText).toBeInTheDocument();
  });

  it("displays destinations when API call succeeds", async () => {
    const mockDestinations = [
      {
        id: 1,
        name: "Hội An",
        description: "Ancient town with lanterns and heritage.",
      },
      {
        id: 2,
        name: "Hạ Long Bay",
        description: "Beautiful bay with limestone islands.",
      },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockDestinations,
    });

    render(<App />);

    // Chờ destinations load
    const hoiAnDestination = await screen.findByText("Hội An");
    const haLongDestination = await screen.findByText("Hạ Long Bay");

    expect(hoiAnDestination).toBeInTheDocument();
    expect(haLongDestination).toBeInTheDocument();
  });

  it("shows error message when API call fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<App />);

    const errorMessage = await screen.findByText(/Oops! Có lỗi xảy ra/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("shows no destinations message when API returns empty array", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<App />);

    const noDestinationsMessage = await screen.findByText(
      /Chưa có điểm đến nào/i
    );
    expect(noDestinationsMessage).toBeInTheDocument();
  });
});
