package br.com.ideaflow.api.repositorys;

import br.com.ideaflow.api.models.CategoriaDeProjeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaDeProjetoRepository extends JpaRepository<CategoriaDeProjeto, Long> {
    boolean existsByNome(String nome);
}
