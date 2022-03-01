import styled from 'styled-components';

export const ThreadsTitle = styled.h2`
  text-align: center;
  margin-bottom: 0;
`;

export const ThreadsDescription = styled.p`
  margin-top: 0;
  text-align: center;
  font-size: 15px;
  color: #404040;
`;

export const ThreadListWrapper = styled.div`
  border: 1px black solid;
  padding: 1em;
  border-radius: 5px;
  margin: 1em;
`;

export const ThreadWrapper = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  margin-left: 3em;
  margin-right: 3em;
  padding: 0.5em;
  border-radius: 8px;
  color: black;
  border: 1px black solid;
`;

export const ThreadTitle = styled.p`
  margin: 0;
  align-self: center;
  font-size: 120%;
`;

export const LeftVerticalLine = styled.span`
  border-left: 1px solid black;
  padding: 0.5em;
`;
