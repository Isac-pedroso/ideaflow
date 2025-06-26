package br.com.ideaflow.api.services;

import br.com.ideaflow.api.controllers.dtos.UsuariosRequesty;
import br.com.ideaflow.api.controllers.dtos.UsuariosResponse;
import br.com.ideaflow.api.models.TipoUsuario;
import br.com.ideaflow.api.models.Usuarios;
import br.com.ideaflow.api.repositorys.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UsuariosServices {

    @Autowired
    private UsuariosRepository usuariosRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public UsuariosResponse create(UsuariosRequesty usuariosRequesty) throws Exception{
        Optional<Usuarios> response = usuariosRepository.findByEmail(usuariosRequesty.getEmail());

        if(response.isPresent()){
            throw new Exception("Usuario já existente!");
        }

        LocalDateTime dataHoraAtual = LocalDateTime.now();
        TipoUsuario tp_usuario = new TipoUsuario();
        tp_usuario.setId(usuariosRequesty.getTipoUsuario().getId());
        Usuarios usuarioPersist = new Usuarios();
        usuarioPersist.setAtivo(1);
        usuarioPersist.setCnpj(usuariosRequesty.getCnpj());
        usuarioPersist.setNome(usuariosRequesty.getNome());
        usuarioPersist.setDt_nasc(usuariosRequesty.getDt_nasc());
        usuarioPersist.setSenha(passwordEncoder.encode(usuariosRequesty.getSenha()));
        usuarioPersist.setDt_cadastro(dataHoraAtual);
        usuarioPersist.setDt_desativacao(null);
        usuarioPersist.setId(null);
        usuarioPersist.setTipoUsuario(tp_usuario);

        Usuarios persistResult = usuariosRepository.save(usuarioPersist);

        UsuariosResponse retorno = new UsuariosResponse();
        retorno.setId(persistResult.getId());
        retorno.setEmail(persistResult.getEmail());

        return retorno;
    }
}
