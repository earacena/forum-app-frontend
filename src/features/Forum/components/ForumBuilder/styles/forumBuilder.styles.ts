import styled from 'styled-components';

export const ForumBuilderWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: '';
  width: 80%;
  min-width: 300px;
  max-width: 800px;
`;

export const ForumBuilderHeader = styled.h2`
  font-size: 30px;
  color: ${(props) => props.theme.fg};
`;

export const AddTopicButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colorAccent};
  font-size: 20px;
  padding: 10px;
  border: none;
  border-radius: 50%;

  &:hover {
    transform: translate(0, -2px);
  }

  &:active {
    transform: translate(0, 1px);
  }
`;

export const SectionTitle = styled.div`
  color: ${(props) => props.theme.fg};
  font-size: 25px;
  margin-left: 10px;
`;

export const FormField = styled.span`
  display: flex;
  flex-direction: column;
`;

export const TopicFieldsListItem = styled.div`
  display: flex;
  width: 100%;
  
  border-bottom: 1px rgba(255, 255, 255, 0.1) solid;
  margin-bottom: 10px;
  padding-bottom: 10px;
  
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const TopicFieldsListWrapper = styled.ul`
  padding: 0;
  width: 100%;
`;
