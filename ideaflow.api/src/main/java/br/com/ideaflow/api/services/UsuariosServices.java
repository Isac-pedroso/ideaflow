package br.com.ideaflow.api.services;

import br.com.ideaflow.api.controllers.dtos.UsuariosRequesty;
import br.com.ideaflow.api.controllers.dtos.UsuariosResponse;
import br.com.ideaflow.api.jwt.TokenService;
import br.com.ideaflow.api.models.TipoUsuario;
import br.com.ideaflow.api.models.Usuarios;
import br.com.ideaflow.api.repositorys.UsuariosRepository;
import br.com.ideaflow.api.utils.ValidacoesUtils;
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

    @Autowired
    private TokenService tokenService;


    public UsuariosResponse create(UsuariosRequesty usuariosRequesty) throws Exception{

        // Validação de campos
        if(usuariosRequesty.getTipoUsuario().getId() == 1) {
            ValidacoesUtils.validarCampoVazioString(usuariosRequesty.getCnpj(), "cnpj");
        }
        ValidacoesUtils.validarCampoVazioString(usuariosRequesty.getEmail(), "email");
        ValidacoesUtils.validarCampoVazioString(usuariosRequesty.getNome(), "nome");
        ValidacoesUtils.validarCampoVazioString(usuariosRequesty.getSenha(), "senha");
        if(usuariosRequesty.getTipoUsuario().getId() == 2 && usuariosRequesty.getDt_nasc() == null){
            throw new RuntimeException("Preencha o campo data de nascimento!");
        }


        Optional<Usuarios> response = usuariosRepository.findByEmail(usuariosRequesty.getEmail());
        if(response.isPresent()){
            throw new Exception("Usuario já existente!");
        }

        LocalDateTime dataHoraAtual = LocalDateTime.now();

        TipoUsuario tp_usuario = new TipoUsuario();
        tp_usuario.setId(usuariosRequesty.getTipoUsuario().getId());

        Usuarios usuario = new Usuarios();
        usuario.setAtivo(1);
        usuario.setCnpj(usuariosRequesty.getCnpj());
        usuario.setNome(usuariosRequesty.getNome());
        usuario.setDt_nasc(usuariosRequesty.getDt_nasc());
        usuario.setEmail(usuariosRequesty.getEmail());
        usuario.setSenha(passwordEncoder.encode(usuariosRequesty.getSenha()));
        usuario.setDt_cadastro(dataHoraAtual);
        usuario.setDt_desativacao(null);
        usuario.setId(null);
        usuario.setTipoUsuario(tp_usuario);

        Usuarios persistResult = usuariosRepository.save(usuario);

        UsuariosResponse retorno = new UsuariosResponse();
        retorno.setId(persistResult.getId());
        retorno.setEmail(persistResult.getEmail());

        return retorno;
    }


    public UsuariosResponse login(UsuariosRequesty usuario) throws Exception{
        Optional<Usuarios> resultadoBusca = usuariosRepository.findByEmail(usuario.getEmail());

        if(!resultadoBusca.isPresent()){
            throw new Exception("Usuário ou senha incorreto!");
        }

        Usuarios bd = resultadoBusca.get();

        if(bd.getTipoUsuario().getId() == 1){
            throw new Exception("Usuário ou senha incorreto!");
        }

        if(passwordEncoder.matches(usuario.getSenha(), bd.getSenha())){
            UsuariosResponse response = new UsuariosResponse();

            response.setEmail(bd.getEmail());
            response.setId(bd.getId());
            response.setToken(tokenService.gerarToken(bd));
            response.setTp_usuario(bd.getTipoUsuario());

            return response;
        }

        throw new Exception("Usuário ou senha incorreto!");
    }
    public UsuariosResponse loginEmpresa(UsuariosRequesty usuario) throws Exception{
        Optional<Usuarios> resultadoBusca = usuariosRepository.findByCnpj(usuario.getCnpj());

        if(!resultadoBusca.isPresent()){
            throw new Exception("Usuário ou senha incorreto!");
        }

        Usuarios bd = resultadoBusca.get();

        if(passwordEncoder.matches(usuario.getSenha(), bd.getSenha())){
            UsuariosResponse response = new UsuariosResponse();

            response.setEmail(bd.getEmail());
            response.setId(bd.getId());
            response.setToken(tokenService.gerarToken(bd));
            response.setTp_usuario(bd.getTipoUsuario());

            return response;
        }

        throw new Exception("Usuário ou senha incorreto!");
    }
}
