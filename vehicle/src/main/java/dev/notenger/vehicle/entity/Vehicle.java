package dev.notenger.vehicle.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@Entity
@ToString(callSuper=true)
@Table(name = "vehicles")
@NoArgsConstructor
public class Vehicle extends BaseEntity {
    private String vin;
    private String make;
    private String model;
    private Integer year;
    private String groupName;
    private Integer deviceId;
    private Double lastOdometerReading;
}
