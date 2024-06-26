package dev.notenger.vehicle.repository;

import com.github.javafaker.Faker;
import dev.notenger.vehicle.entity.Vehicle;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.verify;

class VehicleJPADataAccessServiceTest {

    private VehicleJPADataAccessService underTest;
    private AutoCloseable autoCloseable;

    @Mock private VehicleRepository vehicleRepository;

    protected static final Faker FAKER = new Faker();

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new VehicleJPADataAccessService(vehicleRepository);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void selectAllVehicles() {
        // When
        underTest.selectAllVehicles();

        // Then
        verify(vehicleRepository).findAll();
    }

    @Test
    void selectVehicleById() {
        // Given
        int id = 1;

        // When
        underTest.selectVehicleById(id);

        // Then
        verify(vehicleRepository).findById(id);
    }

    @Test
    void insertVehicle() {
        // Given
        String fakeVIN = FAKER.bothify("1##?#??######");
        String fakeMake = FAKER.company().name();
        String fakeModel = FAKER.lorem().word();

        Vehicle vehicle = Vehicle
                .builder()
                .vin(fakeVIN)
                .make(fakeMake)
                .model(fakeModel)
                .build();

        // When
        underTest.insertVehicle(vehicle);

        // Then
        verify(vehicleRepository).save(vehicle);
    }

    @Test
    void existsVehicleById() {
        // Given
        int id = 1;

        // When
        underTest.existsVehicleById(id);

        // Then
        verify(vehicleRepository).existsVehicleById(id);
    }

    @Test
    void deleteVehicleById() {
        // Given
        int id = 1;

        // When
        underTest.deleteVehicleById(id);

        // Then
        verify(vehicleRepository).deleteById(id);
    }

    @Test
    void updateVehicle() {
        // Given
        String fakeVIN = FAKER.bothify("1##?#??######");
        String fakeMake = FAKER.company().name();
        String fakeModel = FAKER.lorem().word();

        Vehicle vehicle = Vehicle
                .builder()
                .vin(fakeVIN)
                .make(fakeMake)
                .model(fakeModel)
                .build();

        // When
        underTest.updateVehicle(vehicle);

        // Then
        verify(vehicleRepository).save(vehicle);
    }
}