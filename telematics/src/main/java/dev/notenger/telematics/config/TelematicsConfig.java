package dev.notenger.telematics.config;

import lombok.Getter;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@Configuration
@Getter
public class TelematicsConfig {

    @Value("${rabbitmq.exchanges.internal}")
    private String internalExchange;

    @Value("${rabbitmq.queues.telematics}")
    private String telematicsQueue;

    @Value("${rabbitmq.routing-keys.internal-telematics}")
    private String internalTelematicsRoutingKey;

    @Bean
    public TopicExchange internalTopicExchange() {
        return new TopicExchange(this.internalExchange);
    }

    @Bean
    public Queue telematicsQueue() {
        return new Queue(this.telematicsQueue);
    }

    @Bean
    public Binding internalToTelematicsBinding() {
        return BindingBuilder
                .bind(telematicsQueue())
                .to(internalTopicExchange())
                .with(this.internalTelematicsRoutingKey);
    }
}
