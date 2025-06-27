import React, { useEffect, useState } from 'react'

/**
 * Import de Arquivos CSS
 * @css
 */
import '../assets/css/Notificacao.css';
import '../assets/css/fontawesome-free-6.7.2-web/css/all.min.css';

export default function Notificacao({ msg, valid, classeNomeProp, iconeProp }) {

    const [isValid, setIsvalid] = useState(false);
    const [classNameNew, setClassNameNew] = useState("");
    const [icone, setIcone] = useState("");

    useEffect(() => {

        iconeProp != "" && setIcone("fa-solid fa-"+iconeProp);
        // setClassNameNew(classeNomeProp);

        if (valid) {
            setIsvalid(true);

            const timer = setTimeout(() => {
                setIsvalid(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [valid]);


    if (!isValid) { return null }

    return (

        <div className={`notificacao`}>
            <span><i class={`${classeNomeProp} ${icone}`}></i></span>
            <p>{msg}</p>
        </div>

    )

}

