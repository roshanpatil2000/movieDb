import React, { useEffect, useState } from "react"
import MovieList from "../../components/movieList/movieList";

const Home = () => {
    const api_key = "a5dcd28ce86c4ad7fd653a6d2c83315a"

    const [ popularMovies, setPopularMovies ] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US`)
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])

    return (
        <>
            <div>
                <MovieList />
            </div>
        </>
    )
}

export default Home