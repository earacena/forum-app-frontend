import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ThemeContext } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
  FormInput,
  FormSubmitButton,
  ErrorMessage,
  FormLabel,
  Spin,
} from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import postService from '../../../../services/postService';
import threadService from '../../../../services/threadService';
import { notify } from '../../../Notification';
import { setThreads } from '../../stores/thread.slice';
import {
  ThreadFormTitle,
  ThreadFormWrapper,
  TextArea,
  CreateButton,
  CloseButton,
  CenteredDiv,
} from './styles/threadForm.style';

type Inputs = {
  title: string;
  content: string;
};

function ThreadForm() {
  const theme = useContext(ThemeContext);
  const auth = useAppSelector((state) => state.auth);
  const threads = useAppSelector((state) => state.threads.allThreads);
  const currentTopic = useAppSelector((state) => state.topics.currentTopic);
  const dispatch = useAppDispatch();
  const [threadFormVisible, setThreadFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (threadData) => {
    try {
      setIsSubmitting(true);
      // Prepare new thread
      if (!currentTopic) {
        throw new Error('Cannot post in a undefined topic');
      }

      const newThread = {
        token: auth.user?.token,
        title: threadData.title,
        topicId: currentTopic.id,
      };

      // POST new thread, get id
      const createdThread = await threadService.create(newThread);
      if (threads) {
        dispatch(setThreads({ threads: threads.concat(createdThread) }));

        // Prepare new post for thread
        const newPost = {
          token: auth.user?.token,
          content: threadData.content,
          threadId: createdThread.id,
          isOriginalPost: true,
        };

        // POST new post
        await postService.create(newPost);

        notify('message', 'Thread created.', 4);
        reset({
          title: '',
          content: '',
        });
        setThreadFormVisible(!threadFormVisible);
      }
    } catch (error: unknown) {
      setIsSubmitting(false);
      notify('error', 'Error while creating thread.', 4);
    }
  };

  return (
    <div>
      {auth.user?.token && (
        <CenteredDiv>
          <CreateButton
            visible={!threadFormVisible}
            onClick={() => setThreadFormVisible(!threadFormVisible)}
          >
            Create Thread
          </CreateButton>
        </CenteredDiv>
      )}

      <ThreadFormWrapper
        visible={threadFormVisible}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CloseButton
          type="button"
          visible={threadFormVisible}
          onClick={() => setThreadFormVisible(!threadFormVisible)}
        >
          Cancel
        </CloseButton>
        <ThreadFormTitle>Start a discussion</ThreadFormTitle>
        <FormLabel htmlFor="title">Thread Title</FormLabel>
        {errors.title && <ErrorMessage>This field is required</ErrorMessage>}
        <FormInput
          id="title"
          type="text"
          placeholder="Thread Title"
          {...register('title', { required: true })}
        />

        <FormLabel htmlFor="content">Content</FormLabel>
        {errors.content && <ErrorMessage>This field is required</ErrorMessage>}
        <TextArea
          id="content"
          placeholder="What's on your mind?"
          {...register('content', { required: true })}
        />
        <FormSubmitButton
          primary
          type="submit"
          disabled={isSubmitting}
        >
          { isSubmitting ? <Spin><AiOutlineLoading3Quarters style={{ color: theme.bg, fontSize: '40px' }} /></Spin> : 'Create Thread' }
        </FormSubmitButton>
      </ThreadFormWrapper>
    </div>
  );
}

export default ThreadForm;
