import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../features/user/userSlice";
import Modal from "../../components/Modal/Modal";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [editError, setEditError] = useState("");
  const [password, setPassword] = useState("");

  const handleNameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), { name: newName });
      dispatch(setUser({ ...user, name: newName }));
      setShowEdit(false);
      setEditError("");
    } catch {
      setEditError("Failed to update name.");
    }
  };

  const handleAccountDelete = async () => {
    try {
      if (!user || !auth.currentUser) return;

      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        password
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", user.uid)
      );
      const ordersSnapshot = await getDocs(ordersQuery);
      const deleteOrderPromises = ordersSnapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "orders", docSnap.id))
      );
      await Promise.all(deleteOrderPromises);

      await deleteDoc(doc(db, "users", user.uid));

      await deleteUser(auth.currentUser);

      dispatch(clearUser());

      alert("Account deleted successfully.");
      navigate("/profile");
    } catch (err) {
      alert(
        "Failed to delete account: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  return (
    <div>
      {!user && <h1>Please Login or Register</h1>}
      {user && (
        <div>
          <h1>Welcome {user.name || user.email}</h1>
          <button onClick={() => navigate("/profile/orders")}>
            View My Orders
          </button>
          <button onClick={() => setShowDelete(true)}>Delete account</button>
          <button onClick={() => setShowEdit(true)}>Edit Profile</button>

          <Modal isOpen={showEdit} onClose={() => setShowEdit(false)}>
            <form onSubmit={handleNameUpdate}>
              <h3>Edit Profile</h3>
              <label>
                Name:
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />
              </label>
              {editError && <p style={{ color: "red" }}>{editError}</p>}
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowEdit(false)}>
                Cancel
              </button>
            </form>
          </Modal>

          <Modal isOpen={showDelete} onClose={() => setShowDelete(false)}>
            <div>
              <h3>Are you sure you want to delete your account?</h3>
              <p>This action cannot be reversed.</p>
              <input
                type="password"
                placeholder="Enter your password to confirm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleAccountDelete}>Yes</button>
              <button onClick={() => setShowDelete(false)}>No</button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Profile;
