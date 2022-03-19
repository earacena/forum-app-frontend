import styled from 'styled-components';

export const TopicTitle = styled.span`
  font-size: 20px;
`;

export const TopicListWrapper = styled.ul`
  list-style-type: none;
  padding: 1em;
`;

export const TopicListItem = styled.li`
  cursor: pointer;
  padding: 1em;
  border: 1px lightgrey solid;
  border-radius: 8px;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.17);
  margin: 0.4em;

  &:hover {
    border: 1px lightgrey solid;
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.3);
  }
  
  &:active {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
    transform: translateY(1px);
  }
`;

export const LeftVerticalLine = styled.span`
  border-left: 1px solid black;
  padding: 0.5em;
  margin-left: 1em;
`;

export const TopicsWrapper = styled.div`
  padding: 1em;
  border: 1px lightgrey solid;
  border-radius: 8px;
  margin: 1em;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
`;

export const CenteredDiv = styled.div`
display: block;
margin: 0 auto;
`;
