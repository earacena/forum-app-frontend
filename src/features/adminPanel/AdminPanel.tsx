import React, { useEffect, useState } from 'react';
import { Static as RtStatic } from 'runtypes';
import { useAppSelector } from '../../hooks';
import userService from '../../services/userService';
import { UserArray } from '../../types';
import { notify } from '../notification/Notification';

function AdminPanel() {
  const auth = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState<RtStatic<typeof UserArray>>([]);

  const isAuthorizedToAccess = auth.token && auth.role === 'admin';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getAll();
        setUsers(fetchedUsers);
        notify('message', 'Fetched all users.', 4);
      } catch {
        notify('error', 'Error fetching users.', 4);
      }
    };
    if (isAuthorizedToAccess) {
      fetchUsers();
    }
  }, [isAuthorizedToAccess]);

  if (!isAuthorizedToAccess) {
    return <div>Not authorized to view this page.</div>;
  }

  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {`${user.name} (${user.username})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
