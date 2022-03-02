import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Static as RtStatic } from 'runtypes';
import { useAppDispatch, useAppSelector } from '../../hooks';
import topicService from '../../services/topicService';
import { Topic } from '../../types';
import { setCurrentTopic, setTopics } from './topic.slice';
import {
  TopicListWrapper,
  TopicListItem,
  TopicTitle,
  LeftVerticalLine,
} from './topics.style';

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
            <TopicTitle>
              {topic.title}
            </TopicTitle>
            <LeftVerticalLine>
              {topic.description}
            </LeftVerticalLine>
          </TopicListItem>
        ))}
      </TopicListWrapper>
    </div>
  );
}

export default Topics;
