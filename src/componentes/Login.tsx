import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import { Loading } from './Loading';

function Login() {
  const [loginName, setloginName] = useState('');
  const [loading, setLoading] = useState(false);
  const isLoginValide = loginName.length >= 3;
  const navigate = useNavigate();
  // ------------------------------------------------------------------------------------------------------------------------------------
  // Função chamada quando o botão "Entrar" é clicado
  // Ao clicar no botão habilitado, a função createUser da userAPI é chamada.
  async function clickEntrar() {
    setLoading(true); // Ativa o estado de loading para exibir o componente Loading
    try {
      await createUser({ name: loginName });
      setLoading(false); // Desativa o estado de loading após a criação do usuário.
      navigate('/search');
    } catch (error) {
      console.error('Error ao criar usuário', error);
      setLoading(false);
    }
  }

  return (
    <div>
      { loading ? (<Loading />)
        : (
          <section>
            <input
              type="text"
              placeholder="Insira o nome de Login"
              data-testid="login-name-input"
              value={ loginName }
              onChange={ (e) => setloginName(e.target.value) }
            />
            <button
              type="button"
              disabled={ !isLoginValide }
              data-testid="login-submit-button"
              onClick={ clickEntrar }
            >
              Entrar
            </button>
          </section>
        )}
    </div>
  );
}
export default Login;
