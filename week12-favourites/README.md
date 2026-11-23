# Week 12 Favourites — Bauhaus Prints

A copy of the Week10 print shop, extended for the Week12 favourites
assignment. The catalogue, cart, favourites, and view filters share one Redux
store.

## Run locally

From this directory:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. Verify a production build with:

```powershell
npm run build
npm run preview
```

## Features

- Add prints to the cart; increase/decrease quantities, remove items, or clear
  the cart.
- Filter the catalog by colour or show favourites only.
- Combine active filters: favourites-only and a colour filter intersect.
- Toggle a star on each print; the header shows the favourite count.
- View cart item count and total.
- Inspect Redux actions and state using the Redux DevTools browser extension.

## Redux state

- `cart` owns cart items and their quantities.
- `favourites` owns an array of favourite print IDs.
- `ui` owns the selected colour filter and favourites-only view. These are
  independent filters; selecting both shows matching favourites in that
  colour.

The slices and selectors live under `src/features`. `Provider` connects the
store in `src/main.jsx`; components read using `useSelector` and update it via
`useDispatch`. The catalogue is static module data, so favourite status is
stored as IDs rather than by adding mutable flags to each print.
