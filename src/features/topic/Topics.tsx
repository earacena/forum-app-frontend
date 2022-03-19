import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Static as RtStatic } from 'runtypes';
import { useAppDispatch, useAppSelector } from '../../hooks';
import topicService from '../../services/topicService';
import { Topic } from '../../types';
import { setCurrentTopic, setTopics } from './topic.slice';
import TopicForm from './TopicForm';
import {
  TopicsWrapper,
  TopicListWrapper,
  TopicListItem,
  TopicTitle,
  LeftVerticalLine,
} from './topics.style';

function Topics() {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topics.allTopics);
  const auth = useAppSelector((state) => state.auth);
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
    <TopicsWrapper>
      <TopicForm />
      <TopicListWrapper>
        {topics.map((topic) => (
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
    </TopicsWrapper>
  );
}

export default Topics;
