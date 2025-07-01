package br.com.ideaflow.api.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class CategoriaDeProjeto extends EntidadeMaster{

    @Column(nullable = false)
    private String nome;

    public CategoriaDeProjeto(String nome) {
        this.nome = nome;
    }
}
