package cmokmz.reactivecatalog.domain

import org.springframework.data.annotation.Id

data class User(
    @Id
    override var id: Long = 0,
    val login: String,
    val preferredCurrency: Currency
) : CatalogEntity