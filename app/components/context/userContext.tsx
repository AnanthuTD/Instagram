import { createContext } from "react";
import { UserState } from "../utils/Interfaces";
export const UserContext = createContext<UserState | undefined>(undefined);
