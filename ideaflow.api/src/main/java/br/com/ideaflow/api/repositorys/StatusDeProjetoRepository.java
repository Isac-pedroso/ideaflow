package br.com.ideaflow.api.repositorys;

import br.com.ideaflow.api.models.StatusDeProjeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatusDeProjetoRepository extends JpaRepository<StatusDeProjeto, Long> {
    boolean existsByNome(String nome);
}
