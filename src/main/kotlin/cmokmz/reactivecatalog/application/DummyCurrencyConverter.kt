package cmokmz.reactivecatalog.application

import cmokmz.reactivecatalog.domain.Currency
import cmokmz.reactivecatalog.domain.CurrencyConverter
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import kotlin.math.roundToLong
import kotlin.math.truncate

@Component
class DummyCurrencyConverter : CurrencyConverter {

    private val baseUnits = mapOf(
            Currency.DOLLAR to 1.0,
            Currency.RUBLE to 75.0,
            Currency.EURO to 0.85
    )

    override fun convertCurrency(cost: Double, from: Currency, to: Currency): Mono<Double> {
        return Mono.just((cost / (baseUnits[from] ?: 1.0) * (baseUnits[to] ?: 1.0) * 100).roundToLong() / 100.0)
    }
}