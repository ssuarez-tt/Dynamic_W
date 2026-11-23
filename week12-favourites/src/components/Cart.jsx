import {useDispatch, useSelector} from 'react-redux'
import {
  cartCleared,
  itemRemoved,
  quantityDecreased,
  quantityIncreased,
  selectCartItems,
  selectCartTotal,
} from '../features/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  return (
    <aside className="border-t-4 border-ink md:border-l-4 md:border-t-0">
      <div className="flex items-center justify-between gap-2 border-b-4 border-ink bg-flat-red px-4 py-3 text-paper">
        <h2 className="text-sm font-black uppercase tracking-widest">Cart</h2>
        {items.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch(cartCleared())}
            className="min-h-11 px-2 text-xs font-bold uppercase underline"
          >
            Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="px-4 py-6 text-sm">Nothing in the cart.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="border-b-4 border-ink px-4 py-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="break-words text-sm font-black uppercase">{item.title}</p>
                  <button
                    type="button"
                    onClick={() => dispatch(itemRemoved(item.id))}
                    className="min-h-11 shrink-0 px-1 text-xs font-black uppercase underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.title} quantity`}
                    onClick={() => dispatch(quantityDecreased(item.id))}
                    className="min-h-11 min-w-11 border-4 border-ink text-lg font-black"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-black">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.title} quantity`}
                    onClick={() => dispatch(quantityIncreased(item.id))}
                    className="min-h-11 min-w-11 border-4 border-ink bg-flat-yellow text-lg font-black"
                  >
                    +
                  </button>
                  <span className="ml-auto text-sm font-black">
                    ${item.quantity * item.price}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="flex justify-between px-4 py-4 text-sm font-black uppercase">
            <span>Total</span>
            <span>${total}</span>
          </p>
        </>
      )}
    </aside>
  )
}

export default Cart
