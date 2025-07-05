package br.com.ideaflow.api.repositorys;

import br.com.ideaflow.api.models.Projetos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjetosRepository extends JpaRepository<Projetos, Long> {
    @Query("SELECT " +
            "p.descricao AS descricao," +
            " p.dt_cadastro AS dt_cadastro," +
            " p.dt_final AS dt_final," +
            " p.dt_inicio AS dt_inicio," +
            " cat.nome AS categoria," +
            " u.nome AS empresa," +
            " stt.nome AS status," +
            " p.nm_projeto" +
            " FROM Projetos p " +
            "LEFT JOIN p.categoriaDeProjeto cat " +
            "LEFT JOIN p.empresa u " +
            "LEFT JOIN p.statusDeProjeto stt " +
            "WHERE p.ativo = 1")
    List<Projetos> getProjetos();
}
