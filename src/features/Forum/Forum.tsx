import React from 'react';
import { useParams } from 'react-router-dom';
import { Topics } from '../Topics';

function Forum() {
  const forumId = useParams();
  return (
    <div>
      <Topics forumId={Number(forumId)} />
    </div>
  );
}

export default Forum;
