import React, { useState } from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({ children }) => { // Destructure children from props
    const [user, setUser] = useState(null);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children} {/* Render children here */}
        </UserContext.Provider>
    );
}

export default UserContextProvider;