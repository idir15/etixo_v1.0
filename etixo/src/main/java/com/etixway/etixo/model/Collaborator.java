package com.etixway.etixo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Collaborator {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(name ="full_name")
    private String name;

    @Column(name = "first_name")
    private String firstname;

    @Column(name = "address")
    private String address;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "social_security_number")
    private String socialSecurityNumber;

    public Collaborator(){}

    public Collaborator(Long id, String name, String firstname, String address, LocalDate dateOfBirth, String nationality, String phone, String email, String companyName, String socialSecurityNumber) {
        this.id = id;
        this.name = name;
        this.firstname = firstname;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.nationality = nationality;
        this.phone = phone;
        this.email = email;
        this.companyName = companyName;
        this.socialSecurityNumber = socialSecurityNumber;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getSocialSecurityNumber() {
        return socialSecurityNumber;
    }

    public void setSocialSecurityNumber(String socialSecurityNumber) {
        this.socialSecurityNumber = socialSecurityNumber;
    }

    @Override
    public String toString() {
        return "Collaborator{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", firstname='" + firstname + '\'' +
                ", address='" + address + '\'' +
                ", dateOfBirth=" + dateOfBirth +
                ", nationality='" + nationality + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", companyName='" + companyName + '\'' +
                ", socialSecurityNumber='" + socialSecurityNumber + '\'' +
                '}';
    }
}
