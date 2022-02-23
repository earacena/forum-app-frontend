import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import postService from '../../services/postService';
import threadService from '../../services/threadService';
import { setPosts } from './postsSlice';
import { notify } from '../notification/Notification';

interface VisibilityProps {
  readonly visible: boolean;
}

const PostFormWrapper = styled.form<VisibilityProps>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  border: 1px red solid;
  border-radius: 10px;
  padding: 1em;
  width: 500px;
  margin: 0 auto;
  margin-top: 1em;
`;

const TextArea = styled.textarea`
  resize: none;
  border: 1px black solid;
  padding: 1em;
  height: 150px;
`;

const PostButton = styled.button`
  cursor: pointer;
  font-size: 15px;
  background: black;
  color: lightgrey;
  border: none;
  padding: 1em;
  margin: auto;
  margin-top: 1em;
  border-radius: 30px;
`;

const AddPostButton = styled.button<VisibilityProps>`
  display: ${(props) => (props.visible ? '' : 'none')};
  cursor: pointer;
  font-size: 15px;
  background: black;
  color: lightgrey;
  border: none;
  padding: 1em;
  margin: auto;
  margin-top: 1em;
  border-radius: 30px;

`;

const CloseFormButton = styled.button<VisibilityProps>`
  display: ${(props) => (props.visible ? '' : 'none')};
  cursor: pointer;
  font-size: 15px;
  background: black;
  color: lightgrey;
  border: none;
  padding: 1em;
  margin: auto;
  margin-top: 1em;
  border-radius: 30px;
`;

const Label = styled.label`
  padding: 1em;
`;

const CenteredDiv = styled.div`
  text-align: center;
`;

const ErrorMessage = styled.span`
  color: red;
`;

type Input = {
  content: string,
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
        threadId,
      };

      await postService.create(newPost);
      const updatedPosts = await threadService.getPostsOfThread({ id: threadId });
      dispatch(setPosts(updatedPosts));
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

      <PostFormWrapper visible={postFormVisible} onSubmit={handleSubmit(onSubmit)}>
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
