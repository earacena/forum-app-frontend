import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import postService from '../../services/postService';
import threadService from '../../services/threadService';
import { setPosts } from './posts.slice';
import { notify } from '../notification/Notification';
import {
  CenteredDiv,
  AddPostButton,
  CloseFormButton,
  PostFormWrapper,
  Label,
  ErrorMessage,
  TextArea,
  PostButton,
} from './postForm.style';

type Input = {
  content: string;
};

interface PostFormProps {
  threadId: number | undefined;
}

function PostForm({ threadId }: PostFormProps) {
  const [postFormVisible, setPostFormVisible] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit: SubmitHandler<Input> = async (postData) => {
    try {
      if (!threadId) {
        throw new Error('Cannot reply to this thread');
      }

      const newPost = {
        token: auth.token,
        content: postData.content,
        isOriginalPost: false,
        threadId,
      };

      await postService.create(newPost);
      const updatedPosts = await threadService.getPostsOfThread({
        id: threadId,
      });
      dispatch(setPosts(updatedPosts));
      reset({
        content: '',
      });
      setPostFormVisible(!postFormVisible);
      notify('message', 'Replied to thread', 4);
    } catch (error: unknown) {
      notify('error', 'Error while replying to thread.', 4);
    }
  };

  return (
    <div>
      {auth.token && (
        <CenteredDiv>
          <AddPostButton
            visible={!postFormVisible}
            onClick={() => setPostFormVisible(!postFormVisible)}
          >
            Reply
          </AddPostButton>
          <CloseFormButton
            visible={postFormVisible}
            onClick={() => setPostFormVisible(!postFormVisible)}
          >
            Close
          </CloseFormButton>
        </CenteredDiv>
      )}

      <PostFormWrapper
        visible={auth.token ? postFormVisible : false}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor="post-content">Post body</Label>
        {errors.content && <ErrorMessage>This field is required</ErrorMessage>}
        <TextArea
          id="content"
          placeholder="What would you like to say?"
          {...register('content', { required: true })}
        />
        <PostButton>Post</PostButton>
      </PostFormWrapper>
    </div>
  );
}

export default PostForm;
