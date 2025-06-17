
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  return (
    <div>
      {user && <h1>Welcome {user.name || user.email}</h1>}
      {!user && <h1>Please Login or Register</h1>}
      {user && (
        <button
          onClick={() => navigate('/orders')}
        >
          View My Orders
        </button>
      )}
    </div>
  );
};

export default Profile;
