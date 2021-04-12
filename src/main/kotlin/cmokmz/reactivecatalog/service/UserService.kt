package cmokmz.reactivecatalog.service

import cmokmz.reactivecatalog.domain.Currency
import cmokmz.reactivecatalog.domain.User
import cmokmz.reactivecatalog.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import kotlin.math.log

@Service
class UserService(@Autowired private val userRepository: UserRepository) {

    fun registerUser(login: String, preferredCurrency: Currency): Mono<User> {
        return userRepository.save(User(login = login, preferredCurrency = preferredCurrency))
    }

    fun getUserByLogin(login: String): Mono<User> {
        return userRepository.findByLogin(login)
    }

    fun getUserById(id: Long): Mono<User> {
        return userRepository.findById(id)
    }

    fun getUserByUsername(username: String): Mono<User> {
        return userRepository.findByLogin(username)
    }
}