package br.com.ideaflow.api.services;

import br.com.ideaflow.api.models.CategoriaDeProjeto;
import br.com.ideaflow.api.repositorys.CategoriaDeProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaDeProjetoService {

    @Autowired
    private CategoriaDeProjetoRepository categoriaDeProjetoRepository;


    public List<CategoriaDeProjeto> listar(){
        List<CategoriaDeProjeto> response = categoriaDeProjetoRepository.findAll();
        return response;
    }

}
