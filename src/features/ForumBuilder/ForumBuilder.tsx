import React, { useState, useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { GrAdd } from 'react-icons/gr';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TopicListWrapper, TopicListItem, TopicTitle } from '../Topics/styles/topics.style';
import { useAppSelector } from '../../hooks';
import { FormInput, FormLabel } from '../../components';

const ForumBuilderWrapper = styled.form`
`;

const ForumBuilderHeader = styled.h2`
  font-size: 30px;
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

const TopicDescriptionInput = styled.textarea`
  padding: 1em;
  margin-top: 0;
  margin: 1em;
  border: 3px black solid;
  border-radius: 7px;
  background: ${(props) => props.theme.form.inputBg};
  color: ${(props) => props.theme.fg};
  ::placeholder {
    color: ${(props) => props.theme.fg}
  }
`;

type TopicItem = {
  topicName: string,
  topicDescription: string,
};

type Inputs = {
  forumName: string,
  topics: TopicItem[],
};

function ForumBuilderForm() {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [topicFormVisible, setTopicFormVisible] = useState<boolean>(false);
  const theme = useContext(ThemeContext);

  const [forumName, setForumName] = useState<string>('');
  const [topicName, setTopicName] = useState<string>('');
  const [topicDescription, setTopicDescription] = useState<string>('');

  const isUserLoggedIn = auth.token !== '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      forumName: '',
      topics: [],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (forumData) => {
    console.log(forumData);
  };

  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
    }
  }, [navigate, auth.token]);

  const handleTopicNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicName(event.target.value);
  };

  const handleForumNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForumName(event.target.value);
  };

  const handleTopicDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopicDescription(event.target.value);
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
    <ForumBuilderWrapper
      onSubmit={handleSubmit(onSubmit)}
      style={{ visibility: isUserLoggedIn ? 'visible' : 'hidden' }}
    >
      <ForumBuilderHeader>Forum Builder</ForumBuilderHeader>
      <FormLabel htmlFor="forumName">Forum Name</FormLabel>
      <FormInput id="forumName" value={forumName} onChange={handleForumNameChange} />

      <p>Add topics to the forum</p>
      <FormLabel>Topics</FormLabel>
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
          <FormLabel>Topic Name</FormLabel>
          <FormInput value={topicName} onChange={handleTopicNameChange} />
          <TopicDescriptionInput value={topicDescription} onChange={handleTopicDescriptionChange} />
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

export default ForumBuilderForm;
