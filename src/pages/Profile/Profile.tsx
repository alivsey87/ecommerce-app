import { useState } from "react";
import { useAuth } from "../../components/Auth/AuthContext";
import { updateProfile, deleteUser } from "firebase/auth";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [dispName, setDispName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);




  return <div>Profile</div>;
};

export default Profile;
