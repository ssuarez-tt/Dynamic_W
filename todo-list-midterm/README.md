# Reading List

## What this app is for

Reading List helps readers keep track of books they want to finish, the page
they have reached, and a note for each book. It is useful for anyone reading
several books and wanting to pick up where they left off.

## User story

As a reader who is working through several books, I want to save the current
page, total page count, and a note for each book, so that I can see my progress,
remember reading details, and quickly continue.

## Run the app

Use two PowerShell terminals, both opened in the `todo-list-midterm` project
directory.

Terminal 1 starts the local JSON Server API:

```powershell
npm run server
```

Terminal 2 starts the Vite development server:

```powershell
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. The API is
served locally at `http://localhost:3001`; JSON Server stores the books in
`db.json`.

## Why this app uses Context

The app uses React Context because the reading list, filter, and book actions
are needed by several components at different levels: the page, create form,
list, and individual book rows. Context keeps those shared values and actions
in one Provider instead of threading them through each component as props.
The row still receives its own book as a prop from the list, because that is
local display data and passing it directly keeps the component boundary clear.
For a much smaller tree, props would be simpler; Context is useful here because
the same actions are consumed by multiple parts of the interface.
