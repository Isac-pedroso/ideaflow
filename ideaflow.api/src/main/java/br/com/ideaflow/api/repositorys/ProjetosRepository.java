package br.com.ideaflow.api.repositorys;

import br.com.ideaflow.api.controllers.dtos.ProjetosProjecao;
import br.com.ideaflow.api.models.Projetos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjetosRepository extends JpaRepository<Projetos, Long> {
    @Query("SELECT " +
            " p.id AS id,"+
            " p.descricao AS descricao," +
            " p.dt_cadastro AS dtCadastro," +
            " p.dt_final AS dtFinal," +
            " p.dt_inicio AS dtInicio," +
            " cat.nome AS categoria," +
            " u.nome AS empresa," +
            " stt.nome AS status," +
            " p.nm_projeto AS nmProjeto" +
            " FROM Projetos p " +
            "LEFT JOIN p.categoriaDeProjeto cat " +
            "LEFT JOIN p.empresa u " +
            "LEFT JOIN p.statusDeProjeto stt " +
            "WHERE p.ativo = 1"+
            "ORDER BY p.id DESC")
    List<ProjetosProjecao> getProjetos();

    @Query("SELECT " +
            " p.id AS id,"+
            " p.descricao AS descricao," +
            " p.dt_cadastro AS dtCadastro," +
            " p.dt_final AS dtFinal," +
            " p.dt_inicio AS dtInicio," +
            " cat.nome AS categoria," +
            " u.nome AS empresa," +
            " stt.nome AS status," +
            " p.nm_projeto AS nmProjeto" +
            " FROM Projetos p " +
            "LEFT JOIN p.categoriaDeProjeto cat " +
            "LEFT JOIN p.empresa u " +
            "LEFT JOIN p.statusDeProjeto stt " +
            "WHERE p.ativo = 1 " +
            "AND p.nm_projeto LIKE CONCAT('%', :nomeProjeto, '%')" +
            "AND (:status IS NULL OR :status = 0 OR p.statusDeProjeto.id = :status) " +
            "AND (:categoria IS NULL OR :categoria = 0 OR p.categoriaDeProjeto.id = :categoria) " +
            " ORDER BY p.id DESC")
    List<ProjetosProjecao> getProjetosFiltro(@Param("nomeProjeto") String nomeProjeto, @Param("status") Long status, @Param("categoria") Long categoria);

    @Query("SELECT " +
            " p.id AS id,"+
            " p.descricao AS descricao," +
            " p.dt_cadastro AS dtCadastro," +
            " p.dt_final AS dtFinal," +
            " p.dt_inicio AS dtInicio," +
            " cat.nome AS categoria," +
            " u.nome AS empresa," +
            " stt.nome AS status," +
            " p.nm_projeto AS nmProjeto" +
            " FROM Projetos p " +
            "LEFT JOIN p.categoriaDeProjeto cat " +
            "LEFT JOIN p.empresa u " +
            "LEFT JOIN p.statusDeProjeto stt " +
            "WHERE p.ativo = 1 " +
            "AND p.empresa.id = :id_empresa "+
            " ORDER BY p.id DESC")
    List<ProjetosProjecao> getTodosProjetosPorIdEmpresa(@Param("id_empresa") Long id);
}
