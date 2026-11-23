# Week 11 Art Collection

A Redux Toolkit art collection app. Add pieces with a name and price, search
and sort the collection, delete individual pieces, and view the count and total
value of the visible results.

## Run locally

```powershell
npm install
npm run dev
```

## State and derived data

- `form` stores the name and price currently being entered.
- `art` stores the collection, search term, and selected price sort order.
- Adding a piece dispatches one `addArt` action. `formSlice` listens to that
  action with `extraReducers` and clears its fields.
- `selectVisibleArt` derives the case-insensitive search results and sort order.
  The visible count and total value are selectors derived from that list; they
  are not duplicate state.
- The chosen sort order is state because the user controls it; the sorted array
  is derived and is not stored.
- The clear-confirmation prompt uses local component state because it is a
  temporary interface choice, not collection data.

The Week11 homework additions are implemented: visible piece count, price sort,
and a confirmed clear-collection action.
