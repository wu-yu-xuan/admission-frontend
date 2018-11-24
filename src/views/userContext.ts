import * as React from 'react';

export enum Identity {
  student,
  office,
  college,
  unknown
}

export interface User {
  isLogin: boolean;
  name: string;
  identity: Identity;
  reload(): void;
}

export default React.createContext<User>(null);