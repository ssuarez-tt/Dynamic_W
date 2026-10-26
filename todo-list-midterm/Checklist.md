## What is your app for?

This app is a reading list for books I want to finish. It keeps track of where
I stopped in each book, so I can pick up reading again without having to
remember the page.

## User story

As a reader who is working through several books, I want to save the current
page for each book, so that I can quickly continue from where I left off.

## Developer checklist

- [x] Decide that the new field is `currentPage` and that a new book starts at
  page `0`.
- [x] Add `totalPages` when creating a book and allow it to be edited.
- [x] Send the updated book to JSON Server with `PATCH`.
- [x] Update the React Context state with the response returned by the server.
- [x] Show a useful error if saving the page fails, and restore the previous
  value in the input.
- [x] Reject invalid page values (negative, decimal, or beyond total pages)
  before changing server data.
- [x] Add a `totalPages` field for each book and show progress using
  `currentPage` and `totalPages`.
- [x] Use a reducer to apply server-returned todo states consistently.
- [x] Use responsive spacing and stack the create form and book rows on narrow
  screens.
- [x] Test on a narrow mobile viewport and adjust any remaining overflow or
  touch-target issues.
- [x] Reload the app and confirm the saved page and total page count persist.
- [x] Add an editable note field for every book.
