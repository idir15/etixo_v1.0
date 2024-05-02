package com.etixway.etixo.controller;

import com.etixway.etixo.model.Company;
import com.etixway.etixo.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/getAllCompanies")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @PostMapping("/addCompany")
    public Company addCompany(@RequestBody Company company) {
        return companyService.addCompany(company);
    }

    @DeleteMapping("/deleteCompany/{id}")
    public ResponseEntity<String> deleteCompany(@PathVariable Long id) {
        return companyService.deleteCompany(id);
    }

    @GetMapping("/getCompany/{id}")
    public Optional<Company> getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id);
    }

    @PutMapping("/updateCompany/{id}")
    public ResponseEntity<String> updateCompanyById(@PathVariable Long id, @RequestBody Company updatedCompany) {
        return companyService.updateCompanyById(id, updatedCompany);
    }
}
