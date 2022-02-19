import React, { useState } from 'react';
import styled from 'styled-components';
import postService from '../../services/postService';
import threadService from '../../services/threadService';
import { notify } from '../notification/Notification';

const ThreadFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px black solid;
  padding: 1em;
  margin: 1em;
`;

const Input = styled.input`
  padding: 1em;
  margin: 1em;
`;

const TextArea = styled.textarea`
  padding: 1em;
  margin: 1em;
  margin-top: 0em;
  resize: none;
  height: 300px;
`;

interface ButtonProps {
  readonly primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
  border-radius: 3px;
  font-size: 1em;
  padding: 1em;
  margin: 1em;
  border: 2px solid black;
  box-shadow: 1px 1px 4px 2px grey;

  &:hover {
    background: ${(props) => ((props.primary) ? 'darkgrey' : 'grey')};
    color: ${(props) => ((props.primary) ? 'black' : 'white')};
  }
`;

function ThreadForm() {
  const [threadTitle, setThreadTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleThreadTitleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => setThreadTitle(target.value);

  const handlePostContentChange = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => setPostContent(target.value);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      // Prepare new thread
      const newThread = {
        title: threadTitle,
      };

      // POST new thread, get id
      const createdThread = await threadService.create(newThread);

      // Prepare new post for thread
      const newPost = {
        content: postContent,
        threadId: createdThread.id,
      };

      // POST new post
      const createdPost = await postService.create(newPost);

      // Update state

      notify('message', 'Thread created.', 4);
    } catch (error: unknown) {
      notify('error', 'Error while creating thread.', 4);
    }
  };

  return (
    <ThreadFormWrapper>
      <Input
        placeholder="Thread Title"
        type="text"
        onChange={handleThreadTitleChange}
        value={threadTitle}
      />
      <TextArea
        placeholder="Tell us more..."
        onChange={handlePostContentChange}
        value={postContent}
      />
      <Button primary type="submit">Create thread</Button>
    </ThreadFormWrapper>
  );
}

export default ThreadForm;
