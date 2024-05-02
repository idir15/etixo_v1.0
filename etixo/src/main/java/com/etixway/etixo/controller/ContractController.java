package com.etixway.etixo.controller;

import com.etixway.etixo.model.Contract;
import com.etixway.etixo.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class ContractController {

    private final ContractService contractService;

    @Autowired
    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping("/getAllContracts")
    public List<Contract> getAllContracts() {
        return contractService.getAllContracts();
    }

    @PostMapping("/addContract")
    public Contract addContract(@RequestBody Contract contract) {
        return contractService.addContract(contract);
    }

    @DeleteMapping("/deleteContract/{id}")
    public ResponseEntity<String> deleteContract(@PathVariable Long id) {
        return contractService.deleteContract(id);
    }

    @GetMapping("/getContract/{id}")
    public Optional<Contract> getContractById(@PathVariable Long id) {
        return contractService.getContractById(id);
    }

    @PutMapping("/updateContract/{id}")
    public ResponseEntity<String> updateContractById(@PathVariable Long id, @RequestBody Contract updatedContract) {
        return contractService.updateContractById(id, updatedContract);
    }
}
