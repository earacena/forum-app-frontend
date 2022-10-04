import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { GrAdd } from 'react-icons/gr';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { BiColorFill } from 'react-icons/bi';

const ForumBuilderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ForumBuilderHeader = styled.h2`
  color: ${(props) => props.theme.fg};
`;

const AddTopicButton = styled.button`
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

function ForumBuilder() {
  const [topics, setTopics] = useState<string[]>([]);
  const [topicFormVisible, setTopicFormVisible] = useState<boolean>(false);
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    setTopicFormVisible(!topicFormVisible);
  };

  return (
    <ForumBuilderWrapper>
      <ForumBuilderHeader>Add the topics you would like to see in the forum.</ForumBuilderHeader>
      {
        topics.length === 0
        && !topicFormVisible
        && <span style={{ color: theme.fg }}>Use the button below to add a topic.</span>
      }
      {topics && topics.map((t) => t)}
      {topicFormVisible
        && (
        <div>
          <input />
          <button type="button">
            <ImCheckmark />
          </button>
          <button type="button" onClick={handleClick}>
            <ImCross />
          </button>
        </div>
        )}

      {!topicFormVisible && (
      <AddTopicButton onClick={handleClick}>
        <GrAdd />
      </AddTopicButton>
      )}
    </ForumBuilderWrapper>
  );
}

export default ForumBuilder;
