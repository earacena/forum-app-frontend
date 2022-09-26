import styled from 'styled-components';

export const TopicTitle = styled.span`
  font-size: 20px;
  color: ${(props) => props.theme.topic.title};
`;

export const TopicListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const TopicListItem = styled.li`
  cursor: pointer;
  border-radius: 8px;
  background: ${(props) => props.theme.topic.bg};
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.17);
  margin: 0.4em;

  padding: 12px;

  &:hover {
    border: 1px lightgrey solid;
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.3);
  }
  
  &:active {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
    transform: translateY(1px);
  }

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const LeftVerticalLine = styled.span`
  border-left: 1px solid ${(props) => props.theme.topic.seperator};
  color: ${(props) => props.theme.topic.description};
  padding: 0.5em;
  margin-left: 1em;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const TopicsWrapper = styled.div`
  background: transparent;
  border-radius: 8px;
  margin: 1em;
  min-width: 300px;
  width: 90vw;
  max-width: 800px;
`;

export const CenteredDiv = styled.div`
  display: block;
  margin: 0 auto;
`;
