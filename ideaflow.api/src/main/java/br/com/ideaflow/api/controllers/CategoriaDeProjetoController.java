package br.com.ideaflow.api.controllers;

import br.com.ideaflow.api.models.CategoriaDeProjeto;
import br.com.ideaflow.api.repositorys.CategoriaDeProjetoRepository;
import br.com.ideaflow.api.services.CategoriaDeProjetoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categoria_projeto")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoriaDeProjetoController {

    @Autowired()
    private CategoriaDeProjetoService categoriaDeProjetoService;

    @GetMapping("/listar")
    public ResponseEntity<List<CategoriaDeProjeto>> listar(){
        try{
            return ResponseEntity.ok(categoriaDeProjetoService.listar());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(null);
        }
    }

}
