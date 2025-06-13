import { useAuth } from "./AuthContext";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useState } from "react";

const Logout = () => {
  const { setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("Logged out!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "unknown error");
    }
  };
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      {error && <p>{error}</p>}
    </>
  );
};

export default Logout;
