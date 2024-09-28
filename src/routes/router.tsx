import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ThumbnailPage } from 'pages/ThumbnailPage';

import Layout from './layout';

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<Navigate to={'/thumbnail_maker'} replace />} />
          <Route path="/" element={<Navigate to={'/thumbnail_maker'} replace />} />

          <Route path="thumbnail_maker" element={<ThumbnailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
