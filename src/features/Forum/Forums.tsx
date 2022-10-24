import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import forumService from '../../services/forumService';
import { Forums as ForumArray } from '../../types';

const ForumsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 8px;
  margin: 1em;
  min-width: 300px;
  width: 100%;
  max-width: 800px;
`;

const ForumHeader2 = styled.h2`
  font-size: 40px;
  color: ${(props) => props.theme.fg};
`;

const ForumListItem = styled.li`
  cursor: pointer;
  border-radius: 8px;
  background: ${(props) => props.theme.topic.bg};
  color: ${(props) => props.theme.fg};
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.17);
  margin: 0.4em;
  border: 1px solid transparent;
  padding: 12px;

  &:hover {
    border: 1px solid ${(props) => props.theme.colorAccent};
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.3);
  }
  
  &:active {
    box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
    transform: translateY(1px);
  }

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ForumList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style-type: none;
  padding: 0;
`;

function Forums() {
  const navigate = useNavigate();
  const [forums, setForums] = useState<ForumArray>([]);
  useEffect(() => {
    const fetchForums = async () => {
      const fetchedForums = await forumService.getAll();
      setForums(fetchedForums);
    };

    fetchForums();
  }, []);

  const handleClick = (id: number) => {
    navigate(`/forum/${id}`);
  };

  return (
    <ForumsWrapper>
      <ForumHeader2>Explore</ForumHeader2>
      <ForumList>
        {forums.map((f) => (
          <ForumListItem onClick={() => handleClick(f.id)} key={f.id}>{f.title}</ForumListItem>
        ))}
      </ForumList>
    </ForumsWrapper>
  );
}

export default Forums;
