package br.com.ideaflow.api.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;

@Entity
public class Projetos extends EntidadeMaster{

    @Column(nullable = false)
    private String nm_empresa;

    @ManyToOne
    @JoinColumn(name = "id_empresa")
    private Usuarios empresa;

    @Column(nullable = false)
    private Date dt_inicio;

    @Column(nullable = true)
    private Date dt_final;

    @ManyToOne
    @JoinColumn(name = "id_status")
    private StatusDeProjeto statusDeProjeto;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = true)
    private int id_cidade;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private CategoriaDeProjeto categoriaDeProjeto;



}
