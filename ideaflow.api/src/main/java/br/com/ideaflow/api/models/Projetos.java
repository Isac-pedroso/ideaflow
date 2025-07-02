package br.com.ideaflow.api.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDateTime;
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

    @Column(nullable = false)
    private int ativo;

    @Column(nullable = false)
    private LocalDateTime dt_cadastro;

    public String getNm_empresa() {
        return nm_empresa;
    }

    public void setNm_empresa(String nm_empresa) {
        this.nm_empresa = nm_empresa;
    }

    public Usuarios getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Usuarios empresa) {
        this.empresa = empresa;
    }

    public Date getDt_inicio() {
        return dt_inicio;
    }

    public void setDt_inicio(Date dt_inicio) {
        this.dt_inicio = dt_inicio;
    }

    public Date getDt_final() {
        return dt_final;
    }

    public void setDt_final(Date dt_final) {
        this.dt_final = dt_final;
    }

    public StatusDeProjeto getStatusDeProjeto() {
        return statusDeProjeto;
    }

    public void setStatusDeProjeto(StatusDeProjeto statusDeProjeto) {
        this.statusDeProjeto = statusDeProjeto;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public int getId_cidade() {
        return id_cidade;
    }

    public void setId_cidade(int id_cidade) {
        this.id_cidade = id_cidade;
    }

    public CategoriaDeProjeto getCategoriaDeProjeto() {
        return categoriaDeProjeto;
    }

    public void setCategoriaDeProjeto(CategoriaDeProjeto categoriaDeProjeto) {
        this.categoriaDeProjeto = categoriaDeProjeto;
    }

    public int getAtivo() {
        return ativo;
    }

    public void setAtivo(int ativo) {
        this.ativo = ativo;
    }

    public LocalDateTime getDt_cadastro() {
        return dt_cadastro;
    }

    public void setDt_cadastro(LocalDateTime dt_cadastro) {
        this.dt_cadastro = dt_cadastro;
    }
}
