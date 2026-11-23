import Header from './components/Header'
import Catalog from './components/Catalog'
import Cart from './components/Cart'

const App = () => (
  <div className="min-h-screen bg-paper text-ink">
    <Header />
    <main className="mx-auto grid max-w-5xl border-x-4 border-b-4 border-ink md:grid-cols-[2fr_1fr]">
      <Catalog />
      <Cart />
    </main>
    <footer className="mx-auto max-w-5xl px-4 py-5 text-xs text-gray-600">
      Week 10 · Redux Toolkit · Shared state with slices, selectors, and actions
    </footer>
  </div>
)

export default App
