import styled from 'styled-components';

type ThreadItemWrapperProps = {
  readonly author: boolean;
};

export const ThreadsTitle = styled.h2`
  margin-bottom: 0;
  color: ${(props) => props.theme.fg};
`;

export const ThreadsDescription = styled.p`
  margin-top: 0;
  font-size: 15px;
  color: ${(props) => props.theme.thread.description};
  font-weight: ${(props) => props.theme.thread.descriptionWeight};
`;

export const ThreadListWrapper = styled.ul`
  width: 100%;
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
  color: ${(props) => props.theme.thread.fg};
  border: 1px transparent solid;
  background: ${(props) => props.theme.thread.bg};
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.17);

  &:hover {
    border: 1px ${(props) => props.theme.colorAccent} solid;
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
  border-left: 1px solid ${(props) => props.theme.thread.separater};
  padding: 0.5em;
  min-width: 110px;
  color: ${(props) => props.theme.thread.description};
  font-weight: 300;
`;

export const ThreadsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 1em;
  padding-left: 0;
  padding-right: 0;
  margin: 0.5em;
  border-radius: 8px;
  min-width: 300px;
  width: 100%;
  max-width: 800px;
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

export const ThreadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1em;
  min-width: 300px;
  max-width: 800px;
`;
