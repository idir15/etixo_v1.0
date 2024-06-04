package com.etixway.etixo.controller;

import com.etixway.etixo.model.Collaborator;
import com.etixway.etixo.service.CollaboratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class CollaboratorController {
    @Autowired
    private CollaboratorService collaboratorService;
    @Autowired
    public CollaboratorController(CollaboratorService collaboratorService) {
        this.collaboratorService = collaboratorService;
    }



    @GetMapping("/getAllcollaborator")
    public List<Collaborator> getAllCollaborators() {
        return collaboratorService.getAllCollaborator();
    }

    @PostMapping("/addcollaborator")
    public Collaborator addCollaborators(@RequestBody Collaborator collaborator) {
        return collaboratorService.addCollaborator(collaborator);

    }

    @DeleteMapping("/deleteCollaborator/{id}")
    public ResponseEntity<String> deleteCollaborator(@PathVariable Long id) {
        return collaboratorService.deleteCollaborator(id);
    }

    @GetMapping("/getCollaborator/{id}")
    public Optional<Collaborator> getCollaboratorById(@PathVariable Long id) {
        return collaboratorService.getCollaboratorById(id);
    }

    @PutMapping("/updateCollaborator/{id}")
    public ResponseEntity<String> updateCollaboratorById(@PathVariable Long id, @RequestBody Collaborator updatedCollaborator) {
        return collaboratorService.updateCollaboratorById(id, updatedCollaborator);
    }




}
