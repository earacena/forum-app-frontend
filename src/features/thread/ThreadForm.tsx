import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import postService from '../../services/postService';
import threadService from '../../services/threadService';
import { notify } from '../notification/Notification';
import { setThreads } from './threadSlice';
import {
  ThreadFormTitle,
  ThreadFormWrapper,
  Input,
  Button,
  TextArea,
  Label,
  ErrorMessage,
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
  const threads = useAppSelector((state) => state.threads);
  const dispatch = useAppDispatch();
  const [threadFormVisible, setThreadFormVisible] = useState(false);
  const {
    register,
    handleSubmit,
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
      const newThread = {
        token: auth.token,
        title: threadData.title,
      };

      // POST new thread, get id
      const createdThread = await threadService.create(newThread);
      dispatch(setThreads(threads.concat(createdThread)));

      // Prepare new post for thread
      const newPost = {
        token: auth.token,
        content: threadData.content,
        threadId: createdThread.id,
      };

      // POST new post
      await postService.create(newPost);

      notify('message', 'Thread created.', 4);
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
          <CloseButton
            visible={threadFormVisible}
            onClick={() => setThreadFormVisible(!threadFormVisible)}
          >
            Close
          </CloseButton>
        </CenteredDiv>
      )}

      <ThreadFormWrapper visible={threadFormVisible} onSubmit={handleSubmit(onSubmit)}>
        <ThreadFormTitle>Start a discussion</ThreadFormTitle>
        <Label htmlFor="title">Thread Title</Label>
        {errors.title && <ErrorMessage>This field is required</ErrorMessage>}
        <Input
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
        <Button type="submit">Create Thread</Button>
      </ThreadFormWrapper>
    </div>
  );
}

export default ThreadForm;
