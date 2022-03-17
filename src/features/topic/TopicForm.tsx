import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import FormLabel from '../../components/FormLabel';
import FormInput from '../../components/FormInput';
import FormSubmitButton from '../../components/FormSubmitButton';
import ErrorMessage from '../../components/ErrorMessage';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { notify } from '../notification/Notification';
import topicService from '../../services/topicService';
import { setTopics } from './topic.slice';

interface VisibilityProps {
  readonly visible: boolean;
}

const TopicFormWrapper = styled.form<VisibilityProps>`
  display: ${((props) => (props.visible ? 'flex' : 'none'))};
  flex-direction: column;
  justify-content: center;
  padding: 1em;
`;
const TopicFormTitle = styled.title``;

const CloseButton = styled.button<VisibilityProps>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  cursor: pointer;
  border-radius: 30px;
  padding: 0.5em;
  color: red;
  background: darkred;
  border: 1px darkred solid;
  width: auto;
  height: auto;
  font-size: 16px;
  margin: auto;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
    transform: translateY(2px);
`;

const CreateButton = styled.button<VisibilityProps>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  cursor: pointer;
  border-radius: 20px;
  padding: 0.6em;
  color: lightgrey;
  background: black;
  border: 1px black solid;
  width: auto;
  height: auto;
  font-size: 16px;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
    transform: translateY(2px);
`;

const CenteredDiv = styled.div`
  justify-content: center;
`;

type Inputs = {
  title: string,
  description: string,
};

function TopicForm() {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topics.allTopics);
  const auth = useAppSelector((state) => state.auth);
  const [topicFormVisible, setTopicFormVisible] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (topicData) => {
    try {
      const newTopic = {
        token: auth.token,
        title: topicData.title,
        description: topicData.description,
      };

      const createdTopic = await topicService.create(newTopic);
      dispatch(setTopics(topics.concat(createdTopic)));
      notify('message', 'Created topic successfully.', 4);
    } catch (error) {
      console.error(error);
      notify('error', 'Error creating topic', 4);
    }
  };

  return (
    <div>
      {auth.role === 'admin' && (
        <CenteredDiv>
          <CreateButton
            visible={!topicFormVisible}
            onClick={() => setTopicFormVisible(!topicFormVisible)}
          >
            Start new topic
          </CreateButton>
        </CenteredDiv>
      )}
      <TopicFormWrapper visible={topicFormVisible} onSubmit={handleSubmit(onSubmit)}>
        <CloseButton
          visible={topicFormVisible}
          onClick={() => setTopicFormVisible(!topicFormVisible)}
        >
          X
        </CloseButton>
        <TopicFormTitle>Start a new topic</TopicFormTitle>

        <FormLabel htmlFor="title">Title</FormLabel>
        {errors.title?.type === 'required' && (
          <ErrorMessage>This field is required</ErrorMessage>
        )}
        {errors.title?.type === 'maxLength' && (
          <ErrorMessage>Title is too long</ErrorMessage>
        )}
        <FormInput
          type="text"
          placeholder="General Discussion"
          {...register('title', { required: true, maxLength: 50 })}
        />

        <FormLabel htmlFor="content">Content</FormLabel>
        {errors.description?.type === 'required' && (
          <ErrorMessage>This field is required</ErrorMessage>
        )}
        {errors.description?.type === 'maxLength' && (
          <ErrorMessage>Description is too long</ErrorMessage>
        )}
        <FormInput
          type="text"
          placeholder="Discussions about any topic."
          {...register('description', { required: true, maxLength: 50 })}
        />

        <FormSubmitButton primary type="submit">Create Topic</FormSubmitButton>
      </TopicFormWrapper>
    </div>
  );
}

export default TopicForm;
