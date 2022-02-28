import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Static as RtStatic } from 'runtypes';
import styled from 'styled-components';
import topicService from '../../services/topicService';
import { TopicArray } from '../../types';

const TopicListWrapper = styled.ul`
  border: 1px black solid;
`;

const TopicListItem = styled.li`
  cursor: pointer;
  padding: 1em;
  border: 1px black solid;
`;

function Topics() {
  const [topics, setTopics] = useState<RtStatic<typeof TopicArray>>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const fetchedTopics = await topicService.getAll();
        setTopics(fetchedTopics);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div>
      <TopicListWrapper>
        {topics.map((topic) => (
          <TopicListItem key={topic.id} onClick={() => navigate(`/topic/${topic.id}`)}>
            {`${topic.title} * ${topic.description}`}
          </TopicListItem>
        ))}
      </TopicListWrapper>
    </div>
  );
}

export default Topics;
