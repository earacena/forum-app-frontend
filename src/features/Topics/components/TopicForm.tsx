import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BsPlusLg } from 'react-icons/bs';
import {
  FormLabel, FormInput, FormSubmitButton, ErrorMessage,
} from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { notify } from '../../Notification';
import topicService from '../../../services/topicService';
import { setTopics } from '../stores/topic.slice';

interface VisibilityProps {
  readonly visible: boolean;
}

const TopicFormWrapper = styled.form<VisibilityProps>`
  display: ${((props) => (props.visible ? 'flex' : 'none'))};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1em;
  min-width: 300px;
  width: 100%;
  max-width: 800px;
`;
const TopicFormTitle = styled.title``;

const CloseButton = styled.button<VisibilityProps>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  cursor: pointer;
  border-radius: 30px;
  padding: 0.5em;
  color: ${(props) => props.theme.colorAccent};
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
  border-radius: 50%;
  padding: 0.6em;
  color: black;
  background: hsla(1, 83%, 63%, 1);
  border: none;
  width: auto;
  height: auto;
  font-size: 20px;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
    transform: translateY(2px);
`;

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
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
      if (topics && !topics.map((t) => t.title).includes(topicData.title) && topicFormVisible) {
        const newTopic = {
          token: auth.token,
          title: topicData.title,
          description: topicData.description,
        };

        const createdTopic = await topicService.create(newTopic);
        dispatch(setTopics(topics.concat(createdTopic)));
        notify('message', 'Created topic successfully.', 4);
      }
    } catch (error) {
      console.error(error);
      notify('error', 'Error creating topic', 4);
    }
  };

  return (
    <div>
      {auth.token && auth.role === 'admin' && (
        <CenteredDiv>
          <CreateButton
            visible={!topicFormVisible}
            onClick={() => setTopicFormVisible(!topicFormVisible)}
          >
            <BsPlusLg />
          </CreateButton>
        </CenteredDiv>
      )}
      <TopicFormWrapper visible={topicFormVisible} onSubmit={handleSubmit(onSubmit)}>
        <TopicFormTitle>Start a new topic</TopicFormTitle>

        <ColumnDiv>
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
        </ColumnDiv>

        <ColumnDiv>
          <FormLabel htmlFor="topicDescription">Description</FormLabel>
          {errors.description?.type === 'required' && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
          {errors.description?.type === 'maxLength' && (
            <ErrorMessage>Description is too long</ErrorMessage>
          )}
          <FormInput
            id="topicDescription"
            type="text"
            placeholder="Discussions about any topic."
            {...register('description', { required: true, maxLength: 50 })}
          />
        </ColumnDiv>

        <span>
          <FormSubmitButton primary type="submit">Create</FormSubmitButton>
          <CloseButton
            visible={topicFormVisible}
            onClick={() => setTopicFormVisible(!topicFormVisible)}
          >
            Cancel
          </CloseButton>

        </span>
      </TopicFormWrapper>
    </div>
  );
}

export default TopicForm;
