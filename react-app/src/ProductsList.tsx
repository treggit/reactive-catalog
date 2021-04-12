import React, {FunctionComponent, useCallback, useContext, useEffect, useState} from 'react';
import {Product} from "./api";
import AuthContext from "./AuthContext";


interface ProductsListProps {
}

function currencySymbol(currency: string): string {
  if (currency === 'EURO') {
    return '€'
  }
  if (currency === 'DOLLAR') {
    return '$'
  }
  if (currency === 'RUBLE') {
    return '₽'
  }

  return currency
}

const ProductsList: FunctionComponent<ProductsListProps> = () => {
  const [products, setProducts] = useState(new Map<Number, Product>())
  const [listening, setListening] = useState(false)
  const {currentUser} = useContext(AuthContext)
  const fetchProducts = useCallback(async () => {
    if (listening || currentUser === null) {
      return
    }
    setListening(true)
    const response = await fetch('http://localhost:8080/products?user=' + currentUser.id)
    const data = await response.json()
    data.forEach((product: Product) => {
      products.set(product.id, product)
    })
    setProducts(new Map(products))
    setListening(true)
    const eventSource = new EventSource('http://localhost:8080/products/sse?user=' + currentUser.id);
    eventSource.onmessage = (event: any) => {
      const product = JSON.parse(event.data) as Product;
      setProducts(new Map(products.set(product.id, product)))
    };
    eventSource.onerror = () => eventSource.close()

  }, [setProducts, currentUser, products, listening])

  useEffect(() => {
    fetchProducts().then()
  }, [fetchProducts])

  return (
    <div>
      <h2>Products List</h2>
      {Array.from(products.values()).map((product: Product) =>
        <div key={product.id}>
          {product.name} by <strong>{product.seller.login}</strong>, {product.costValue}{currencySymbol(product.costCurrency)} <br/>
        </div>
      )}
    </div>
  );
}

export default ProductsList;
