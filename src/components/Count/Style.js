import styled from 'styled-components';


export const Countdown = styled.div`
 font-size: 120px;
  font-weight: bold;
  text-align: center;
  margin-top: 120px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 1;
  transform: scale(1);
  // display: ${p => (p.display ? p.display : 'none')};
  &.animate{
    transform: scale(1.8);
    opacity: 0.3;
  }
`;
