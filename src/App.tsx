import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PlaceholderPage } from './pages/PlaceholderPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/about"
        element={
          <PlaceholderPage
            title="About Me"
            description="This route is reserved for the introduction page. The homepage implementation is already in place, so the next step is to replace this placeholder with your actual profile content."
          />
        }
      />
      <Route
        path="/portfolio"
        element={
          <PlaceholderPage
            title="My Portfolio"
            description="This route is reserved for the portfolio page. For now, it exists only as a navigation target so the homepage can behave like the final SPA." 
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
