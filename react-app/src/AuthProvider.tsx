import React, {ReactElement, ReactNode, useCallback, useEffect, useState} from 'react'
import AuthContext from "./AuthContext";
import {User} from "./api";

type Props = {
    children: ReactNode
}

const USER_ID = "userId"

function getUserFromLocalStorage(): User | null {
  const value = window.localStorage.getItem(USER_ID)
  if (value === null) {
    return null
  }
  return JSON.parse(value)
}

export default function AuthProvider({children}: Props): ReactElement {
    const [user, setUserState] = useState<User | null>(
        getUserFromLocalStorage()
    )

    const setUser = useCallback(
        (value: User | null) => {
            if (value != null) {
                window.localStorage.setItem(USER_ID, JSON.stringify(value))
            } else {
                window.localStorage.removeItem(USER_ID)
            }
            setUserState(value)
        },
        [setUserState],
    )

    const setUserIsWrong = useCallback(() => {
        setUserState(null)
    }, [setUserState])

    useEffect(() => {
        const onStorageChange = (event: StorageEvent) => {
            if (event.key === USER_ID) {
                setUserState(getUserFromLocalStorage)
            }
        }
        window.addEventListener('storage', onStorageChange, false)
        return () => window.removeEventListener('storage', onStorageChange)
    }, [setUserState])

    return (
        <AuthContext.Provider value={{currentUser: user, setUser: setUser, setUserIsWrong: setUserIsWrong}}>
            {children}
        </AuthContext.Provider>
    )
}
