
import '../assets/css/CardProjeto.css';

export default function CardProjeto(dados = "") {
    console.log(dados.dados)

    return (
        <>
            <div className="card cardProjeto" style={{ width: "100%", marginBottom: "10px", display: "flex" }}>
                <div class="card-body">
                    <div className='col-md-12' style={{ width: "100%" }}>
                        <h5 class="card-title">{dados.dados.nmProjeto}</h5>
                    </div>
                    <div className='col-md-12' style={{ width: "100%", display: "flex" }}>
                        <p class="card-text">Status: {dados.dados.status}</p>
                        <p class="card-text">Status: {dados.dados.status}</p>
                    </div>
                    <div className='col-md-12' style={{ width: "100%", display: "flex" }}>
                        <p class="card-text">{dados.dados.descricao}</p>
                    </div>
                    <div className='col-md-12' style={{ width: "100%", display: "flex", justifyContent: "right" }}>
                        <button className='btn btn-primary' >Visualizar</button>
                    </div>
                </div>
            </div>
        </>
    )
}