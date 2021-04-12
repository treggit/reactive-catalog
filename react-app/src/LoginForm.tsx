import React, {memo, ReactElement, useCallback, useState} from 'react';
import { useForm } from 'react-hook-form';
import {User} from "./api";

interface LoginFormData {
  login: string
}

type Props = {
  onLogin: (user: User) => void
}

function LoginForm({onLogin}: Props): ReactElement {
  const {register, handleSubmit} = useForm<LoginFormData>();
  const [error, setError] = useState<string | null>(null)
  const onSubmit = useCallback(async (formValues: LoginFormData) => {
    const response = await fetch(
      `http://localhost:8080/users/${formValues.login}`,
    )
    let user
    if (response.ok) {
      user = await response.text()
    }

    if (user) {
      onLogin(JSON.parse(user))
    } else {
      setError("Can't find user")
    }
  }, [setError, onLogin]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table>
        <tr>
          <td>
            <span>Enter your login:</span>
          </td>
          <td>
            <input id="login" name="login" ref={register}/>
          </td>
        </tr>
      </table>
      <p>{error !== null ? 'Error: ' + error : ''}</p>
      <button type="submit">
        Login
      </button>
    </form>
  )
}

export default memo(LoginForm);