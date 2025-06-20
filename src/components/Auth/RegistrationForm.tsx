import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import './registration.css';

type RegistrationFormProps = {
  onClose: () => void;
};

const RegistrationForm = ({ onClose }: RegistrationFormProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = { uid: userCredential.user.uid, name, email };
      await setDoc(doc(db, "users", userCredential.user.uid), userData);
      await signOut(auth);
      alert("Registration successful!\n Please login");
      setName("");
      setEmail("");
      setPassword("");
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <form className="main-reg-form" onSubmit={handleRegister}>
      <h3 className="form-head">Registration</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button className="btn-main" type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegistrationForm;
