import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormInput from '../../components/FormInput';
import FormSubmitButton from '../../components/FormSubmitButton';
import ErrorMessage from '../../components/ErrorMessage';
import { useAppDispatch, useAppSelector } from '../../hooks';
import postService from '../../services/postService';
import threadService from '../../services/threadService';
import { notify } from '../notification/Notification';
import { setThreads } from './thread.slice';
import {
  ThreadFormTitle,
  ThreadFormWrapper,
  TextArea,
  Label,
  CreateButton,
  CloseButton,
  CenteredDiv,
} from './threadForm.style';

type Inputs = {
  title: string;
  content: string;
};

function ThreadForm() {
  const auth = useAppSelector((state) => state.auth);
  const threads = useAppSelector((state) => state.threads.allThreads);
  const currentTopic = useAppSelector((state) => state.topics.currentTopic);
  const dispatch = useAppDispatch();
  const [threadFormVisible, setThreadFormVisible] = useState(false);
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
      // Prepare new thread
      if (!currentTopic) {
        throw new Error('Cannot post in a undefined topic');
      }

      const newThread = {
        token: auth.token,
        title: threadData.title,
        topicId: currentTopic.id,
      };

      // POST new thread, get id
      const createdThread = await threadService.create(newThread);
      dispatch(setThreads(threads.concat(createdThread)));

      // Prepare new post for thread
      const newPost = {
        token: auth.token,
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
    } catch (error: unknown) {
      notify('error', 'Error while creating thread.', 4);
    }
  };

  return (
    <div>
      {auth.token && (
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
          visible={threadFormVisible}
          onClick={() => setThreadFormVisible(!threadFormVisible)}
        >
          Cancel
        </CloseButton>
        <ThreadFormTitle>Start a discussion</ThreadFormTitle>
        <Label htmlFor="title">Thread Title</Label>
        {errors.title && <ErrorMessage>This field is required</ErrorMessage>}
        <FormInput
          id="title"
          type="text"
          placeholder="Thread Title"
          {...register('title', { required: true })}
        />

        <Label htmlFor="content">Content</Label>
        {errors.content && <ErrorMessage>This field is required</ErrorMessage>}
        <TextArea
          id="content"
          placeholder="What's on your mind?"
          {...register('content', { required: true })}
        />
        <FormSubmitButton type="submit">Create Thread</FormSubmitButton>
      </ThreadFormWrapper>
    </div>
  );
}

export default ThreadForm;
