package cmokmz.reactivecatalog.domain

import reactor.core.publisher.Mono

interface CurrencyConverter {

    fun convertCurrency(cost: Double, from: Currency, to: Currency): Mono<Double>
}