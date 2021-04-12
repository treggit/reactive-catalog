import {createContext} from "react";
import {User} from "./api";

type Context = {
    currentUser: User | null
    setUser: (user: User | null) => void
    setUserIsWrong: () => void
}

const AuthContext = createContext<Context>({
    currentUser: null,
    setUser: () => undefined,
    setUserIsWrong: () => undefined,
})

export default AuthContext
