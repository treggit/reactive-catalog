export default function currencySymbol(currency: string): string {
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