import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ThemeContext } from 'styled-components';
import forumService from '../../services/forumService';
import {
  ForumsWrapper,
  ForumHeader2,
  ForumList,
  ForumListItem,
} from './styles/forums.styles';
import {
  Spin,
} from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setForums } from './stores/forums.slice';

function Forums() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const forums = useAppSelector((state) => state.forums.allForums);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const fetchForums = async () => {
      const fetchedForums = await forumService.getAll();
      dispatch(setForums({ forums: fetchedForums }));
    };

    fetchForums();
  }, [dispatch]);

  const handleClick = (id: number) => {
    navigate(`/forum/${id}`);
  };

  return (
    <ForumsWrapper>
      <ForumHeader2>Explore</ForumHeader2>
      {forums === undefined && <Spin><AiOutlineLoading3Quarters style={{ color: theme.fg, fontSize: '40px' }} /></Spin>}
      {forums?.length === 0 && <span>There are no forums created yet.</span>}
      <ForumList>
        {forums?.map((f) => (
          <ForumListItem onClick={() => handleClick(f.id)} key={f.id}>{f.title}</ForumListItem>
        ))}
      </ForumList>
    </ForumsWrapper>
  );
}

export default Forums;
