import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

// Mock environment variables
import.meta.env = {
  VITE_BACKEND_URL: 'http://localhost:8080'
}; 