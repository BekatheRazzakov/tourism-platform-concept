import React from 'react';
import { User } from '@/type';
import NavLink from 'next/link';
import { userRoles } from '@/constants';

interface IProps {
  user: User;
  onClick: () => void;
  pathname: string;
}

const UserMenu: React.FC<IProps> = ({ user, onClick, pathname }) => {
  return (
    <>
      <NavLink
        href="/profile"
        className={`nav-link profile-link ${
          pathname === '/profile' ? 'active' : ''
        }`}
        onClick={onClick}
      >
        My profile
      </NavLink>
      {user && user.role === userRoles.admin && (
        <NavLink
          href="/tours/create"
          className={`nav-link profile-link ${
            pathname === '/tours/create' ? 'active' : ''
          }`}
          onClick={onClick}
        >
          Create Tour
        </NavLink>
      )}
    </>
  );
};

export default UserMenu;
