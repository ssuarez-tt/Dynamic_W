// useEffect form: none
// This page has no document event listener, so no useEffect is needed.
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">404 — Page Not Found</h1>
      <p className="mb-6">The page you requested does not exist.</p>
      <Link to="/" className="text-blue-600 underline">Go back home</Link>
    </main>
  )
}

export default NotFoundPage
