
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      {user && <h1>Welcome {user.name || user.email}</h1>}
      {!user && <h1>Please Login or Register</h1>}
    </div>
  )
};

export default Profile;
