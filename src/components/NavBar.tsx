import React, { Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { BsMoonStars, BsSunFill } from 'react-icons/bs';
import styled from 'styled-components';
import { notify } from '../features/notification/Notification';
import { useAppDispatch, useAppSelector } from '../hooks';
import { removeAuthenticatedUser } from '../features/auth/auth.slice';
import NavButton from './NavButton';
import ThemeSwitcher from './ThemeSwitcher';

type NavBarProps = {
  themeMode: string;
  setThemeMode: Dispatch<string>;
};

const NavBarWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 100%;
  max-width: 800px;
`;

const Spacer = styled.span`
  flex: 1;
`;

const UserName = styled.span`
  color: ${(props) => props.theme.fg}
`;

const UserActions = styled.span`
  display: 'flex',
  flex-direction: 'row',
  align-items: 'center',
  justify-content: 'center',
`;

function NavBar({ themeMode, setThemeMode }: NavBarProps) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(removeAuthenticatedUser());
    window.localStorage.removeItem('forumAppUser');
    notify('message', 'Successfully logged out. Goodbye!', 4);
  };

  return (
    <NavBarWrapper>
      {auth.token && auth.role === 'admin' && (
        <Link to="/admin">
          <NavButton>Admin Panel</NavButton>
        </Link>
      )}
      <Link to="/">
        <NavButton>Topics</NavButton>
      </Link>
      <ThemeSwitcher
        onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
      >
        {themeMode === 'light' ? (
          <BsMoonStars style={{ margin: 0 }} />
        ) : (
          <BsSunFill style={{ margin: 0 }} />
        )}
      </ThemeSwitcher>
      <Spacer />
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
        <UserActions>
          <UserName>{` ${auth.name} `}</UserName>
          <NavButton onClick={handleLogOut}>Log Out</NavButton>
        </UserActions>
      )}
    </NavBarWrapper>
  );
}

export default NavBar;
