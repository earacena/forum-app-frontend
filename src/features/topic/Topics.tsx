import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Static as RtStatic } from 'runtypes';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import topicService from '../../services/topicService';
import { Topic } from '../../types';
import { setCurrentTopic, setTopics } from './topicSlice';

const TopicListWrapper = styled.ul`
  border: 1px black solid;
`;

const TopicListItem = styled.li`
  cursor: pointer;
  padding: 1em;
  border: 1px black solid;
`;

function Topics() {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topics);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const fetchedTopics = await topicService.getAll();
        dispatch(setTopics(fetchedTopics));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopics();
  }, [dispatch]);

  const handleClick = (topic: RtStatic<typeof Topic>) => {
    dispatch(setCurrentTopic(topic));
    navigate(`/topic/${topic.id}`);
  };

  return (
    <div>
      <TopicListWrapper>
        {topics.topics.map((topic) => (
          <TopicListItem key={topic.id} onClick={() => handleClick(topic)}>
            {`${topic.title} * ${topic.description}`}
          </TopicListItem>
        ))}
      </TopicListWrapper>
    </div>
  );
}

export default Topics;
