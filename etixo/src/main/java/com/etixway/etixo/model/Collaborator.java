package com.etixway.etixo.model;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity

public class Collaborator {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;
    @Column(name ="name")
    private String name;
    @Column(name = "firstname")
    private String firstname;
    @Column(name = "status")
    private String status;
    @Column(name ="startDateContract")
    private LocalDate startDateContract;
    @Column
    private LocalDate endDateContract;

    public Collaborator(){}
    public Collaborator(Long id, String name, String firstname, String status, LocalDate startDateContract, LocalDate endDateContract) {
        this.id = id;
        this.name = name;
        this.firstname = firstname;
        this.status = status;
        this.startDateContract = startDateContract;
        this.endDateContract = endDateContract;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getStartDateContract() {
        return startDateContract;
    }

    public void setStartDateContract(LocalDate startDateContract) {
        this.startDateContract = startDateContract;
    }

    public LocalDate getEndDateContract() {
        return endDateContract;
    }

    public void setEndDateContract(LocalDate endDateContract) {
        this.endDateContract = endDateContract;
    }

    @Override
    public String toString() {
        return "Collaborator{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", firstname='" + firstname + '\'' +
                ", status='" + status + '\'' +
                ", startDateContract=" + startDateContract +
                ", endDateContract=" + endDateContract +
                '}';
    }
}

