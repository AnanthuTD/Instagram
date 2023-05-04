"use client";
import React, { createContext, useContext, useState } from "react";
import { UserState } from "../../../utils/Interfaces";

interface UserContextInterface {
	user: UserState | undefined;
	setUser: React.Dispatch<React.SetStateAction<UserState | undefined>>;
}

// context
const UserContext = createContext<UserContextInterface>({
    user: undefined,
    setUser: () => {},
  });
export function useUserContext():UserContextInterface{
	return useContext(UserContext);
}

export function UserContextProvider({ children }: { children: React.ReactNode }) {
	// useStates``
	const [user, setUser] = useState<UserState | undefined>(undefined);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}


