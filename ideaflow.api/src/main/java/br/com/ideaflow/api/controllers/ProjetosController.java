package br.com.ideaflow.api.controllers;

import br.com.ideaflow.api.controllers.dtos.ProjetosRequesty;
import br.com.ideaflow.api.models.CategoriaDeProjeto;
import br.com.ideaflow.api.models.Projetos;
import br.com.ideaflow.api.models.StatusDeProjeto;
import br.com.ideaflow.api.models.Usuarios;
import br.com.ideaflow.api.services.ProjetosService;
import com.sun.jdi.event.ExceptionEvent;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/projetos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjetosController {

    @Autowired
    private ProjetosService projetosService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProjetosRequesty projeto){
        try{
            return ResponseEntity.ok(projetosService.cadastrar(projeto));
        }catch(Exception e){
            e.printStackTrace();
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage().toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listar(){
        try{
            return ResponseEntity.ok(projetosService.listar());
        }catch (Exception e){
            e.printStackTrace();
            Map<String, String> response = new HashMap<>();
            response.put("erro","Erro: "+e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/listarFiltro")
    public ResponseEntity<?> listarFiltro(@RequestBody ProjetosRequesty projeto){
        try{
            return ResponseEntity.ok(projetosService.listarFiltro(projeto));
        }catch (Exception e){
            e.printStackTrace();
            Map<String, String> response = new HashMap<>();
            response.put("erro","Erro: "+e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/listarProjetosEmpresa/{id}")
    public ResponseEntity<?> listarProjetosEmpresa(@PathVariable Long id){
        try{
            return ResponseEntity.ok(projetosService.listarProjetosEmpresa(id));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/buscarProjeto/{id}")
    public ResponseEntity<?> buscarProjeto(@PathVariable Long id){
        try{
            return ResponseEntity.ok(projetosService.buscarProjeto(id));
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editarProjeto(@PathVariable Long id,@RequestBody ProjetosRequesty projeto){
        try{
            return ResponseEntity.ok(projetosService.editar(id,projeto));
        }catch(Exception e){
            e.printStackTrace();
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage().toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
