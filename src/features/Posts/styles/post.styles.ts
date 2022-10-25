import styled from 'styled-components';
import type { ThemeProps } from '../../../App';

interface PostWrapperProps {
  readonly threadAuthor: boolean;
  readonly author: boolean;
  readonly theme: ThemeProps;
}

export const PostWrapper = styled.div<PostWrapperProps>`
  display: flex;
  border: ${(props) => (props.author ? `2px solid ${props.theme.colorAccent}` : '')};
  border-radius: 8px;
  padding: 1em;
  background: ${(props) => props.theme.post.bg};
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.3);
  margin-top: 5px;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  padding: 0.4em;
  margin: 0;
  margin-left: 1em;
  color: lightgrey;
  background: black;
  border: none;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
    background: darkred;
    color: pink;
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.17);
    transform: translateY(2px);
  }
`;

export const EditButton = styled.button`
  cursor: pointer;
  border-radius: 15px;
  padding: 0.4em;
  margin: 0;
  margin-left: 1em;
  color: lightgrey;
  background: black;
  border: none;
  box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.4);
    color: white;
  }

  &:active {
    box-shadow: 0px 3px 10px rgb(0, 0, 0, 0.17);
    transform: translateY(2px);
  }
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  margin: 1em;
  margin-top: 0;
  color: ${(props) => props.theme.fg};
`;

export const UserAvatar = styled.span`
  border: 2px solid ${(props) => props.theme.fg};
  border-radius: 50%;
  padding: 10px;
  overflow: hidden;
  margin: 10px;
`;

export const UserName = styled.span`
  font-size: 20px;
  color: ${(props) => props.theme.fg};
`;

export const AuthorStatus = styled.span`
  color: ${(props) => props.theme.colorAccent};
  font-weight: 300;
`;

export const PostDate = styled.span`
  display: flex;
  justify-content: flex-end;
  color: gray;
  font-weight: 300;
`;
