import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import threadService from '../../services/threadService';
import { Threads as ThreadsType } from '../../types';

const ThreadsTitle = styled.h2`
  text-align: center;
  size: 10px;
`;

const ThreadListWrapper = styled.div`
  padding: 1em;
  border-radius: 0.4em;
  background: linear-gradient(white, gray, gray);
  margin: auto;
`;

const ThreadWrapper = styled.p`
  text-align: left;
  margin-left: 3em;
  margin-right: 3em;
  padding: 1em;
  background: lightgrey;
  border-radius: 0.3em;
  color: black;
  border: 1px lightgrey solid;
  &:hover {
    background: white;
    border: 1px black solid;
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
    <ThreadListWrapper>
      <ThreadsTitle>Threads</ThreadsTitle>
      {threads.map((thread) => (
        <ThreadWrapper key={thread.id}>
          {thread.title}
        </ThreadWrapper>
      ))}
    </ThreadListWrapper>
  );
}

export default Threads;
