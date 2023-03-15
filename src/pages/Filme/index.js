import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filmeInfo.css'
import { toast } from "react-toastify";

function Filme() {

    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [load, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "b8b056e5480a6f3ceb7789d55054030b",
                    language: "pt-BR",
                }
            })
                .then((response) => {
                    setFilme(response.data);
                   // console.log(response.data)
                    setLoading(false);
                })
                .catch(() => {
                    console.log("Filme não encontrado");
                    navigate("/", {replace: true});
                    return;
                })
        }

        loadFilme();

        return () => {
            console.log("desmontado")
        }

    }, [navigate, id]);

    if (load) {
        return (
            <div className='filmeInfo'>
                <h2>Carregando detalhes...</h2>
            </div>
        );
    }

    function salvarFilme () {
        const minhaLista = localStorage.getItem("@filmes");

        let filmesSalvos = JSON.parse(minhaLista) || [];


        const hasFilme = filmesSalvos.some((filmesalvo) => filmesalvo.id === filme.id)

        if(hasFilme) {
            toast.warn("Este filma já foi salvo!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@filmes", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso")
    }


    return (
        <div className="all">
            <div className='filmeInfo'>
                <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
                <h3>Sinopse</h3>
                <span>{filme.overview}</span>
                <strong>Avaliação: {filme.vote_average.toFixed(1)}/ 10</strong>
                
                <div className="areaButtons">
                    <button onClick={salvarFilme}>Salvar</button>
                    <button><a target="blank" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Traier</a></button>
                </div>
            </div>
        </div>
    );

}

export default Filme;