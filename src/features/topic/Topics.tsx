import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Static as RtStatic } from 'runtypes';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ThemeContext } from 'styled-components';
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
import { Spin } from '../../components';

function Topics() {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topics.allTopics);
  const theme = useContext(ThemeContext);
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
      {topics === undefined && <Spin><AiOutlineLoading3Quarters style={{ color: theme.fg, fontSize: '40px' }} /></Spin>}
      {topics?.length === 0 && <span>There are no topics for discussion.</span>}
      <TopicListWrapper>
        {topics?.map((topic) => (
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
      <TopicForm />
    </TopicsWrapper>
  );
}

export default Topics;
