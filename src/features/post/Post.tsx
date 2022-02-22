import React, { useEffect, useState } from 'react';
import { Static } from 'runtypes';
import styled from 'styled-components';
import { Post as PostType, User } from '../../types';
import userService from '../../services/userService';

const PostWrapper = styled.div`
  border: 1px red solid;
  border-radius: 8px;
  padding: 1em;
`;

interface PostProps {
  post: Static<typeof PostType>;
  isAuthor: boolean;
}

function Post({ post, isAuthor }: PostProps) {
  const [user, setUser] = useState<Static<typeof User>>();
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await userService.getUserById({ id: post.userId });
      setUser(fetchedUser);
    };

    fetchUser();
  }, [post.userId]);

  return (
    <PostWrapper>
      {`${user?.username} ${isAuthor ? '[Author]' : ''} on ${new Date(post.datePosted).toDateString()}`}
      <hr />
      {post.content}
    </PostWrapper>
  );
}

export default Post;
