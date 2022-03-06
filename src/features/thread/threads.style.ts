import styled from 'styled-components';

interface ThreadItemWrapperProps {
  readonly author: boolean;
}

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

export const ThreadListWrapper = styled.ul`
  padding: 1em;
  border-radius: 5px;
  margin: 1em;
  `;

export const ThreadItemWrapper = styled.li<ThreadItemWrapperProps>`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  margin: 1em;
  margin-left: 3em;
  margin-right: 3em;
  padding: 0.5em;
  border-radius: 8px;
  color: black;
  border: 1px lightgrey solid;
  background: ${(props) => (props.author ? 'papayawhip' : '')};
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.17);

  &:hover {
    border: 1px lightgrey solid;
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.4);
  }
`;

export const ThreadTitle = styled.p`
  margin: 0;
  align-self: center;
  font-size: 120%;
`;

export const LeftVerticalLine = styled.span`
  border-left: 1px solid black;
  padding: 0.5em;
  min-width: 110px;
`;

export const ThreadsDiv = styled.div`
  padding: 1em;
  padding-left: 0;
  padding-right: 0;
  margin: 0.5em;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.3);
  border-radius: 8px;
`;
