import axios from "axios"

const base_url = process.env.REACT_APP_API_URL
const api_key = process.env.REACT_APP_API_KEY

export const getAllMovies = async () => {
  const movie = await axios.get(`${base_url}/movie/popular?api_key=${api_key}`)

  return movie.data.results
}
export const searchMovie = async (q) => {
  const movie = await axios.get(
    `${base_url}/search/movie?query=${q}&api_key=${api_key}`
  )
  return movie.data
}
