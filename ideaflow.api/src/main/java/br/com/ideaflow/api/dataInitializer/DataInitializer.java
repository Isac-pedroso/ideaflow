package br.com.ideaflow.api.dataInitializer;

import br.com.ideaflow.api.models.CategoriaDeProjeto;
import br.com.ideaflow.api.models.StatusDeProjeto;
import br.com.ideaflow.api.models.TipoUsuario;
import br.com.ideaflow.api.repositorys.CategoriaDeProjetoRepository;
import br.com.ideaflow.api.repositorys.StatusDeProjetoRepository;
import br.com.ideaflow.api.repositorys.TipoUsuarioRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer{

  @Autowired
  private StatusDeProjetoRepository statusDeProjetoRepository;

  @Autowired
  private CategoriaDeProjetoRepository categoriaDeProjetoRepository;

  @Autowired
  private TipoUsuarioRepository tipoUsuarioRepository;

  @PostConstruct
  public void init(){
    // Grava os status de projeto
    if(statusDeProjetoRepository.count() == 0){
      if(!statusDeProjetoRepository.existsByNome("Ideia")){
        StatusDeProjeto add1 = new StatusDeProjeto();
        add1.setNome("Ideia");
        statusDeProjetoRepository.save(add1);
      }
      if(!statusDeProjetoRepository.existsByNome("Protótipo")){
        StatusDeProjeto add2 = new StatusDeProjeto();
        add2.setNome("Protótipo");
        statusDeProjetoRepository.save(add2);
      }
      if(!statusDeProjetoRepository.existsByNome("Projeto lançado")){
        StatusDeProjeto add3 = new StatusDeProjeto();
        add3.setNome("Projeto lançado");
        statusDeProjetoRepository.save(add3);
      }
    }


    // Grava as categorias de projeto
    if(categoriaDeProjetoRepository.count() == 0){
      if(!categoriaDeProjetoRepository.existsByNome("Saúde")){
        CategoriaDeProjeto add1 = new CategoriaDeProjeto();
        add1.setNome("Saúde");
        categoriaDeProjetoRepository.save(add1);
      }
      if(!categoriaDeProjetoRepository.existsByNome("Educação")){
        CategoriaDeProjeto add2 = new CategoriaDeProjeto();
        add2.setNome("Educação");
        categoriaDeProjetoRepository.save(add2);
      }
      if(!categoriaDeProjetoRepository.existsByNome("Tecnologia")){
        CategoriaDeProjeto add3 = new CategoriaDeProjeto();
        add3.setNome("Tecnologia");
        categoriaDeProjetoRepository.save(add3);
      }
      if(!categoriaDeProjetoRepository.existsByNome("Agricultura")){
        CategoriaDeProjeto add4 = new CategoriaDeProjeto();
        add4.setNome("Agricultura");
        categoriaDeProjetoRepository.save(add4);
      }
    }
    if(tipoUsuarioRepository.count() == 0){
      if(!tipoUsuarioRepository.existsByNome("Empresa")){
        TipoUsuario add1 = new TipoUsuario();
        add1.setNome("Empresa");
        tipoUsuarioRepository.save(add1);
      }
      if(!tipoUsuarioRepository.existsByNome("Investidor")){
        TipoUsuario add2 = new TipoUsuario();
        add2.setNome("Investidor");
        tipoUsuarioRepository.save(add2);
      }
    }
  }
}
