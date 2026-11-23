import {useSelector} from 'react-redux'
import {selectCartCount, selectCartTotal} from '../features/cartSlice'
import {selectFavouriteCount} from '../features/favouritesSlice'

const Header = () => {
  const count = useSelector(selectCartCount)
  const total = useSelector(selectCartTotal)
  const favouriteCount = useSelector(selectFavouriteCount)

  return (
    <header className="border-b-4 border-ink">
      <div className="mx-auto flex max-w-5xl items-stretch border-x-4 border-ink">
        <h1 className="flex-1 px-5 py-4 text-xl font-black uppercase tracking-tight sm:text-2xl">
          Bauhaus Prints
        </h1>
        <div className="flex w-20 flex-col items-center justify-center border-l-4 border-ink bg-flat-yellow px-2 text-center">
          <span className="text-xl font-black">{count}</span>
          <span className="text-[10px] font-bold uppercase">Cart</span>
        </div>
        <div className="flex w-24 flex-col items-center justify-center border-l-4 border-ink bg-flat-blue px-2 text-paper">
          <span className="text-lg font-black">${total}</span>
          <span className="text-[10px] font-bold uppercase">Total</span>
        </div>
        <div className="flex w-20 flex-col items-center justify-center border-l-4 border-ink bg-flat-red px-2 text-paper">
          <span className="text-xl font-black">{favouriteCount}</span>
          <span className="text-[10px] font-bold uppercase">Saved</span>
        </div>
      </div>
    </header>
  )
}

export default Header
