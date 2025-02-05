//rafce
import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react'
import useEcomStore from '../../store/ecom-store'
import { Link } from "react-router-dom"
import { numberFormat } from '../../utils/number'

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts)
  const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
  const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

  return (
    
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-green-700">🛒 ตะกร้าสินค้า</h1>

      <div className="border p-4 rounded-lg shadow-md bg-white">
        {carts.length === 0 ? (
          <p className="text-center text-gray-500">ตะกร้าว่างเปล่า</p>
        ) : (
          carts.map((item, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md shadow-sm mb-4 hover:shadow-md transition duration-300">
              {/* Row 1 */}
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center truncate">
                  {item.images && item.images.length > 0 ? (
                    <img className="w-20 h-20 rounded-md object-cover" src={item.images[0].url} alt={item.title} />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">No Image</div>
                  )}
                  <div>
                    <p className="font-semibold text-lg truncate">{item.title}</p>
                    <p className="text-sm text-gray-500 truncate">{item.description}</p>
                    <p className="text-sm text-blue-500 mt-1">ราคา: {numberFormat(item.price)}</p>
                  </div>
                </div>

                <button
                  onClick={() => actionRemoveProduct(item.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition duration-300"
                  aria-label="Remove Item"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* Row 2: Quantity Control */}
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center border rounded-lg px-2 py-1 bg-white shadow-sm">
                  <button
                    onClick={() => actionUpdateQuantity(item.id, Math.max(item.count - 1, 1))}
                    className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    aria-label="Decrease Quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-semibold">{item.count}</span>
                  <button
                    onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                    className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    aria-label="Increase Quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="font-bold text-green-600">
                  {numberFormat(item.price * item.count)}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Total */}
        {carts.length > 0 && (
          <>
            <div className="flex justify-between items-center mt-4 border-t pt-2 text-xl font-bold text-green-700">
              <span>รวมทั้งหมด</span>
              <span>{numberFormat(getTotalPrice())}</span>
            </div>

            {/* Checkout Button */}
            <Link to="/cart">
              <button
                className="mt-4 bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-md shadow-md transition transform hover:scale-105"
              >
                ดำเนินการชำระเงิน
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default CartCard