import styled from 'styled-components';

const MainButton = styled.button`
  border: none;
  cursor: pointer;
  color: #110905;
  font-weight: 800;
  border-radius: 3px;
  margin-top: 10px;
  margin: ${({ isForm }) => isForm || 'auto'};
  background-color: ${({ theme }) => theme.amarelo};
  display: flex;
  padding: 10px;
  width: ${({ isForm }) => isForm && '100%'};
  justify-content: center;
  transition: 0.2s;

  &&:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    width: ${({ isForm }) => isForm && '100px'};
  }
`;

const LinkButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  text-decoration: underline;
  transition: 0.2s;

  &&:hover {
    color: blue;
  }
`;

export { MainButton, LinkButton };
