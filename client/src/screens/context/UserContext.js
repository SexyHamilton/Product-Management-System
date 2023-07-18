import React, { useEffect, useState } from "react";

export const ProfileContext = React.createContext();

export function ProfileProvider(props) {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUserProfile(user);
      console.log("setting user profile...");
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {props.children}
    </ProfileContext.Provider>
  );
}
