package br.com.ideaflow.api.dataInitializer;

import br.com.ideaflow.api.models.CategoriaDeProjeto;
import br.com.ideaflow.api.models.StatusDeProjeto;
import br.com.ideaflow.api.repositorys.CategoriaDeProjetoRepository;
import br.com.ideaflow.api.repositorys.StatusDeProjetoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer{

  @Autowired
  private StatusDeProjetoRepository statusDeProjetoRepository;

  @Autowired
  private CategoriaDeProjetoRepository categoriaDeProjetoRepository;

  @PostConstruct
  public void init(){
    // Grava os status de projeto
    if(statusDeProjetoRepository.count() == 0){
      if(!statusDeProjetoRepository.existsByNome("Ideia")){
        statusDeProjetoRepository.save(new StatusDeProjeto("Ideia"));
      }
      if(!statusDeProjetoRepository.existsByNome("Protótipo")){
        statusDeProjetoRepository.save(new StatusDeProjeto("Protótipo"));
      }
      if(!statusDeProjetoRepository.existsByNome("Projeto lançado")){
        statusDeProjetoRepository.save(new StatusDeProjeto("Projeto lançado"));
      }
    }


    // Grava as categorias de projeto
    if(categoriaDeProjetoRepository.count() == 0){
      if(!categoriaDeProjetoRepository.existsByNome("Saúde")){
        categoriaDeProjetoRepository.save(new CategoriaDeProjeto("Saúde"));
      }
      if(!categoriaDeProjetoRepository.existsByNome("Educação")){
        categoriaDeProjetoRepository.save(new CategoriaDeProjeto("Educação"));
      }
      if(!categoriaDeProjetoRepository.existsByNome("Tecnologia")){
        categoriaDeProjetoRepository.save(new CategoriaDeProjeto("Tecnologia"));
      }
      if(!categoriaDeProjetoRepository.existsByNome("Agricultura")){
        categoriaDeProjetoRepository.save(new CategoriaDeProjeto("Agricultura"));
      }
    }
  }

}
