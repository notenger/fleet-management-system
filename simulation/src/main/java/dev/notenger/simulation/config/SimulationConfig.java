package dev.notenger.simulation.config;

import com.anylogic.engine.Experiment;
import com.anylogic.engine.gui.ExperimentHost;
import com.anylogic.engine.gui.IExperimentHost;
import dev.notenger.amqp.RabbitMQMessageProducer;
import dev.notenger.simulation.model.SimulationCallback;
import dev.notenger.simulation.model.SimulationClient;
import dev.notenger.simulation.model.SimulationMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class SimulationConfig implements SimulationCallback {

    private final RabbitMQMessageProducer rabbitMQMessageProducer;

    @Bean
    public SimulationClient simulationClient() {
        final SimulationClient client = new SimulationClient();
        client.setCallback(this);
        client.setSensorCollectionFrequency(100L);
        IExperimentHost host = new ExperimentHost(client);
        client.setup(host);
        host.launch();

        if (client.getState() == Experiment.IDLE) {
            client.run();
        }
        host.setPresentable(client.getEngine().getRoot());
        return client;
    }

    @Override
    public void messageArrived(SimulationMessage message) {
        rabbitMQMessageProducer.publish(
                message,
                "internal.exchange",
                "internal.telematics.routing-key"
        );
    }

}
