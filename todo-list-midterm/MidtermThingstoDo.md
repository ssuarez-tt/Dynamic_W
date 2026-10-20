# Midterm Project

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
- [x] Send the updated book to JSON Server with `PATCH`.
- [x] Update the React Context state with the response returned by the server.
- [x] Show a useful error if saving the page fails, and keep the previous value.
- [ ] Reload the app and confirm the saved page is still there.
- [ ] Try an invalid page value and confirm it is rejected without changing the
  server data.

## Mobile checklist

- [ ] Use responsive spacing and heading sizes for narrow screens.
- [ ] Stack the book-entry form and each reading-list row on small screens.
- [ ] Test on a narrow mobile viewport and adjust any remaining overflow or
  touch-target issues.
