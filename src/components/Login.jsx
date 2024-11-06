import React, { useState } from 'react';
import styles from './Login.module.css';
import Inicio from './Inicio';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Inicio />;
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <form onSubmit={handleLogin}>
          <h1 className={styles.h1}>Log in - GUIDE-UPC</h1>
          <div className={styles.inputbox}>
            
            <input type="email" required />
            <label className={styles.label}>Usuario</label>
          </div>
          <div className={styles.inputbox}>
            
            <input type="password" required />
            <label className={styles.label}>Contraseña</label>
          </div>
          <div className={styles.forget}>
            <label>
              <input type="checkbox" /> Recordar
            </label>
            <a href="#">Olvidé mi contraseña</a>
          </div>
          <button type="submit" className={styles.button}>Login</button>
          <div className={styles.register}>
            <p>
              No tengo cuenta <a href="#">Registrar</a>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
