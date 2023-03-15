import './favoritos.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Favoritos() {

    const [filmes, setFilmes] = useState([]);

    useEffect(()=> {
        const minhaLista = localStorage.getItem("@filmes");
        setFilmes(JSON.parse(minhaLista) || []);
    }, [])

    function excluirFilme(recebendoId) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== recebendoId)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@filmes", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com Sucesso!!")
    }


    return(
        <div className='meusFilmes'>
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :-/</span> }

            <ul>
                {filmes.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>

        </div>
    );
}