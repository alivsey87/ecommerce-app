import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import './login.css';

type LoginFormProps = {
  onClose: () => void;
};

const LoginForm = ({ onClose }: LoginFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login successful!");
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    }
  };

  return (
    <>
      <form className="main-login-form" onSubmit={handleLogin}>
        <h3 className="form-head">Login</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-main" type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default LoginForm;
