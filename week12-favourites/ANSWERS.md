# Week 12 Assignment Answers

## 1. Favourite action type

The action type is `favourites/favouriteToggled`. Redux Toolkit combines the
slice name (`favourites`) with the reducer name (`favouriteToggled`) to create
that type string.

## 2. Why store favourite IDs?

The print catalogue is static module data, not state owned by this app. Storing
only IDs lets the favourites slice own the user's selection without copying or
modifying the catalogue; putting flags on prints would make Redux responsible
for maintaining a mutable copy of data it does not own.

## 3. Removing a favourited print from the catalogue

If a print is removed from `prints.js`, its ID remains in the favourites
array, so it no longer appears in the grid but is still included in the saved
count. A real application would remove that ID when deleting the print or
reconcile favourites against the current catalogue.
