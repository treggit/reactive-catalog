package cmokmz.reactivecatalog.dto

import cmokmz.reactivecatalog.domain.Currency
import cmokmz.reactivecatalog.domain.User
import com.fasterxml.jackson.annotation.JsonBackReference
import org.springframework.data.annotation.Id
import javax.persistence.*

data class ProductDto(
        val id: Long,
        val name: String,
        val description: String?,
        val costValue: Double,
        val costCurrency: Currency,
        val seller: User
)