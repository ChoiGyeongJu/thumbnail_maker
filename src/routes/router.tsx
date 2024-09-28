import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './layout';

const router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<Navigate to={'/thumbnail'} replace />} />
          <Route path="/" element={<Navigate to={'/thumbnail'} replace />} />

          <Route path="thumbnail">
            <Route path="list" element={<>component</>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default router;
