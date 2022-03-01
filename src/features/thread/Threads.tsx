import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Number as RtNumber } from 'runtypes';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ThreadForm from './ThreadForm';
import { setThreads } from './threadSlice';
import topicService from '../../services/topicService';
import { setCurrentTopic } from '../topic/topicSlice';
import {
  ThreadListWrapper,
  ThreadsTitle,
  ThreadsDescription,
  ThreadWrapper,
  ThreadTitle,
  LeftVerticalLine,
} from './threads.style';

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
