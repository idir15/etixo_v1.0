package com.etixway.etixo.model;

import jakarta.persistence.*;

@Entity
public class Company {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(name ="name")
    private String name;

    @Column(name ="address")
    private String address;

    @Column(name ="responsable")
    private String responsable;

    @Column(name ="email")
    private String email;

    @Column(name ="siret")
    private String siret;

    @Column(name ="legal_status")
    private String legalStatus;
    

    @Column(name ="naf")
    private String naf;

    @Column(name ="tva")
    private String tva;

    @Column(name ="is_client")
    private boolean isClient;

    @Column(name ="is_esn")
    private boolean isEsn;

    public Company() {
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSiret() {
        return siret;
    }

    public void setSiret(String siret) {
        this.siret = siret;
    }

    public String getLegalStatus() {
        return legalStatus;
    }

    public void setLegalStatus(String legalStatus) {
        this.legalStatus = legalStatus;
    }


    public String getNaf() {
        return naf;
    }

    public void setNaf(String naf) {
        this.naf = naf;
    }

    public String getTva() {
        return tva;
    }

    public void setTva(String tva) {
        this.tva = tva;
    }

    // Getter and Setter methods
    public boolean isClient() {
        return isClient;
    }

    public void setClient(boolean client) {
        isClient = client;
    }

    public boolean isEsn() {
        return isEsn;
    }

    public void setEsn(boolean esn) {
        isEsn = esn;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", responsable='" + responsable + '\'' +
                ", email='" + email + '\'' +
                ", siret='" + siret + '\'' +
                ", legal_status='" + legalStatus + '\'' +
                ", naf='" + naf + '\'' +
                ", tva='" + tva + '\'' +
                ", isClient=" + isClient +
                ", isEsn=" + isEsn +
                '}';
    }
}
