package br.com.ideaflow.api.services;

import br.com.ideaflow.api.controllers.dtos.ProjetosProjecao;
import br.com.ideaflow.api.controllers.dtos.ProjetosRequesty;
import br.com.ideaflow.api.models.CategoriaDeProjeto;
import br.com.ideaflow.api.models.Projetos;
import br.com.ideaflow.api.models.StatusDeProjeto;
import br.com.ideaflow.api.models.Usuarios;
import br.com.ideaflow.api.repositorys.ProjetosRepository;
import br.com.ideaflow.api.utils.ValidacoesUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProjetosService {

    @Autowired
    private ProjetosRepository projetosRepository;

    public Projetos cadastrar(ProjetosRequesty projeto){

        Usuarios empresa = new Usuarios();
        empresa.setId(projeto.getEmpresa().getId());

        StatusDeProjeto status = new StatusDeProjeto();
        status.setId(projeto.getStatusDeProjeto().getId());

        CategoriaDeProjeto categoria = new CategoriaDeProjeto();
        categoria.setId(projeto.getCategoriaDeProjeto().getId());

        LocalDateTime dataHoraAtual = LocalDateTime.now();

        Projetos projetoPersist = new Projetos();

        projetoPersist.setNm_projeto(projeto.getNm_projeto());
        projetoPersist.setEmpresa(empresa);
        projetoPersist.setDt_inicio(projeto.getDt_inicio());
        projetoPersist.setDt_final(projeto.getDt_final());
        projetoPersist.setStatusDeProjeto(status);
        projetoPersist.setDescricao(projeto.getDescricao());
        projetoPersist.setId_cidade(projeto.getId_cidade());
        projetoPersist.setCategoriaDeProjeto(categoria);
        projetoPersist.setAtivo(1);
        projetoPersist.setDt_cadastro(dataHoraAtual);

        return projetosRepository.save(projetoPersist);
    }


    public List<ProjetosProjecao> listar(){
        List<ProjetosProjecao> response = projetosRepository.getProjetos();
        return response;
    }

    public List<ProjetosProjecao> listarFiltro(ProjetosRequesty projeto){
        Long id_status = null;
        Long id_categoria = null;

        if(projeto.getStatusDeProjeto() != null &&projeto.getStatusDeProjeto().getId() != null ){
            id_status = projeto.getStatusDeProjeto().getId();
        }
        if(projeto.getCategoriaDeProjeto() != null &&projeto.getCategoriaDeProjeto().getId() != null ){
            id_categoria = projeto.getCategoriaDeProjeto().getId();
        }

        List<ProjetosProjecao> response = projetosRepository.getProjetosFiltro(projeto.getNm_projeto(), id_status, id_categoria);
        return response;
    }

    public List<ProjetosProjecao> listarProjetosEmpresa(Long id) throws Exception{
        List<ProjetosProjecao> response = projetosRepository.getTodosProjetosPorIdEmpresa(id);
        return response;
    }
}
