import React from 'react';
import { useParams } from 'react-router-dom';
import { Number as RtNumber } from 'runtypes';
import { Topics } from '../Topics';

function Forum() {
  const { id } = useParams();
  const forumId = RtNumber.check(Number(id));

  return (
    <Topics forumId={forumId} />
  );
}

export default Forum;
