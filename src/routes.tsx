import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { NotFound } from './pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
