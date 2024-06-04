package com.etixway.etixo.service;

import com.etixway.etixo.model.Collaborator;
import com.etixway.etixo.model.Company;
import com.etixway.etixo.repository.CollaboratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

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

    public Optional<Collaborator> getCollaboratorById(Long id) {
        return collaboratorRepository.findById(id);
    }


    public ResponseEntity<String> updateCollaboratorById(Long id, Collaborator updatedCollaborator) {
        Optional<Collaborator> existingCollaboratorOptional = collaboratorRepository.findById(id);

        if (existingCollaboratorOptional.isPresent()) {
            Collaborator existingCollaborator = existingCollaboratorOptional.get();
            existingCollaborator.setName(updatedCollaborator.getName());
            existingCollaborator.setFirstname(updatedCollaborator.getFirstname());
            existingCollaborator.setAddress(updatedCollaborator.getAddress());
            existingCollaborator.setEmail( updatedCollaborator.getEmail());
            existingCollaborator.setPhone(updatedCollaborator.getPhone());
            existingCollaborator.setCompanyName(updatedCollaborator.getCompanyName());
            existingCollaborator.setDateOfBirth(updatedCollaborator.getDateOfBirth());
            existingCollaborator.setNationality(updatedCollaborator.getNationality());
            existingCollaborator.setId(updatedCollaborator.getId());
            collaboratorRepository.save(existingCollaborator);

            return ResponseEntity.ok("Collaborator updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collaborator not found");
        }
    }



}
