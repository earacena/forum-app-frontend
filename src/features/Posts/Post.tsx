import React, { useContext, useState } from 'react';
import { Static } from 'runtypes';
import { ThemeContext } from 'styled-components';
import { HiUser } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../../hooks';
import postService from '../../services/postService';
import { Post as PostType } from '../../types';
import { notify } from '../Notification';
import { setPosts } from './stores/posts.slice';
import PostEditForm from './components/PostEditForm/PostEditForm';
import {
  PostWrapper,
  PostContent,
  PostDate,
  ProfileCard,
  UserAvatar,
  UserName,
  AuthorStatus,
  DeleteButton,
  EditButton,
} from './styles/post.styles';

interface PostProps {
  post: Static<typeof PostType>;
  isThreadAuthor: boolean;
  isAuthor: boolean;
}

function Post({ post, isThreadAuthor, isAuthor }: PostProps) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const auth = useAppSelector((state) => state.auth);
  const theme = useContext(ThemeContext);

  const [beingEdited, setBeingEdited] = useState(false);

  const handleDelete = async () => {
    try {
      await postService.remove({ id: post.id, token: auth.token });
      dispatch(setPosts(posts.filter((p) => p.id !== post.id)));
      notify('message', 'Deleted a post', 4);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostWrapper threadAuthor={isThreadAuthor} author={isAuthor} theme={theme}>
      <ProfileCard>
        <UserAvatar>
          <HiUser size={50} color={theme.fg} />
        </UserAvatar>
        <UserName>
          {`${post?.authorName}`}
        </UserName>
        <br />
        <AuthorStatus>
          {`${isThreadAuthor ? 'Author' : ''}`}
        </AuthorStatus>
        { isAuthor
          && !post.isOriginalPost
          && (
            <span>
              <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
              <EditButton onClick={() => setBeingEdited(!beingEdited)}>Edit</EditButton>
            </span>
          )}
      </ProfileCard>
      <hr />
      <PostContent>
        <PostDate>
          {new Date(post.datePosted).toDateString()}
        </PostDate>
        {!beingEdited && post.content}
      </PostContent>
      {beingEdited && (
        <PostEditForm
          postId={post.id}
          postContent={post.content}
          beingEdited={beingEdited}
          setBeingEdited={setBeingEdited}
        />
      )}
    </PostWrapper>
  );
}

export default Post;
