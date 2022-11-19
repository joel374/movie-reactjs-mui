import { Box, Button, Input, Paper, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import { color, Container, fontFamily } from "@mui/system"
import { useEffect, useState } from "react"
import { getAllMovies, searchMovie } from "./api"

function App() {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getAllMovies().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const renderMovie = () => {
    return popularMovies.map((movie, i) => {
      return (
        <Grid item lg="4" md="6" xs="12">
          <Box
            width={"100%"}
            sx={{ backgroundColor: "white", color: "black" }}
            borderRadius={"5px"}
          >
            <img
              src={`${process.env.REACT_APP_API_IMAGE_URL}/${movie.poster_path}`}
              width="360px"
            />
            <Box p="15px">
              <Typography
                fontSize={"20px"}
                fontWeight="bold"
                height="60px"
                mb="3px"
              >
                {movie.title}
              </Typography>
              <Typography>{movie.release_date}</Typography>
              <Typography fontWeight={"bold"}>{movie.vote_average}</Typography>
            </Box>
          </Box>
        </Grid>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 1) {
      const findMovie = await searchMovie(q)
      setPopularMovies(findMovie.results)
    }
  }

  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={{ color: "white", border: "1px solid black" }}
      >
        <Box
          p={"10px"}
          textAlign="center"
          display={"flex"}
          justifyContent="space-between"
        >
          <Typography fontSize={"20px"} fontWeight="bold" my={"auto"}>
            Jo Movies
          </Typography>
          <Input
            id="outlined-basic"
            label="Seacrh"
            variant="outlined"
            sx={{ color: "white" }}
            onChange={({ target }) => search(target.value)}
          />
        </Box>

        <Grid
          container
          border="1px solid black"
          marginTop={"20px"}
          p="20px "
          spacing={"15px"}
        >
          {renderMovie()}
        </Grid>
      </Container>
    </Box>
  )
}

export default App
