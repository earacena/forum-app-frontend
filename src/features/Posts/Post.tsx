import React, { useContext, useState } from 'react';
import { Static } from 'runtypes';
import styled, { ThemeContext } from 'styled-components';
import { HiUser } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../../hooks';
import postService from '../../services/postService';
import { Post as PostType } from '../../types';
import { notify } from '../Notification';
import { setPosts } from './stores/posts.slice';
import PostEditForm from './components/PostEditForm/PostEditForm';
import type { ThemeProps } from '../../App';

interface PostWrapperProps {
  readonly threadAuthor: boolean;
  readonly author: boolean;
  readonly theme: ThemeProps;
}

const PostWrapper = styled.div<PostWrapperProps>`
  display: flex;
  border: ${(props) => (props.author ? `2px solid ${props.theme.colorAccent}` : '')};
  border-radius: 8px;
  padding: 1em;
  background: ${(props) => props.theme.post.bg};
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
  margin-top: 5px;
`;

const DeleteButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  padding: 0.4em;
  margin: 0;
  margin-left: 1em;
  color: lightgrey;
  background: black;
  border: none;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
    background: darkred;
    color: pink;
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.17);
    transform: translateY(2px);
  }
`;

const EditButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  padding: 0.4em;
  margin: 0;
  margin-left: 1em;
  color: lightgrey;
  background: black;
  border: none;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
    color: white;
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.17);
    transform: translateY(2px);
  }
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  margin: 1em;
  margin-top: 0;
  color: ${(props) => props.theme.fg};
`;

export const UserAvatar = styled.span`
  border: 2px solid ${(props) => props.theme.fg};
  border-radius: 50%;
  padding: 10px;
  overflow: hidden;
  margin: 10px;
`;

export const UserName = styled.span`
  font-size: 20px;
  color: ${(props) => props.theme.fg};
`;

const AuthorStatus = styled.span`
  color: ${(props) => props.theme.colorAccent};
  font-weight: 300;
`;

const PostDate = styled.span`
  display: flex;
  justify-content: flex-end;
  color: gray;
  font-weight: 300;
`;

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
