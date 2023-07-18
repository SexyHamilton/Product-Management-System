import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
