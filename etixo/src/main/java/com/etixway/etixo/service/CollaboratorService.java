package com.etixway.etixo.service;

import com.etixway.etixo.model.Collaborator;
import com.etixway.etixo.repository.CollaboratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


}
