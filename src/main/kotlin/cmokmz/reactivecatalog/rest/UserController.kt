package cmokmz.reactivecatalog.rest

import cmokmz.reactivecatalog.domain.Currency
import cmokmz.reactivecatalog.domain.User
import cmokmz.reactivecatalog.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.reactive.function.server.ServerResponse
import reactor.core.publisher.Mono
import reactor.core.publisher.switchIfEmpty
import java.lang.IllegalArgumentException

@RestController
@RequestMapping("/users")
class UserController(@Autowired private val userService: UserService) {

    @PostMapping("/register")
    fun register(@RequestParam("login") login: String,
                 @RequestParam("currency") currency: Currency): Mono<User> {
        return userService.registerUser(login, currency)
    }

    @GetMapping("/{username}")
    fun getUserByUsername(@PathVariable username: String): Mono<User> {
        return userService.getUserByUsername(username)
    }
}