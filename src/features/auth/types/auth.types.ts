import { UserAuthentication } from '../../../types';

export type UserState = {
  user: UserAuthentication | null,
};

export type AuthenticatedUserPayload = {
  user: UserAuthentication,
};
