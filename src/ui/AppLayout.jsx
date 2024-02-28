import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import Header from './Header';
import SideBar from './SideBar';
const StyledAppLayout = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-rows: auto 1fr;
  grid-template-columns: 26rem 1fr;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;
export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />

      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}
