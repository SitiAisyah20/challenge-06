import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/details.css";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../redux/actions/authActions";
import { fetchDetailMovie } from "../redux/actions/detailsActions";

function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { detailMovie, genre, backdropPath } = useSelector(
    (state) => state.detail
  );

  const getGenre = genre.genres?.map((gen) => {
    return <h5 className="genre mx-1">{gen.name}</h5>;
  });

  useEffect(() => {
    dispatch(fetchDetailMovie(id));
  }, [dispatch, id]); 

  useEffect(() => {
    dispatch(getMe(navigate, null, null));
  }, [dispatch, navigate]);

  const myStyle = {
    backgroundImage: `url(${backdropPath})`,
    height: "100vh",
    marginTop: "-70px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <Navbar />

      <div className="detailsPage" style={myStyle}>
        <div className="banner">
          <div className="details">
            <h1 className="movieTitle">{detailMovie.title}</h1>
            <p className="movieDescription">{detailMovie.overview}</p>

            <div style={{ marginBottom: "30px" }}></div>
            <hr style={{ opacity: "0.1" }}></hr>
            <div style={{ marginBottom: "15px" }}></div>

            <div
              className="d-flex justify-content-spacearound movieGenre"
              style={{ fontStyle: "italic" }}
            >
              {getGenre}
            </div>

            <div>
              <h4 className="movieRate">
                {"Rating: " + detailMovie?.vote_average?.toFixed(1)}
              </h4>
            </div>
            <div className="movieRelease">
              <h6>{"Release: " + detailMovie.release_date}</h6>
            </div>
            <div style={{ paddingBottom: "15px" }}></div>
          </div>

          <div>
            <img
              src={`https://image.tmdb.org/t/p/original${detailMovie.poster_path}`}
              alt="moviePoster"
              className="moviePoster "
            />
          </div>

          {/* <div className="trailer">
          <video src={`https://www.youtube.com/watch?v=${trailer.key}`} width={750} height={500} controls></video>
        </div> */}
        </div>
      </div>
    </>
  );
}

export default Details;
