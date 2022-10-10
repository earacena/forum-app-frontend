import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled, { ThemeContext } from 'styled-components';
import { HiUser } from 'react-icons/hi';
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
import { FormSubmitButton, ErrorMessage, FormLabel } from '../../../../components';
import { ProfileCard, UserAvatar, UserName } from '../../Post';

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
  const theme = useContext(ThemeContext);

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
    // Prevent submission happening while form is closed
    if (!postFormVisible) {
      return;
    }

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
    <ComponentWrapper>
      {auth.token && (
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
        visible={auth.token ? postFormVisible : false}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ProfileCard>
          <UserAvatar>
            <HiUser size={50} color={theme.fg} />
          </UserAvatar>
          <UserName>
            {`${auth.name}`}
          </UserName>
        </ProfileCard>
        <hr style={{ height: '100%' }} />
        <InputWrapper style={{
          flex: 1, marginLeft: '10px', color: theme.fg, height: '100%',
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
          <FormSubmitButton primary>Post</FormSubmitButton>
          <CloseFormButton
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
