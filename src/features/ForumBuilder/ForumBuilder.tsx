import React, { useState, useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { GrAdd } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TopicListWrapper, TopicListItem, TopicTitle } from '../Topics/styles/topics.style';
import { useAppSelector } from '../../hooks';
import { FormInput, FormLabel, FormSubmitButton } from '../../components';

const ForumBuilderWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: '';
  width: 80%;
  min-width: 300px;
  max-width: 800px;
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

const TopicDescriptionInput = styled.input`
  padding: 1em;
  margin: 1em;
  margin-top: 0;
  border: 3px black solid;
  border-radius: 7px;
  background: ${(props) => props.theme.form.inputBg};
  color: ${(props) => props.theme.fg};
  ::placeholder {
    color: ${(props) => props.theme.fg}
  }

`;

const LeftVerticalLine = styled.span`
  border-left: 1px solid ${(props) => props.theme.topic.separator};
  color: ${(props) => props.theme.topic.description};
  padding: 0.5em;
  margin-left: 1em;
  font-weight: 300;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const AddTopicInputs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const SectionTitle = styled.div`
  color: ${(props) => props.theme.fg};
  font-size: 25px;
`;

type ButtonProps = {
  readonly primary: boolean,
};

const Button = styled.button<ButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${(props) => (props.primary ? (props.theme.colorAccent) : props.theme.bg)};
  color: ${(props) => (props.primary ? (props.theme.form.inputBg) : (props.theme.colorAccent))};
  border-radius: 10px;
  font-size: 1em;
  font-weight: 500;
  padding: 12px;
  border: ${(props) => ((props.primary) ? '2px transparent solid' : '2px transparent solid')};
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);
  width: auto;
  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
    background: ${(props) => (props.primary ? 'black' : 'black')};
    border: ${(props) => (props.primary ? '2px transparent solid' : `2px ${props.theme.colorAccent} solid`)};
    color: ${(props) => (props.primary ? 'white' : 'white')};
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
    transform: translateY(2px);
    color: ${(props) => (props.primary ? 'lightgrey' : 'black')};
  }
`;

const TopicNameField = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopicDescriptionField = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1
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

  const handleTopicDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicDescription(event.target.value);
  };

  const handleAcceptClick = () => {
    if (topicName && !topics.map((t) => t.topicName).includes(topicName)) {
      setTopics((t) => t.concat({ topicName, topicDescription }));
    }
    setTopicName('');
    setTopicDescription('');
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
      <FormLabel htmlFor="forumName" style={{ margin: 0 }}>Forum Name</FormLabel>
      <FormInput id="forumName" value={forumName} onChange={handleForumNameChange} style={{ margin: 0, marginBottom: '10px' }} />

      <SectionTitle>Topics</SectionTitle>
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
              <LeftVerticalLine>
                {t.topicDescription}
              </LeftVerticalLine>
            </TopicTitle>
          </TopicListItem>
        ))}
      </TopicListWrapper>
      {topicFormVisible
        && (
        <AddTopicInputs>
          <TopicNameField>
            <FormLabel htmlFor="topicName">Topic Name</FormLabel>
            <FormInput id="topicName" value={topicName} onChange={handleTopicNameChange} />
          </TopicNameField>

          <TopicDescriptionField>
            <FormLabel htmlFor="topicDescription">Topic Description</FormLabel>
            <TopicDescriptionInput id="topicDescription" value={topicDescription} onChange={handleTopicDescriptionChange} style={{ flex: 1 }} />
          </TopicDescriptionField>
          <Button primary type="button" onClick={handleAcceptClick}>
            Add
          </Button>
          <Button primary={false} type="button" onClick={handleCancelClick}>
            Cancel
          </Button>
        </AddTopicInputs>
        )}

      {!topicFormVisible && (
      <AddTopicButton onClick={handleClick}>
        <GrAdd />
      </AddTopicButton>
      )}

      <FormSubmitButton type="submit">Create</FormSubmitButton>
    </ForumBuilderWrapper>
  );
}

export default ForumBuilderForm;
