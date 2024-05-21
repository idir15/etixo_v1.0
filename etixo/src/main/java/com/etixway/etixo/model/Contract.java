package com.etixway.etixo.model;

import jakarta.persistence.*;
import java.sql.Date; // Importer java.sql.Date
import java.text.SimpleDateFormat;

import static jakarta.persistence.CascadeType.MERGE;
import static jakarta.persistence.CascadeType.PERSIST;

@Entity
public class Contract {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(name = "reference")
    private String reference;

    @Column(name = "contract_type")
    private String contractType;

    @Column(name = "start_date")
    private Date startDate; // Utiliser java.sql.Date

    @Column(name = "end_date")
    private Date endDate; // Utiliser java.sql.Date

    @Column(name = "annual_gross_salary")
    private double annualGrossSalary;

    @Column(name = "monthly_net_salary")
    private double monthlyNetSalary;

    @ManyToOne(cascade = {PERSIST})
    @JoinColumn(name = "id_collaborator")
    private Collaborator collaborator;

    public Contract() {
    }

    // Getter and Setter methods

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }


    public String getContractType() {
        return contractType;
    }

    public void setContractType(String contractType) {
        this.contractType = contractType;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public double getAnnualGrossSalary() {
        return annualGrossSalary;
    }

    public void setAnnualGrossSalary(double annualGrossSalary) {
        this.annualGrossSalary = annualGrossSalary;
    }

    public double getMonthlyNetSalary() {
        return monthlyNetSalary;
    }

    public void setMonthlyNetSalary(double monthlyNetSalary) {
        this.monthlyNetSalary = monthlyNetSalary;
    }

    public Collaborator getCollaborator() {
        return collaborator;
    }

    public void setCollaborator(Collaborator collaborator) {
        this.collaborator = collaborator;
    }

    // Méthode pour formater la date
    public String formatDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        return sdf.format(date);
    }

    @Override
    public String toString() {
        return "Contract{" +
                "id=" + id +
                ", reference='" + reference + '\'' +
                ", contractType='" + contractType + '\'' +
                ", startDate=" + formatDate(startDate) +
                ", endDate=" + formatDate(endDate) +
                ", annualGrossSalary=" + annualGrossSalary +
                ", monthlyNetSalary=" + monthlyNetSalary +
                ", collaborator=" + collaborator +
                '}';
    }
}
