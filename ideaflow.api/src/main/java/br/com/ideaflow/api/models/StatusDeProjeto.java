package br.com.ideaflow.api.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class StatusDeProjeto extends EntidadeMaster{
    @Column(nullable = false)
    private String nome;

    public StatusDeProjeto(String nome){
        this.nome = nome;
    }
}
