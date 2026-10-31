const BookList = ({books}) => {
  if (books.length === 0) {
    return <p className="mt-8 text-gray-500">Nothing on the list yet.</p>
  }

  return (
    <ul className="mt-8 divide-y divide-gray-200">
      {books.map((book) => (
        <li key={book.id} className="py-3">
          <p className="font-semibold">
            {book.title}
            {book.finished && <span className="ml-2 text-green-700">done</span>}
          </p>
          <p className="text-sm text-gray-600">
            {book.author} · {book.format} · {book.pages} pages · rated {book.rating}/5
          </p>
          {book.dateStarted && (
            <p className="text-sm text-gray-500">started {book.dateStarted}</p>
          )}
          {book.notes && (
            <p className="mt-1 whitespace-pre-wrap text-sm">{book.notes}</p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default BookList
