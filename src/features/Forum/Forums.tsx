import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import forumService from '../../services/forumService';
import { Forums as ForumArray } from '../../types';
import {
  ForumsWrapper,
  ForumHeader2,
  ForumList,
  ForumListItem,
} from './styles/forums.styles';

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
