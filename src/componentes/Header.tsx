import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../types';
import { Loading } from './Loading';
import { getUser } from '../services/userAPI';

export function Header() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataUser = async () => {
      setLoading(true);
      try {
        const result = await getUser();
        setUser(result);
      } finally {
        setLoading(false);
      }
    };
    dataUser();
  }, []);

  return (
    <header data-testid="header-component">
      <nav>
        <NavLink to="/search" data-testid="link-to-search">search</NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">favorites</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">profile</NavLink>
      </nav>
      { loading ? (<Loading />)
        : (
          <p data-testid="header-user-name">
            { user?.name }
          </p>
        )}
    </header>
  );
}
