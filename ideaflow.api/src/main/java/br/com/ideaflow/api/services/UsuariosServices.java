package br.com.ideaflow.api.services;

import br.com.ideaflow.api.controllers.dtos.UsuariosRequesty;
import br.com.ideaflow.api.models.Usuarios;
import br.com.ideaflow.api.repositorys.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuariosServices {

    @Autowired
    private UsuariosRepository usuariosRepository;

    public Usuarios create(UsuariosRequesty usuariosRequesty){
        Optional<UsuariosRequesty> response = usuariosRepository.findByEmail(usuariosRequesty.getEmail());


        Usuarios usuarioPersist = new Usuarios();

        usuarioPersist.setId(null);

        return usuariosRepository.save(usuarioPersist);

    }


}
