import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled, { ThemeContext } from 'styled-components';
import { HiUser } from 'react-icons/hi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import postService from '../../../../services/postService';
import threadService from '../../../../services/threadService';
import { setPosts } from '../../stores/posts.slice';
import { notify } from '../../../Notification';
import {
  CenteredDiv,
  AddPostButton,
  CloseFormButton,
  PostFormWrapper,
  TextArea,
} from './styles/postForm.style';
import {
  FormSubmitButton,
  ErrorMessage,
  FormLabel,
  Spin,
} from '../../../../components';
import { ProfileCard, UserAvatar, UserName } from '../../styles/post.styles';

type Input = {
  content: string;
};

interface PostFormProps {
  threadId: number | undefined;
}

const ComponentWrapper = styled.div`
  display: flex;
`;

const InputWrapper = styled.span`
  display: flex;
  flex-direction: column;
`;

function PostForm({ threadId }: PostFormProps) {
  const [postFormVisible, setPostFormVisible] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { fg, bg } = useContext(ThemeContext);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
      setIsSubmitting(true);
      if (!threadId) {
        throw new Error('Cannot reply to this thread');
      }

      const newPost = {
        token: auth.user?.token,
        content: postData.content,
        isOriginalPost: false,
        threadId,
      };

      await postService.create(newPost);
      const updatedPosts = await threadService.getPostsOfThread({
        id: threadId,
      });
      dispatch(setPosts({ posts: updatedPosts }));
      reset({
        content: '',
      });
      setPostFormVisible(!postFormVisible);
      notify('message', 'Replied to thread', 4);
    } catch (error: unknown) {
      notify('error', 'Error while replying to thread.', 4);
      setIsSubmitting(false);
    }
  };

  return (
    <ComponentWrapper>
      {auth.user?.token && (
        <CenteredDiv>
          <AddPostButton
            visible={!postFormVisible}
            onClick={() => setPostFormVisible(!postFormVisible)}
          >
            Reply
          </AddPostButton>
        </CenteredDiv>
      )}

      <PostFormWrapper
        visible={auth.user?.token ? postFormVisible : false}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ProfileCard>
          <UserAvatar>
            <HiUser size={50} color={fg} />
          </UserAvatar>
          <UserName>
            {`${auth.user?.name}`}
          </UserName>
        </ProfileCard>
        <hr style={{ height: '100%' }} />
        <InputWrapper style={{
          flex: 1, marginLeft: '10px', color: fg, height: '100%',
        }}
        >
          <FormLabel htmlFor="post-content" style={{ borderLeft: '1px', margin: 0 }}>Post body</FormLabel>
          {errors.content && <ErrorMessage>This field is required</ErrorMessage>}
          <TextArea
            id="content"
            placeholder="What would you like to say?"
            {...register('content', { required: true })}
          />
        </InputWrapper>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}
        >
          <FormSubmitButton
            primary
            type="submit"
            disabled={isSubmitting}
          >
            { isSubmitting ? <Spin><AiOutlineLoading3Quarters style={{ color: bg, fontSize: '40px' }} /></Spin> : 'Post' }
          </FormSubmitButton>
          <CloseFormButton
            type="button"
            visible={postFormVisible}
            onClick={() => setPostFormVisible(!postFormVisible)}
          >
            Cancel
          </CloseFormButton>

        </div>
      </PostFormWrapper>
    </ComponentWrapper>
  );
}

export default PostForm;
