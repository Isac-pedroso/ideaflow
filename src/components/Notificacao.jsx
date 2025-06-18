import React, { useEffect, useState } from 'react'

/**
 * Import de Arquivos CSS
 * @css
 */
import '../assets/css/Notificacao.css';
import '../assets/css/fontawesome-free-6.7.2-web/css/all.min.css';

export default function Notificacao({ msg, valid }) {

    const [isValid, setIsvalid] = useState(false);

    useEffect(() => {
        if (valid) {
            setIsvalid(true);

            const timer = setTimeout(() => {
                setIsvalid(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [msg]);


    if (!isValid) { return null }

    return (
        <div className="fundo-notificacao">
            <div className='notificacao'>
                <span><i class="fa-solid fa-triangle-exclamation"></i></span>
                <p>{msg}</p>
            </div>
        </div>
    )

}

