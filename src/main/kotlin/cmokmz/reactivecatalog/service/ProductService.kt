package cmokmz.reactivecatalog.service

import cmokmz.reactivecatalog.application.ProductCreatedEventPublisher
import cmokmz.reactivecatalog.domain.*
import cmokmz.reactivecatalog.dto.ProductDto
import cmokmz.reactivecatalog.repository.ProductRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class ProductService(@Autowired private val productRepository: ProductRepository,
                     @Autowired private val currencyConverter: CurrencyConverter,
                     @Autowired private val userService: UserService,
                     @Autowired private val publisher: ApplicationEventPublisher,
                     @Autowired private val productCreatedEventPublisher: ProductCreatedEventPublisher) {

    private val productsStream = Flux.create(productCreatedEventPublisher).publish().autoConnect()

    @Transactional
    fun addProduct(name: String, description: String?, cost: Double, sellerId: Long): Mono<ProductDto> {
        return userService.getUserById(sellerId).flatMap { seller ->
            productRepository.save(Product(
                    name = name,
                    description = description,
                    costValue = cost,
                    costCurrency = seller.preferredCurrency,
                    seller = seller.id
            )).doOnSuccess {
                publisher.publishEvent(ProductCreatedEvent(it))
            }.flatMap { remapProduct(it, seller) }
        }
    }

    fun getAllProductsForUser(user: User): Flux<ProductDto> {
        return productRepository.findAll().flatMap {
            remapProduct(it, user)
        }
    }

    fun subscribeNewProducts(user: User): Flux<ProductDto> {
        return productsStream.flatMap { remapProduct(it, user) }
    }

    private fun remapProduct(product: Product, user: User)
            = currencyConverter.convertCurrency(product.costValue, product.costCurrency, user.preferredCurrency)
            .flatMap { newCost ->
                userService.getUserById(product.seller).map {
                    ProductDto(product.id, product.name, product.description, newCost, user.preferredCurrency, it)
                }
            }

}