import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import FormSubmitButton from '../../components/FormSubmitButton';
import { useAppDispatch, useAppSelector } from '../../hooks';
import postService from '../../services/postService';
import { setPosts } from './posts.slice';
import { notify } from '../notification/Notification';

interface VisibilityProps {
  readonly visible: boolean;
}

const PostEditFormWrapper = styled.form<VisibilityProps>`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea``;

type Input = {
  content: string;
};

interface PostEditFormProps {
  postId: number,
  postContent: string,
  beingEdited: boolean,
  setBeingEdited: React.Dispatch<React.SetStateAction<boolean>>,
}

function PostEditForm({
  postId,
  postContent,
  beingEdited,
  setBeingEdited,
}: PostEditFormProps) {
  const auth = useAppSelector((state) => state.auth);
  const posts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
  } = useForm<Input>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit: SubmitHandler<Input> = async (postData) => {
    try {
      const updatedPost = await postService.update({
        token: auth.token,
        id: postId,
        content: postData.content,
      });
      dispatch(setPosts(posts.map((p) => (p.id === postId ? updatedPost : p))));
      setBeingEdited(false);
      notify('message', 'Edited a post.', 4);
    } catch (error: unknown) {
      notify('error', 'Error while editing a post.', 4);
    }
  };

  return (
    <PostEditFormWrapper visible={beingEdited} onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        id="edited-content"
        {...register('content', { required: true })}
      />
      <FormSubmitButton primary type="submit">Confirm Edit</FormSubmitButton>
    </PostEditFormWrapper>
  );
}

export default PostEditForm;
