import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ThemeContext } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import topicService from '../../services/topicService';
import { Topic } from '../../types';
import { setCurrentTopic, setTopics } from './stores/topic.slice';
import TopicForm from './components/TopicForm';
import {
  TopicsWrapper,
  TopicListWrapper,
  TopicListItem,
  TopicTitle,
  LeftVerticalLine,
} from './styles/topics.style';
import { Spin } from '../../components';

type TopicsProps = {
  forumId: number;
};

function Topics({ forumId }: TopicsProps) {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topics.allTopics);
  const { fg } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const fetchedTopics = await topicService.getTopicsOfForum({ forumId });
        dispatch(setTopics({ topics: fetchedTopics }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopics();
  }, [dispatch, forumId]);

  const handleClick = (topic: Topic) => {
    dispatch(setCurrentTopic({ topic }));
    navigate(`/topic/${topic.id}`);
  };

  return (
    <TopicsWrapper>
      {topics === null && <Spin><AiOutlineLoading3Quarters style={{ color: fg, fontSize: '40px' }} /></Spin>}
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
