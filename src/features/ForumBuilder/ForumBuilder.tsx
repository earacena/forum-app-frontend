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
interface ObjectKeys {
  [key: string]: string | number;
}

interface TopicItem extends ObjectKeys {
  topicId: number,
  topicName: string,
  topicDescription: string,
}

type Inputs = {
  forumName: string,
  topicFields: TopicItem[],
};

function ForumBuilderForm() {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [forumName, setForumName] = useState<string>('');
  const [topicFields, setTopicFields] = useState<TopicItem[]>([]);
  const isUserLoggedIn = auth.token !== '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      forumName: '',
      topicFields: [],
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ forumName, topicFields });
  };

  const handleForumNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForumName(event.target.value);
  };

  const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const prevTopicFields = [...topicFields];
    prevTopicFields[index][event.target.name] = event.target.value;
    setTopicFields(prevTopicFields);
  };

  const handleAddTopic = () => {
    setTopicFields((prevTopicFields) => [...prevTopicFields, { topicId: topicFields.length + 1, topicName: '', topicDescription: '' }]);
  };

  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
    }
  }, [navigate, auth.token]);

  return (
    <ForumBuilderWrapper
      style={{ visibility: isUserLoggedIn ? 'visible' : 'hidden' }}
      onSubmit={onSubmit}
    >
      <ForumBuilderHeader>Forum Builder</ForumBuilderHeader>
      <FormLabel htmlFor="forumName" style={{ margin: 0 }}>Forum Name</FormLabel>
      <FormInput id="forumName" value={forumName} onChange={handleForumNameChange} style={{ margin: 0, marginBottom: '10px' }} />

      <SectionTitle>Topics</SectionTitle>
      {
        topicFields.map((topic, index) => (
          <div key={topic.topicId}>
            <FormInput name="topicTitle" placeholder="General Discussions" onChange={(event) => handleFormChange(index, event)} />
            <FormInput name="topicDescription" placeholder="Discussions about everything and anything." onChange={(event) => handleFormChange(index, event)} />
          </div>
        ))
      }
      <AddTopicButton type="button" onClick={handleAddTopic}><GrAdd /></AddTopicButton>
      <button type="submit">Sumbit</button>
    </ForumBuilderWrapper>
  );
}

export default ForumBuilderForm;
