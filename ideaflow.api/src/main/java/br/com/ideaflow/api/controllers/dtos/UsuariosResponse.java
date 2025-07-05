package br.com.ideaflow.api.controllers.dtos;

import br.com.ideaflow.api.models.TipoUsuario;

public class UsuariosResponse {

    private Long id;
    private String email;
    private String token;
    private TipoUsuario tp_usuario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public TipoUsuario getTp_usuario() {
        return tp_usuario;
    }

    public void setTp_usuario(TipoUsuario tp_usuario) {
        this.tp_usuario = tp_usuario;
    }
}
