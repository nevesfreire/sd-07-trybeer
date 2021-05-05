import styled from 'styled-components';

const FormWrapper = styled.form`  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  label {
    display: flex;
    flex-direction: column;    
    width: 80%;

    &:first-of-type {
      padding-bottom: .5rem;
    }
  }

`;

export default FormWrapper;
