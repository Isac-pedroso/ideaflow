package br.com.ideaflow.api.controllers.dtos;

import br.com.ideaflow.api.models.TipoUsuario;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;
import java.util.Date;

public class UsuariosRequesty {
    private String cnpj;
    private String nome;
    private String senha;
    private String email;
    private Date dt_nasc;
    private LocalDate dt_cadastro;
    private int ativo;
    private LocalDate dt_desativacao;
    private TipoUsuario tipoUsuario;

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDt_nasc() {
        return dt_nasc;
    }

    public void setDt_nasc(Date dt_nasc) {
        this.dt_nasc = dt_nasc;
    }

    public LocalDate getDt_cadastro() {
        return dt_cadastro;
    }

    public void setDt_cadastro(LocalDate dt_cadastro) {
        this.dt_cadastro = dt_cadastro;
    }

    public int getAtivo() {
        return ativo;
    }

    public void setAtivo(int ativo) {
        this.ativo = ativo;
    }

    public LocalDate getDt_desativacao() {
        return dt_desativacao;
    }

    public void setDt_desativacao(LocalDate dt_desativacao) {
        this.dt_desativacao = dt_desativacao;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }
}
