
export const moviesApi = { //innkaplse moviesApi, 
  onAddMovie: async (m) => {
    await fetch("/api/movies", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(m)
    })
  },

  listMovies: async () => {
   const res = await fetch("/api/movies");
  return res.json()
  }
} 