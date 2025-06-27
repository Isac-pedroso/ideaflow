package br.com.ideaflow.api.controllers;

import br.com.ideaflow.api.controllers.dtos.UsuariosRequesty;
import br.com.ideaflow.api.controllers.dtos.UsuariosResponse;
import br.com.ideaflow.api.models.Usuarios;
import br.com.ideaflow.api.repositorys.UsuariosRepository;
import br.com.ideaflow.api.services.UsuariosServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuariosController {

    @Autowired
    private UsuariosRepository usuariosRepository;

    @Autowired
    private UsuariosServices usuariosServices;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody UsuariosRequesty usuarios){
        try{
            return ResponseEntity.ok(usuariosServices.create(usuarios));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/test")
    public String test() {
        System.out.println(">>> CHAMOU /usuarios/test");
        return "funcionando";
    }

}
