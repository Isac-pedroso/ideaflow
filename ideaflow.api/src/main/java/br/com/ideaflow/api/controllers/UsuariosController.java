package br.com.ideaflow.api.controllers;

import br.com.ideaflow.api.controllers.dtos.UsuariosRequesty;
import br.com.ideaflow.api.models.Usuarios;
import br.com.ideaflow.api.repositorys.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/usuarios")
public class UsuariosController {

    @Autowired
    private UsuariosRepository usuariosRepository;

    public ResponseEntity<Usuarios> cadastrar(@RequestBody UsuariosRequesty){
        
    }

}
