import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

/* esse layout deverá ser utilizado em uma rota pai de todas as rotas da aplicação, com exceção da página de Login.
Atenção: Será necessário o uso do componente Outlet da react-router-dom para criar o componente Layout. */
export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
