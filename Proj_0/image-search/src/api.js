import axios from 'axios'

const KEY = import.meta.env.VITE_UNSPLASH_KEY

const searchImages = async (query) => {
  if (!KEY) {
    throw new Error('Unsplash access key is missing. Set VITE_UNSPLASH_KEY in .env.local and restart Vite.')
  }

  const response = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      Authorization: `Client-ID ${KEY}`, // use `` to embed the variable
    },
    params: {query},
  })

  return response.data.results
}

export default searchImages
