package com.etixway.etixo.repository;

import com.etixway.etixo.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long>  {
}
