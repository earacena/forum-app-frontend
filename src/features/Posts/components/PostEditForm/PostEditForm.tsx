import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled, { ThemeContext } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import postService from '../../../../services/postService';
import { setPosts } from '../../stores/posts.slice';
import { notify } from '../../../Notification';
import { FormSubmitButton, ErrorMessage, Spin } from '../../../../components';

interface VisibilityProps {
  readonly visible: boolean;
}

const PostEditFormWrapper = styled.form<VisibilityProps>`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  resize: none;
  height: 10em;
`;

type Input = {
  content: string;
};

type PostEditFormProps = {
  postId: number,
  postContent: string,
  beingEdited: boolean,
  setBeingEdited: React.Dispatch<React.SetStateAction<boolean>>,
};

function PostEditForm({
  postId,
  postContent,
  beingEdited,
  setBeingEdited,
}: PostEditFormProps) {
  const auth = useAppSelector((state) => state.auth);
  const posts = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const theme = useContext(ThemeContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      content: postContent,
    },
  });

  const onSubmit: SubmitHandler<Input> = async (postData) => {
    try {
      setIsSubmitting(true);
      const updatedPost = await postService.update({
        token: auth.user?.token,
        id: postId,
        content: postData.content,
      });
      dispatch(setPosts({ posts: posts.map((p) => (p.id === postId ? updatedPost : p)) }));
      setBeingEdited(false);
      notify('message', 'Edited a post.', 4);
    } catch (error: unknown) {
      notify('error', 'Error while editing a post.', 4);
      setIsSubmitting(false);
    }
  };

  return (
    <PostEditFormWrapper visible={beingEdited} onSubmit={handleSubmit(onSubmit)}>
      {errors.content && <ErrorMessage>This field is required</ErrorMessage>}
      <TextArea
        id="content"
        {...register('content', { required: true })}
      />
      <FormSubmitButton primary type="submit">
        { isSubmitting ? <Spin><AiOutlineLoading3Quarters style={{ color: theme.bg, fontSize: '40px' }} /></Spin> : 'Confirm Edit' }
      </FormSubmitButton>
    </PostEditFormWrapper>
  );
}

export default PostEditForm;
