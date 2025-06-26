package br.com.ideaflow.api.controllers;

import br.com.ideaflow.api.controllers.dtos.UsuariosRequesty;
import br.com.ideaflow.api.models.Usuarios;
import br.com.ideaflow.api.repositorys.UsuariosRepository;
import br.com.ideaflow.api.services.UsuariosServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/usuarios")
@CrossOrigin
public class UsuariosController {

    @Autowired
    private UsuariosRepository usuariosRepository;

    @Autowired
    private UsuariosServices usuariosServices;

    @PostMapping("/create")
    public ResponseEntity<Usuarios> cadastrar(@RequestBody UsuariosRequesty usuarios){
        try{
            return ResponseEntity.ok(usuariosServices.create(usuarios));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }
    }

}
