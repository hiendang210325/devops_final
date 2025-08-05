-- Khởi tạo database destinations với dữ liệu mẫu

-- Tạo bảng destinations
CREATE TABLE IF NOT EXISTS destinations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chèn dữ liệu destinations mẫu
INSERT INTO destinations (name, description) VALUES 
    ('Hội An', 'Ancient town with lanterns and heritage.'),
    ('Hạ Long Bay', 'Beautiful bay with limestone islands.'),
    ('Sapa', 'Mountainous region with ethnic minorities.'),
    ('Mekong Delta', 'River life and floating markets.'),
    ('Phú Quốc', 'Tropical island paradise.')
ON CONFLICT (id) DO NOTHING;

-- Tạo index để tăng hiệu suất
CREATE INDEX IF NOT EXISTS idx_destinations_name ON destinations(name); 