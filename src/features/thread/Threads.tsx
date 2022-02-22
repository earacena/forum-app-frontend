import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import threadService from '../../services/threadService';
import ThreadForm from './ThreadForm';
import { setThreads } from './threadSlice';

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
  cursor: pointer;
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
  const dispatch = useAppDispatch();
  const threads = useAppSelector((state) => state.threads);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThreads = async () => {
      const fetchedThreads = await threadService.getAll();
      dispatch(setThreads(fetchedThreads));
    };

    fetchThreads();
  }, [dispatch]);

  const openThread = (id: number) => {
    navigate(`/thread/${id}`);
  };

  return (
    <div>
      <ThreadForm />
      <ThreadListWrapper>
        <ThreadsTitle>Threads</ThreadsTitle>
        {threads.map((thread) => (
          <ThreadWrapper
            onClick={() => openThread(thread.id)}
            key={thread.id}
          >
            {thread.title}
          </ThreadWrapper>
        ))}
      </ThreadListWrapper>
    </div>
  );
}

export default Threads;
