import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import threadService from '../../services/threadService';
import { Threads as ThreadsType } from '../../types';

const ThreadsTitle = styled.h2`
  display: flex;
  justify-content: center;
  size: 10px;
`;

const ThreadsWrapper = styled.div`
  padding: 1em;
  border-radius: 0.4em;
  background: linear-gradient(white, lightgrey, lightgrey);
  margin: auto;
`;

const ThreadWrapper = styled.li`
  display: flex;
  justify-content: center;
  margin-left: 3em;
  margin-right: 3em;
  padding: 1em;
  background: darkgrey;
  border-radius: 0.3em;
  color: black;
  border: 2px lightgrey solid;
  &:hover {
    background: white;
    border: 2px black solid;
  }
`;

function Threads() {
  const [threads, setThreads] = useState<ThreadsType>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      const fetchedThreads = await threadService.getAll();
      setThreads(fetchedThreads);
    };

    fetchThreads();
  }, []);

  return (
    <ThreadsWrapper>
      <ThreadsTitle>Threads</ThreadsTitle>
      {threads.map((thread) => (
        <ThreadWrapper key={thread.id}>
          {thread.title}
        </ThreadWrapper>
      ))}
    </ThreadsWrapper>
  );
}

export default Threads;
