package br.com.ideaflow.api.services;

import br.com.ideaflow.api.models.StatusDeProjeto;
import br.com.ideaflow.api.repositorys.StatusDeProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusDeProjetoServices {

    @Autowired
    private StatusDeProjetoRepository statusDeProjetoRepository;

    public List<StatusDeProjeto> listar(){
        List<StatusDeProjeto> response = statusDeProjetoRepository.findAll();
        return response;
    }

}
