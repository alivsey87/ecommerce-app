import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

interface AuthContextType {
    user: null | User,
    setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType>({
    user : null,
    setUser: (user: User | null) => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => user ? setUser(user) : setUser(null))
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);