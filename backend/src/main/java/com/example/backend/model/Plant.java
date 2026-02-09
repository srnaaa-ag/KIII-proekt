package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "plants")
public class Plant {
    @Id
    private String id;

    private String name;
    private LocalDate lastWatered;
    private String description;


    private String type;

    public Plant() {
    }

    public Plant(String name, LocalDate lastWatered, String description, String type) {
        this.name = name;
        this.lastWatered = lastWatered;
        this.description = description;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getLastWatered() {
        return lastWatered;
    }

    public String getDescription() {
        return description;
    }

    public String getType() {
        return type;
    }
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLastWatered(LocalDate lastWatered) {
        this.lastWatered = lastWatered;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public void setType(String type) {
        this.type = type;
    }

}