package cmokmz.reactivecatalog.domain

import com.fasterxml.jackson.annotation.JsonBackReference
import org.springframework.data.annotation.Id
import javax.persistence.*

class Product(
    @Id
    override var id: Long = 0,
    val name: String,
    val description: String?,
    val costValue: Double,
    val costCurrency: Currency,
    val seller: Long
) : CatalogEntity