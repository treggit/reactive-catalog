package cmokmz.reactivecatalog.repository

import cmokmz.reactivecatalog.domain.Product
import org.springframework.data.r2dbc.repository.R2dbcRepository
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository : R2dbcRepository<Product, Long> {
}