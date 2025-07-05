package br.com.ideaflow.api.controllers.dtos;

import br.com.ideaflow.api.models.CategoriaDeProjeto;
import br.com.ideaflow.api.models.StatusDeProjeto;
import br.com.ideaflow.api.models.Usuarios;

import java.time.LocalDateTime;
import java.util.Date;

public class ProjetosRequesty {

    private String nm_projeto;
    private Usuarios empresa;
    private Date dt_inicio;
    private Date dt_final;
    private StatusDeProjeto statusDeProjeto;
    private String descricao;
    private int id_cidade;
    private CategoriaDeProjeto categoriaDeProjeto;
    private int ativo;
    private LocalDateTime dt_cadastro;

    public String getNm_projeto() {
        return nm_projeto;
    }

    public void setNm_projeto(String nm_projeto) {
        this.nm_projeto = nm_projeto;
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
