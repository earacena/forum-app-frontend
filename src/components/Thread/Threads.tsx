import React, { useEffect, useState } from 'react';
import threadService from '../../services/threadService';
import { Threads as ThreadsType } from '../../types';

function Threads() {
  const [threads, setThreads] = useState<ThreadsType>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      const fetchedThreads = await threadService.getAll();
      setThreads(fetchedThreads);
    };

    fetchThreads();
  }, []);

  return (
    <div>
      <h3>Threads</h3>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>{thread.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Threads;
