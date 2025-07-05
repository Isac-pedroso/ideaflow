package br.com.ideaflow.api.repositorys;

import br.com.ideaflow.api.models.Projetos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjetosRepository extends JpaRepository<Projetos, Long> {
}
