package cmokmz.reactivecatalog.domain

import org.springframework.context.ApplicationEvent

class ProductCreatedEvent(product: Product) : ApplicationEvent(product)