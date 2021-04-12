import React, {memo, ReactElement, useCallback, useState} from 'react';
import { useForm } from 'react-hook-form';
import {User} from "./api";

interface RegisterFormData {
  login: string,
  currency: string
}

type Props = {
  onRegister: (user: User) => void
}

function RegisterForm({onRegister}: Props): ReactElement {
  const {register, handleSubmit} = useForm<RegisterFormData>();
  const [error, setError] = useState<string | null>(null)
  const onSubmit = useCallback(async (formValues: RegisterFormData) => {
    const init: RequestInit = {
      method: 'POST'
    }
    const response = await fetch(
      `http://localhost:8080/users/register?login=${formValues.login}&currency=${formValues.currency}`,
      init
    )
    let user
    if (response.ok) {
      user = await response.text()
    }

    if (user) {
      onRegister(JSON.parse(user))
    } else {
      setError("Can't register user")
    }
  }, [setError, onRegister]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table>
        <tr>
          <td>
            <span>Enter a login:</span>
          </td>
          <td>
            <input id="login" name="login" ref={register}/>
          </td>
        </tr>
        <tr>
        <td>
          <span>Choose a preferred currency:</span>
        </td>
        <td>
          <select id="currency" name="currency" ref={register}>
            <option value="EURO">EURO</option>
            <option value="RUBLE">RUBLE</option>
            <option value="DOLLAR">DOLLAR</option>
          </select>
        </td>
        </tr>
      </table>
      <p>{error !== null ? error : ''}</p>
      <button type="submit">
        Register
      </button>
    </form>
  )
}

export default memo(RegisterForm);