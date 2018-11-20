import * as React from 'react';

export enum Identity {
  student,
  admissionOffice,
  collegeAdmisson,
  unknown
}

export interface User {
  isLogin: boolean;
  name: string;
  identity: Identity;
  reload(): void;
}

export default React.createContext<User>(null);