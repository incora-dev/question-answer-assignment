import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@store/login';

import './styles.scss';

const LoginPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginUser = useCallback(() => {
    dispatch(login({ username, password }));
  }, [username, password, dispatch]);

  return (
    <>
      <div className="login-box">
        <label title="Username">
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label title="Password">
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button onClick={loginUser}>Login</button>
      </div>
    </>
  );
};

export default LoginPage;
