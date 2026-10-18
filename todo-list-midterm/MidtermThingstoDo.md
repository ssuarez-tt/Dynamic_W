# Midterm Project

## What is your app for?

This app is a reading list for books I want to finish. It keeps track of where
I stopped in each book, so I can pick up reading again without having to
remember the page.

## User story

As a reader who is working through several books, I want to save the current
page for each book, so that I can quickly continue from where I left off.

## Developer checklist

- [ ] Decide that the new field is `currentPage` and that a new book starts at
  page `0`.
- [ ] Add `currentPage: 0` to the example records in `db.json`.
- [ ] Include `currentPage: 0` when creating a new book through the API.
- [ ] Add a controlled number input for the current page to each book row.
- [ ] Show the saved current page next to the book title.
- [ ] Let the reader change the page and save the change from the row.
- [ ] Validate that the page is a non-negative whole number before sending it.
- [ ] Send the updated book to JSON Server with `PATCH`, so changing the page
  does not replace the title or other fields.
- [ ] Update the React Context state with the response returned by the server.
- [ ] Show a useful error if saving the page fails, and keep the previous value.
- [ ] Reload the app and confirm the saved page is still there.
- [ ] Try an invalid page value and confirm it is rejected without changing the
  server data.
