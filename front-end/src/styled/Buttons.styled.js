import styled from 'styled-components';

const MainButton = styled.button`
  border: none;
  cursor: pointer;
  color: #110905;
  font-weight: 800;
  border-radius: 3px;
  margin-top: 10px;
  margin: auto;
  background-color: #C38E00;
  display: flex;
  padding: 10px;

  &&:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default MainButton;
