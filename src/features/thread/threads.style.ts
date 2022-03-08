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
  align-self: stretch;
  margin: 1em;
  width: 100%;
  padding: 0.5em;
  border-radius: 8px;
  color: black;
  border: 1px lightgrey solid;
  background: ${(props) => (props.author ? 'papayawhip' : '')};
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.17);

  &:hover {
    border: 1px lightgrey solid;
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.3);
  }

  &:active {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
    transform: translateY(1px);
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

export const DeleteThreadButton = styled.button`
  align-self: center;
  margin: 0;
  height: 2em;
  background: black;
  color: lightgrey;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    background: darkred;
    color: red;

    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:active {
    color: pink;
    transform: translateY(2px);
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.25);

  }
`;

export const ThreadRow = styled.span`
  display: flex;
`;
