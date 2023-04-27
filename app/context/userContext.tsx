import { createContext } from "react";
import { UserState } from "../Interfaces";
export const UserContext = createContext<UserState | undefined>(undefined);
