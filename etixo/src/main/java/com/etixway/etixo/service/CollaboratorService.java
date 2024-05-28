package com.etixway.etixo.service;

import com.etixway.etixo.model.Collaborator;
import com.etixway.etixo.model.Company;
import com.etixway.etixo.model.Contract;
import com.etixway.etixo.repository.CompanyRepository;
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

    private CompanyRepository companyRepository;

    private CompanyService companyService;
    @Autowired
    public CollaboratorService(CollaboratorRepository collaboratorRepository, CompanyRepository companyRepository) {
        this.collaboratorRepository = collaboratorRepository;
        this.companyRepository = companyRepository;
    }


    public List<Collaborator> getAllCollaborator() {
        return collaboratorRepository.findAll();
    }

    public Optional<Collaborator> getCollaboratorById(Long id) {
        return collaboratorRepository.findById(id);
    }


    public Collaborator addCollaborator(Collaborator collaborator) {
        Long companyId = collaborator.getCompany().getId();

        Company existingCompany = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company with ID " + companyId + " not found"));
        collaborator.setCompany(existingCompany);
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
