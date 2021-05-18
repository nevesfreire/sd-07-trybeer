import styled from 'styled-components';

const MainContainer = styled.main`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const FormContainer = styled.section`
  display: flex;
  background-color: ${({ theme }) => theme.primaryDark};
  width: 40%;
  height: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  border-radius: 3px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.8);
  
  @media(max-width: 650px) {
    width: 90%;
  }
`;

const LiterallyAForm = styled.form`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 50%;

  label {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 5px;
    color: ${({ theme }) => theme.amareloClaro};
    font-weight: 800;
  }

  input {
    width: 100%;
    border-radius: 3px;
    border: none;
    text-align: center;
  }

  .admin-input {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }

  .admin-input input {
    width: 10%;
  }
`;

export { FormContainer, MainContainer, LiterallyAForm };
