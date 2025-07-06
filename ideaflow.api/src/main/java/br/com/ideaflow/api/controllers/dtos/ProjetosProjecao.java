package br.com.ideaflow.api.controllers.dtos;

import java.time.LocalDateTime;
import java.util.Date;

public interface ProjetosProjecao {

    Long getId();
    String getDescricao();
    LocalDateTime getDtCadastro();
    Date getDtFinal();
    Date getDtInicio();
    String getCategoria();
    String getEmpresa();
    String getStatus();
    String getNmProjeto();

}
