import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Number as RtNumber } from 'runtypes';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ThreadForm from './ThreadForm';
import { setThreads } from './threadSlice';
import topicService from '../../services/topicService';

const ThreadsTitle = styled.h2`
  text-align: center;
  size: 10px;
`;

const ThreadsDescription = styled.h3`
  text-align: center;
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
  // const topic = useAppSelector((state) => state.topic);
  const navigate = useNavigate();
  const { id } = useParams();
  const topicId = RtNumber.check(Number(id));

  useEffect(() => {
    const fetchThreads = async () => {
      const fetchedThreads = await topicService.getThreadsOfTopic({ id: topicId });
      dispatch(setThreads(fetchedThreads));
    };

    fetchThreads();
  }, [dispatch, topicId]);

  const openThread = (threadId: number) => {
    navigate(`/thread/${threadId}`);
  };

  return (
    <div>
      <ThreadForm />
      <ThreadListWrapper>
        {threads.map((thread) => (
          <ThreadWrapper
            onClick={() => openThread(thread.id)}
            key={thread.id}
          >
            {thread.title}
            <span style={{ display: 'block', textAlign: 'right' }}>{new Date(thread.dateCreated).toDateString()}</span>
          </ThreadWrapper>
        ))}
      </ThreadListWrapper>
    </div>
  );
}

export default Threads;
