import { Outlet } from 'react-router-dom';

import { Footer } from 'components/Footer';

import styled from 'styled-components';

const Layout: React.FC = () => {
  return (
    <LayoutWrapper>
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 1200px;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 120px;
`;
