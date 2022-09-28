import styled, { keyframes } from 'styled-components';

const SpinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
`;

const Spin = styled.div`
  display: flex; 
  animation: ${SpinAnimation} 1s infinite linear;
`;

export default Spin;
