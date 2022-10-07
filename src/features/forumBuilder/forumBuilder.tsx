import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { GrAdd } from 'react-icons/gr';
import { ImCheckmark, ImCross } from 'react-icons/im';

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

  const [topicName, setTopicName] = useState<string>('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicName(event.target.value);
  };

  const handleAcceptClick = () => {
    if (!topics.includes(topicName)) {
      setTopics((t) => t.concat(topicName));
    }
    setTopicName('');
    setTopicFormVisible(!topicFormVisible);
  };

  const handleCancelClick = () => {
    setTopicFormVisible(!topicFormVisible);
  };

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
      <ul>
        {topics && topics.map((t) => (
          <li key={t}>
            {t}
          </li>
        ))}
      </ul>
      {topicFormVisible
        && (
        <div>
          <input value={topicName} onChange={handleOnChange} />
          <button type="button" onClick={handleAcceptClick}>
            <ImCheckmark />
          </button>
          <button type="button" onClick={handleCancelClick}>
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
