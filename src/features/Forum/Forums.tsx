import React, { useState, useEffect } from 'react';
import forumService from '../../services/forumService';
import { Forums as ForumArray } from '../../types';

function Forums() {
  const [forums, setForums] = useState<ForumArray>([]);

  useEffect(() => {
    const fetchForums = async () => {
      const fetchedForums = await forumService.getAll();
      setForums(fetchedForums);
    };

    fetchForums();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2 style={{ fontSize: '40px' }}>Explore</h2>
      <ul>
        {forums.map((f) => <li key={f.id}>{f.title}</li>)}
      </ul>
    </div>
  );
}

export default Forums;
