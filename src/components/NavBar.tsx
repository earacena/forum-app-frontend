import React, { Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { BsMoonStars, BsSunFill } from 'react-icons/bs';
import { notify } from '../features/notification/Notification';
import { useAppDispatch, useAppSelector } from '../hooks';
import { removeAuthenticatedUser } from '../features/auth/auth.slice';
import NavButton from './NavButton';
import ThemeSwitcher from './ThemeSwitcher';

type NavBarProps = {
  themeMode: string,
  setThemeMode: Dispatch<string>,
};

function NavBar({ themeMode, setThemeMode }: NavBarProps) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(removeAuthenticatedUser());
    window.localStorage.removeItem('forumAppUser');
    notify('message', 'Successfully logged out. Goodbye!', 4);
  };

  return (
    <nav style={{ margin: '1em' }}>
      {auth.token && auth.role === 'admin' && (
        <Link to="/admin">
          <NavButton>Admin Panel</NavButton>
        </Link>
      )}
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
      <ThemeSwitcher onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}>
        {themeMode === 'light' ? <BsMoonStars /> : <BsSunFill />}
      </ThemeSwitcher>
    </nav>
  );
}

export default NavBar;
