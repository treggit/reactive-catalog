package cmokmz.reactivecatalog.application

import cmokmz.reactivecatalog.domain.Product
import cmokmz.reactivecatalog.domain.ProductCreatedEvent
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.ApplicationListener
import org.springframework.stereotype.Component
import reactor.core.publisher.FluxSink
import java.lang.RuntimeException
import java.time.temporal.ChronoUnit
import java.util.concurrent.BlockingQueue
import java.util.concurrent.Executor
import java.util.concurrent.LinkedBlockingQueue
import java.util.concurrent.TimeUnit
import java.util.function.Consumer

@Component
class ProductCreatedEventPublisher(
        private val applicationTaskExecutor: Executor) : ApplicationListener<ProductCreatedEvent>, Consumer<FluxSink<Product>> {

    private val queue: BlockingQueue<ProductCreatedEvent> = LinkedBlockingQueue<ProductCreatedEvent>()

    override fun onApplicationEvent(event: ProductCreatedEvent) {
        queue.offer(event)
    }

    override fun accept(sink: FluxSink<Product>) {
        applicationTaskExecutor.execute {
            while (true) try {
                queue.poll(30, TimeUnit.SECONDS)?.let {
                    sink.next(it.source as Product)
                }
            } catch (e: InterruptedException) {
                throw RuntimeException(e)
            }
        }
    }
}