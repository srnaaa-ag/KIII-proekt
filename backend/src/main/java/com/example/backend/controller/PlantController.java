package com.example.backend.controller;

import com.example.backend.model.Plant;
import com.example.backend.repository.PlantRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
@CrossOrigin(origins = "http://plant.local")
public class PlantController {

    private final PlantRepository repository;

    public PlantController(PlantRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Plant> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Plant addPlant(@RequestBody Plant plant) {
        return repository.save(plant);
    }

    @DeleteMapping("/{id}")
    public void deletePlant(@PathVariable String id) {
        repository.deleteById(id);
    }
    @PutMapping("/{id}")
    public Plant updatePlant(@PathVariable String id, @RequestBody Plant updatedPlant) {
        return repository.findById(id)
                .map(existingPlant -> {
                    existingPlant.setName(updatedPlant.getName());
                    existingPlant.setType(updatedPlant.getType());
                    existingPlant.setDescription(updatedPlant.getDescription());
                    existingPlant.setLastWatered(updatedPlant.getLastWatered());
                    return repository.save(existingPlant);
                })
                .orElseThrow(() -> new RuntimeException("Plant not found with id " + id));
    }

}
