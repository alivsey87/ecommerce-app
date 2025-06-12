import Modal from "../../components/Modal/Modal";
import LoginForm from "../../components/Auth/LoginForm";
import RegistrationForm from "../../components/Auth/RegistrationForm";
import { useState } from "react";

const Home: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      <h1>Welcome to our store!</h1>
      <h3>Please login</h3>
      <button onClick={() => setShowLogin(true)}>Login</button>
      <h3>Don't have an account? Register below</h3>
      <button onClick={() => setShowRegister(true)}>Register</button>
      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
        <LoginForm />
      </Modal>
      <Modal isOpen={showRegister} onClose={() => setShowRegister(false)}>
        <RegistrationForm onClose={() => setShowRegister(false)} />
      </Modal>
    </>
  );
};

export default Home;
