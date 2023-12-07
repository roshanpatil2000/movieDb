import React, {useEffect, useState} from "react"
import "./movieList.css"
import {useParams} from "react-router-dom"
import Cards from "../card/card"

const MovieList = () => {

    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=701618380c7ff7f66c4f0e2dfa24de61&language=en-US`)
            .then(res => res.json())
            .then(data => setMovieList(data.results))
    }
    // console.log(movieList)

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} key={movie.id}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList