import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Number as RtNumber } from 'runtypes';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ThreadForm from './ThreadForm';
import { setThreads } from './threadSlice';
import topicService from '../../services/topicService';
import { setCurrentTopic } from '../topic/topicSlice';

const ThreadsTitle = styled.h2`
  text-align: center;
  margin-bottom: 0;
`;

const ThreadsDescription = styled.p`
  margin-top: 0;
  text-align: center;
  font-size: 15px;
  color: #404040;
`;

const ThreadListWrapper = styled.div`
  border: 1px black solid;
  padding: 1em;
  border-radius: 5px;
  margin: 1em;
`;

const ThreadWrapper = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  margin-left: 3em;
  margin-right: 3em;
  padding: 0.5em;
  border-radius: 8px;
  color: black;
  border: 1px black solid;
`;

const ThreadTitle = styled.p`
  margin: 0;
  align-self: center;
  font-size: 120%;
`;

const LeftVerticalLine = styled.span`
  border-left: 1px solid black;
  padding: 0.5em;
`;

function Threads() {
  const dispatch = useAppDispatch();
  const threads = useAppSelector((state) => state.threads);
  const topic = useAppSelector((state) => state.topics.currentTopic);
  const navigate = useNavigate();
  const { id } = useParams();
  const topicId = RtNumber.check(Number(id));

  useEffect(() => {
    const fetchThreads = async () => {
      const fetchedThreads = await topicService.getThreadsOfTopic({
        id: topicId,
      });
      dispatch(setThreads(fetchedThreads));
    };

    fetchThreads();
  }, [dispatch, topicId]);

  useEffect(() => {
    const fetchTopic = async () => {
      const fetchedTopic = await topicService.getTopicById({ id: topicId });
      dispatch(setCurrentTopic(fetchedTopic));
    };

    if (!topic) {
      fetchTopic();
    }
  }, [dispatch, topicId, topic]);

  const openThread = (threadId: number) => {
    navigate(`/thread/${threadId}`);
  };

  return (
    <div>
      <ThreadForm />
      <ThreadListWrapper>
        <ThreadsTitle>{topic?.title}</ThreadsTitle>
        <ThreadsDescription>{topic?.description}</ThreadsDescription>
        {threads.map((thread) => (
          <ThreadWrapper onClick={() => openThread(thread.id)} key={thread.id}>
            <ThreadTitle>{thread.title}</ThreadTitle>
            <LeftVerticalLine>
              {new Date(thread.dateCreated).toDateString()}
            </LeftVerticalLine>
          </ThreadWrapper>
        ))}
      </ThreadListWrapper>
    </div>
  );
}

export default Threads;
