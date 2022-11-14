import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsPlusLg } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ThemeContext } from 'styled-components';
import {
  FormLabel,
  FormInput,
  FormSubmitButton,
  ErrorMessage,
  Spin,
} from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { notify } from '../../../Notification';
import topicService from '../../../../services/topicService';
import { setTopics } from '../../stores/topic.slice';
import {
  CenteredDiv,
  CreateButton,
  TopicFormWrapper,
  TopicFormTitle,
  ColumnDiv,
  CloseButton,
} from './styles/topicForm.styles';

type Inputs = {
  title: string,
  description: string,
};

function TopicForm() {
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topics.allTopics);
  const auth = useAppSelector((state) => state.auth);
  const [topicFormVisible, setTopicFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (topicData) => {
    try {
      setIsSubmitting(true);
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
      setIsSubmitting(false);
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
          <FormSubmitButton
            primary
            type="submit"
          >
            { isSubmitting ? <Spin><AiOutlineLoading3Quarters style={{ color: theme.bg, fontSize: '40px' }} /></Spin> : 'Create' }
          </FormSubmitButton>
          <CloseButton
            type="button"
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
