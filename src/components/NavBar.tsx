import React from 'react';
import { Link } from 'react-router-dom';
import { notify } from '../features/notification/Notification';
import { useAppDispatch, useAppSelector } from '../hooks';
import { removeAuthenticatedUser } from '../features/auth/auth.slice';
import NavButton from './NavButton';

function NavBar() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(removeAuthenticatedUser());
    window.localStorage.removeItem('forumAppUser');
    notify('message', 'Successfully logged out. Goodbye!', 4);
  };

  return (
    <nav style={{ margin: '1em' }}>
      <Link to="/">
        <NavButton>Topics</NavButton>
      </Link>
      {!auth.token && (
        <Link to="/login">
          <NavButton>Log In</NavButton>
        </Link>
      )}
      {!auth.token && (
        <Link to="/register">
          <NavButton>Register</NavButton>
        </Link>
      )}
      {auth.token && (
        <span>
          {` ${auth.name} `}
          <NavButton onClick={handleLogOut}>Log Out</NavButton>
        </span>
      )}
    </nav>
  );
}

export default NavBar;