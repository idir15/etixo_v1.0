package com.etixway.etixo.service;

import com.etixway.etixo.model.Collaborator;
import com.etixway.etixo.repository.CollaboratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
@Service
public class CollaboratorService {

    @Autowired
    private CollaboratorRepository collaboratorRepository;
    @Autowired
    public CollaboratorService(CollaboratorRepository collaboratorRepository) {
        this.collaboratorRepository = collaboratorRepository;
    }




    public List<Collaborator> getAllCollaborator() {
        return collaboratorRepository.findAll();
    }

    public Collaborator addCollaborator(Collaborator collaborator) {
        return collaboratorRepository.save(collaborator);

    }

    public ResponseEntity<String> deleteCollaborator(@PathVariable Long id) {

        Collaborator collaborator = collaboratorRepository.findById(id).orElse(null);
        if (collaborator == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collaborator not found");
        }

        collaboratorRepository.deleteById(id);

        return ResponseEntity.ok("Deleted successfully");
    }



}
