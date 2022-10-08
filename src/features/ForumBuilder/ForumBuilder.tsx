import React, { useState, useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { GrAdd } from 'react-icons/gr';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { TopicListWrapper, TopicListItem, TopicTitle } from '../topic/topics.style';
import { useAppSelector } from '../../hooks';

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

const TopicNameInput = styled.input`
  border-radius: '8px';
  border: 2px solid black;
`;

type TopicItem = {
  topicName: string,
  topicDescription: string,
};

function ForumBuilder() {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [topicFormVisible, setTopicFormVisible] = useState<boolean>(false);
  const theme = useContext(ThemeContext);

  const [topicName, setTopicName] = useState<string>('');
  const isUserLoggedIn = auth.token !== '';

  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
    }
  }, [navigate, auth.token]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicName(event.target.value);
  };

  const handleAcceptClick = () => {
    if (!topics.map((t) => t.topicName).includes(topicName)) {
      setTopics((t) => t.concat({ topicName, topicDescription: '' }));
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
    <ForumBuilderWrapper style={{ visibility: isUserLoggedIn ? 'visible' : 'hidden' }}>
      <ForumBuilderHeader>Add the topics you would like to see in the forum.</ForumBuilderHeader>
      {
        topics.length === 0
        && !topicFormVisible
        && <span style={{ color: theme.fg }}>Use the button below to add a topic.</span>
      }
      <TopicListWrapper>
        {topics && topics.map((t) => (
          <TopicListItem key={t.topicName}>
            <TopicTitle>
              {t.topicName}
              {t.topicDescription}
            </TopicTitle>
          </TopicListItem>
        ))}
      </TopicListWrapper>
      {topicFormVisible
        && (
        <div>
          <TopicNameInput value={topicName} onChange={handleOnChange} />
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
