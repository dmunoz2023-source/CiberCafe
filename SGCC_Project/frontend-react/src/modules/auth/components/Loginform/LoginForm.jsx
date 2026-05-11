import { useState } from 'react';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Si la cuenta está bloqueada, no hacemos nada
    if (isLocked) return;

    // AQUI IRÁ LA CONEXIÓN CON TU BACKEND (API)
    // Simularemos que las credenciales son incorrectas para probar el bloqueo
    const isLoginSuccessful = false; 

    if (!isLoginSuccessful) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsLocked(true);
        setErrorMsg('Cuenta bloqueada tras 3 intentos fallidos. Contacte a administración.');
      } else {
        setErrorMsg(`Credenciales incorrectas. Intento ${newAttempts} de 3.`);
      }
    } else {
      // Lógica de éxito (redireccionar según rol VIP, Estándar o Admin)
      setErrorMsg('');
      alert('Inicio de sesión exitoso');
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      
      <div className={styles.inputGroup}>
        <label htmlFor="email">Correo / Usuario</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLocked}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLocked}
          required
        />
      </div>

      {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}

      <button type="submit" className={styles.submitBtn} disabled={isLocked}>
        {isLocked ? 'Bloqueado' : 'Ingresar'}
      </button>
    </form>
  );
}