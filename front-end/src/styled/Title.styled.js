import styled, { keyframes } from 'styled-components';

const dropTitle = keyframes`
  0% {
    transform: translateY(-450%);
    opacity: 0;
  }

  50% {
    opacity: 0.3;
  }

  80% {
    opacity: 0.6;
  }

  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const Title = styled.h1`
  animation: 1s ${dropTitle} ease-out;
  font-size: 3rem;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.8);

  @media(max-width: 650px) {
    font-size: 2.5rem;
  }
`;

export default Title;
