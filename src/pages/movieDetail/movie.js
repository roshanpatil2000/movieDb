import React, {useEffect, useState} from "react"
import "./movie.css"
import {useParams} from "react-router-dom"

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState("")
    const [currentMovieCrewDetail, setCrewMovie] = useState("")
    const {id} = useParams()

    useEffect(() => {
        getMovieData()
        getCrewData()
        window.scrollTo(0, 0)
    }, [])

    const getMovieData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=701618380c7ff7f66c4f0e2dfa24de61&language=en-US`)
            .then(res => res.json())
            .then(data => setMovie(data))
    }
    const getCrewData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=701618380c7ff7f66c4f0e2dfa24de61&language=en-US`)
            .then(res => res.json())
            .then(data => setCrewMovie(data.cast))
    }
    // console.log("currentCrewDetail", currentMovieCrewDetail)
    // console.log("currentMovieDetail", currentMovieDetail)
    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop"
                     src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`}
                     alt={currentMovieDetail ? currentMovieDetail.title : ""}
                />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster"
                             src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`}
                             alt={currentMovieDetail ? currentMovieDetail.title : ""}
                        />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            Rating:{currentMovieDetail ? currentMovieDetail.vote_average : ""} <i
                            className="fas fa-star"/>
                        </div>
                        <div
                            className="movie__runtime">{currentMovieDetail ? "Run time: " + currentMovieDetail.runtime + " mins" : ""}</div>
                        <div
                            className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                    ?
                                    currentMovieDetail.genres.map(genre => (
                                        <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                    ))
                                    :
                                    ""
                            }
                        </div>


                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="overviewText">Overview</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>

                </div>
            </div>


            <div className="crew__heading">Crews</div>
            <div className="crew">

                {currentMovieCrewDetail && currentMovieCrewDetail.map(crew => (
                    <div key={crew.id}>
                    <span className="crewImage">
                        <img className="movie__crewImage"
                             src={"https://image.tmdb.org/t/p/original" + crew.profile_path}
                             alt={crew.name}
                        />
                        <span>{crew.name}</span>
                    </span>
                    </div>))}
            </div>
        </div>
    )
}

export default Movie
