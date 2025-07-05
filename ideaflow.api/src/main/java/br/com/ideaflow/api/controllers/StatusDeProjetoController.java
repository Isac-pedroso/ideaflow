package br.com.ideaflow.api.controllers;

import br.com.ideaflow.api.models.StatusDeProjeto;
import br.com.ideaflow.api.services.StatusDeProjetoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/statusProjeto")
@CrossOrigin(origins = "http://localhost:3000")
public class StatusDeProjetoController {

    @Autowired
    private StatusDeProjetoServices statusDeProjetoServices;

    @GetMapping("/listar")
    public ResponseEntity<List<StatusDeProjeto>> listar(){
        try{
            return ResponseEntity.ok(statusDeProjetoServices.listar());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }
    }


}
