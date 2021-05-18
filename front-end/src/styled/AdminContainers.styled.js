import styled from 'styled-components';

const PageContainer = styled.main`
  display: flex;
  height: 100vh;
`;

const MainComponentContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 73%;
  align-items: center;
`;

const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  .datas-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      align-items: center;
      display: flex;
      justify-content: space-between;
      width: 22%;
    }
  }
`;

export { PageContainer, MainComponentContainer, ProfileContainer };
