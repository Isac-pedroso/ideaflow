package br.com.ideaflow.api.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ValidacoesUtils {

    public static void validarCampoVazioString(String campo, String nm_campo){
        if(campo.trim().isEmpty()){
            throw new RuntimeException("Preencha o campo "+nm_campo+"!");
        }
    }

}
