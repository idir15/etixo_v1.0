package com.etixway.etixo.service;

import com.etixway.etixo.model.Contract;
import com.etixway.etixo.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    private final ContractRepository contractRepository;

    @Autowired
    public ContractService(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    public Contract addContract(Contract contract) {
        return contractRepository.save(contract);
    }

    public ResponseEntity<String> deleteContract(Long id) {
        Optional<Contract> contractOptional = contractRepository.findById(id);
        if (contractOptional.isPresent()) {
            contractRepository.deleteById(id);
            return ResponseEntity.ok("Deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contract not found");
        }
    }

    public Optional<Contract> getContractById(Long id) {
        return contractRepository.findById(id);
    }

    public ResponseEntity<String> updateContractById(Long id, Contract updatedContract) {
        Optional<Contract> existingContractOptional = contractRepository.findById(id);

        if (existingContractOptional.isPresent()) {
            Contract existingContract = existingContractOptional.get();
            existingContract.setReference(updatedContract.getReference());
            existingContract.setContractType(updatedContract.getContractType());
            existingContract.setStartDate(updatedContract.getStartDate());
            existingContract.setEndDate(updatedContract.getEndDate());
            existingContract.setAnnualGrossSalary(updatedContract.getAnnualGrossSalary());
            existingContract.setMonthlyNetSalary(updatedContract.getMonthlyNetSalary());

            contractRepository.save(existingContract);

            return ResponseEntity.ok("Contract updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contract not found");
        }
    }
}
