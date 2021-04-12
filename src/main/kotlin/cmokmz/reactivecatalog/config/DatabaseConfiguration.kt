package cmokmz.reactivecatalog.config

import cmokmz.reactivecatalog.domain.CatalogEntity
import cmokmz.reactivecatalog.domain.Product
import cmokmz.reactivecatalog.domain.User
import io.r2dbc.spi.ConnectionFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.Resource
import org.springframework.data.r2dbc.mapping.event.BeforeConvertCallback
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories
import org.springframework.r2dbc.connection.init.ConnectionFactoryInitializer
import org.springframework.r2dbc.connection.init.ResourceDatabasePopulator
import org.springframework.r2dbc.core.DatabaseClient
import reactor.core.publisher.Mono


@Configuration
@EnableR2dbcRepositories(basePackages = ["cmokmz.reactivecatalog.repository"])
class DatabaseConfiguration {

    @Value("classpath:db-schema.sql")
    private lateinit var schemaScript: Resource

    @Bean
    fun initializer(connectionFactory: ConnectionFactory): ConnectionFactoryInitializer {
        val initializer = ConnectionFactoryInitializer()
        initializer.setConnectionFactory(connectionFactory)
        initializer.setDatabasePopulator(ResourceDatabasePopulator(schemaScript))
        return initializer
    }

    private fun <T : CatalogEntity> createCallback(databaseClient: DatabaseClient, sequenceName: String): BeforeConvertCallback<T> {
        return BeforeConvertCallback { entity, _ ->
            if (entity.id == 0L) {
                databaseClient.sql("SELECT $sequenceName.nextval")
                        .map { row -> row.get(0, java.lang.Long::class.java) }
                        .first()
                        .map {
                            entity.id = it as Long? ?: 0
                            entity
                        }
            } else {
                Mono.just(entity)
            }
        }
    }

    @Bean
    fun userIdGeneratingCallback(databaseClient: DatabaseClient): BeforeConvertCallback<User> {
        return createCallback(databaseClient, "user_id_sequence")
    }

    @Bean
    fun productIdGeneratingCallback(databaseClient: DatabaseClient): BeforeConvertCallback<Product> {
        return createCallback(databaseClient, "product_id_sequence")
    }
}