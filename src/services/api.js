import axios from "axios";

// Base da URL
// https://api.themoviedb.org/3/

// URL da API
// https://api.themoviedb.org/3/movie/550?api_key=b8b056e5480a6f3ceb7789d55054030b

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;

