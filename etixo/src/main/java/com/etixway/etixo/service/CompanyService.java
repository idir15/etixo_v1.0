package com.etixway.etixo.service;

import com.etixway.etixo.model.Company;
import com.etixway.etixo.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company addCompany(Company company) {
        return companyRepository.save(company);
    }

    public ResponseEntity<String> deleteCompany(Long id) {
        Optional<Company> companyOptional = companyRepository.findById(id);
        if (companyOptional.isPresent()) {
            companyRepository.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found");
        }
    }

    public Optional<Company> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }

    public ResponseEntity<String> updateCompanyById(Long id, Company updatedCompany) {
        Optional<Company> existingCompanyOptional = companyRepository.findById(id);

        if (existingCompanyOptional.isPresent()) {
            Company existingCompany = existingCompanyOptional.get();
            existingCompany.setName(updatedCompany.getName());
            existingCompany.setAddress(updatedCompany.getAddress());
            existingCompany.setResponsable(updatedCompany.getResponsable());
            existingCompany.setEmail(updatedCompany.getEmail());
            existingCompany.setSiret(updatedCompany.getSiret());
            existingCompany.setLegalStatus(updatedCompany.getLegalStatus());
            existingCompany.setPhone(updatedCompany.getPhone());
            existingCompany.setNaf(updatedCompany.getNaf());
            existingCompany.setTva(updatedCompany.getTva());

            companyRepository.save(existingCompany);

            return ResponseEntity.ok("Company updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found");
        }
    }
}
