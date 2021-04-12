package cmokmz.reactivecatalog.repository

import cmokmz.reactivecatalog.domain.User
import org.springframework.data.r2dbc.repository.R2dbcRepository
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
interface UserRepository : R2dbcRepository<User, Long> {

    fun findByLogin(login: String): Mono<User>
}