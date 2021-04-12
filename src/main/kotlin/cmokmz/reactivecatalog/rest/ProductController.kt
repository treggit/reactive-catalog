package cmokmz.reactivecatalog.rest

import cmokmz.reactivecatalog.domain.Product
import cmokmz.reactivecatalog.domain.User
import cmokmz.reactivecatalog.dto.ProductDto
import cmokmz.reactivecatalog.service.ProductService
import cmokmz.reactivecatalog.service.UserService
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
@RequestMapping("/products")
class ProductController(@Autowired private val userService: UserService,
                        @Autowired private val productService: ProductService,
                        @Autowired private val objectMapper: ObjectMapper) {

    @PostMapping("/add")
    fun addProduct(
            @RequestParam("name") name: String,
            @RequestParam("description", required = false) description: String?,
            @RequestParam("cost") cost: Double,
            @RequestParam("seller") userId: Long
    ): Mono<ProductDto> {
        return productService.addProduct(
                name,
                description,
                cost,
                userId
        )
    }

    @GetMapping
    fun getAllProductsForUser(@RequestParam("user") userId: Long): Flux<ProductDto> {
        return userService.getUserById(userId).flatMapMany {
            productService.getAllProductsForUser(it)
        }
    }

    @GetMapping("/sse", produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun subscribeNewProducts(@RequestParam("user") userId: Long): Flux<String> {
        return userService.getUserById(userId).flatMapMany {
            productService.subscribeNewProducts(it)
        }.map {
            objectMapper.writeValueAsString(it) + "\n\n"
        }
    }
}