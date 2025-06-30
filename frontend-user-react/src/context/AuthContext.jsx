import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    function login() {
        setIsAuth(true);
    }
    function logout() {
        setIsAuth(false);
    }
    return (
        <AuthContext.Provider value={{ login, logout, isAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthProvider };