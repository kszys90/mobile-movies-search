const API_KEY = process.env.REACT_APP_API_KEY || 'df031d61'

export const searchData = (searchedPhrase: string) => {
  return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchedPhrase}`)
    .then((r) => r.json())
    .then((data) => data.Search)
}
