package br.com.ideaflow.api.repositorys;

import br.com.ideaflow.api.models.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoUsuarioRepository extends JpaRepository<TipoUsuario, Long> {
    boolean existsByNome(String nome);
}
