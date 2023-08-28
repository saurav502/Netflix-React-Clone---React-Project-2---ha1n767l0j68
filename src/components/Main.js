import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPlayFill } from "react-icons/bs";

function Home() {
  const [movies, setMovies] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const upcomingMovies = await fetchMovies(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=82f112e2551f5794e06374be9d493cad&language=en-US&page=1"
      );
      const popularMovies = await fetchMovies(
        "https://api.themoviedb.org/3/movie/popular?api_key=82f112e2551f5794e06374be9d493cad&language=en-US&page=1"
      );
      const nowPlayingMovies = await fetchMovies(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=82f112e2551f5794e06374be9d493cad&language=en-US&page=1"
      );
      const highRatedMovies = await fetchMovies(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=82f112e2551f5794e06374be9d493cad&language=en-US&page=1"
      );
      const trendingMovies = await fetchMovies(
        "https://api.themoviedb.org/3/trending/all/day?api_key=82f112e2551f5794e06374be9d493cad"
      );

      setMovies({
        Trending: trendingMovies,
        Upcoming: upcomingMovies,
        Popular: popularMovies,
        NowPlaying: nowPlayingMovies,
        HighRated: highRatedMovies,
      });

      const allMovies = [
        ...trendingMovies,
        ...upcomingMovies,
        ...popularMovies,
        ...nowPlayingMovies,
        ...highRatedMovies,
      ];

      const randomIndex = Math.floor(Math.random() * allMovies.length);
      setSelectedMovie(allMovies[randomIndex]);
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div className="w-full h-full relative">
        {selectedMovie && (
          <div className="selected-movie  bg-gradient-to-l from-zinc-300">
            <img
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`}
              alt={selectedMovie.title}
              className="w-full h-auto object-cover mix-blend-overlay"
            />
            <div className="">
              <h3 className="font-bold  absolute top-1/2 left-28 text-red-600 text-left text-5xl w-[40%]">
                {selectedMovie.title}
              </h3>
              <p className="text-xl mt-8 absolute top-[57%] left-28 text-white w-[40%] text-left">
                {selectedMovie.overview}
              </p>
            </div>
            {/* <div className="">
              <button className="flex font-semibold items-center absolute top-[78%] left-28 border px-6 bg-white text-black py-2 rounded text-2xl">
                <BsPlayFill />
                Play
              </button>
            </div> */}
          </div>
        )}
      </div>

      <div className="mt-4">
        {Object.keys(movies).map((key) => (
          <div key={key}>
            <h2 className="text-xl font-bold max-w-[1700px] m-auto bg-transparent mt-4 mb-4">
              {key.replace(/([a-z])([A-Z])/g, "$1 $2")}{" "}
              {/* Insert space between camel case words */}
            </h2>
            <div className="movie-list grid grid-cols-8 gap-4 max-w-[1700px] m-auto">
              {movies[key].map((movie) => (
                <div className="movie-card" key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded h-64 transition-all duration-500 transform hover:scale-125"
                  />
                  <p className="break-words hidden">{movie.overview}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
