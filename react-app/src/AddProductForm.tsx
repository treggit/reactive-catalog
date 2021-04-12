import React, {memo, ReactElement, useCallback, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Product, User} from "./api";

interface AddProductFormData {
  name: string,
  cost: number
}

type Props = {
  onProductAdded: (product: Product) => void
  currentUser: User | null
}

function RegisterForm({onProductAdded, currentUser}: Props): ReactElement {
  const {register, handleSubmit} = useForm<AddProductFormData>();
  const [error, setError] = useState<string | null>(null)
  const onSubmit = useCallback(async (formValues: AddProductFormData) => {

    if (currentUser == null) {
      setError("You should log in before you add a product")
    }

    const init: RequestInit = {
      method: 'POST'
    }
    const response = await fetch(
      `http://localhost:8080/products/add?seller=${currentUser!!.id}&name=${formValues.name}&cost=${formValues.cost}`,
      init
    )
    let product
    if (response.ok) {
      product = await response.text()
    }

    if (product) {
      onProductAdded(JSON.parse(product))
    } else {
      setError("Can't add product")
    }
  }, [setError, currentUser, onProductAdded]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table>
        <tr>
          <td>
            <span>Enter a product name:</span>
          </td>
          <td>
            <input id="name" name="name" ref={register}/>
          </td>
        </tr>
        <tr>
          <td>
            <span>Enter a product cost:</span>
          </td>
          <td>
            <input id="cost" name="cost" ref={register}/>
          </td>
        </tr>
      </table>
      <p>{error !== null ? error : ''}</p>
      <button type="submit">
        Add product
      </button>
    </form>
  )
}

export default memo(RegisterForm);