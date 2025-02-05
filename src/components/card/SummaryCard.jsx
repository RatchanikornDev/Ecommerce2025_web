import React,{useState, useEffect} from 'react'
import { listUserCart , saveAddress } from '../../api/user'
import { Truck, Package, CreditCard } from 'lucide-react'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../utils/number'

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [address, setAddress] = useState('')
  const [addressSave, setAddressSave] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    hdlGetUserCart(token);
  }, []);

  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        // console.log(res)
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlSaveAddress = ()=>{
    console.log(address)
    if(!address){
      return toast.warning('Please fill address')
    }
    saveAddress(token,address)
    .then((res)=>{
    toast.success(res.data.message)
    setAddressSave(true)
  })
    .catch((err)=>{
    console.log(err);
  })
  }
  const hdlGoToPayment = ()=>{
    if(!addressSave)
      return toast.warning('โปรดกรอกที่อยู่')
    navigate('/user/payment')
  }


console.log(products);
  return (
    <div className="max-w-6xl mx-auto p-4 ">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Shipping Address Section */}
        <div className="flex-1">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                ที่อยู่ในการจัดส่ง
              </h2>
            </div>
            <textarea
            required
            onChange={(e)=>setAddress(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg min-h-[120px] mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="กรุณากรอกที่อยู่ในการจัดส่ง..."
            />
            <button 
            onClick={hdlSaveAddress}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transform transition-all duration-200 hover:shadow-md active:scale-95">
              บันทึกที่อยู่
            </button>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="flex-1">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                สรุปคำสั่งซื้อ
              </h2>
            </div>

            {/* Product Item */}

            {
              products.map((item,index)=>
              <div key={index} className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="font-medium text-gray-800">{item.product.title}</p>
                  <p className="text-gray-600 ">จำนวน: {item.count} x {numberFormat(item.product.price)}</p>
                </div>
                <p className="text-lg font-semibold text-blue-600">{numberFormat(item.count * item.product.price)}</p>
              </div>
            </div>
              )
            }
            

            {/* Cost Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <p>ค่าจัดส่ง</p>
                <p>฿0.00</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>ส่วนลด</p>
                <p>-฿0.00</p>
              </div>
            </div>

            {/* Total */}
            <div className="border-t py-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  <p className="font-semibold text-gray-800">ยอดรวมสุทธิ</p>
                  <p className="text-2xl font-bold text-blue-600">฿{numberFormat(cartTotal)}</p>
                </div>
              </div>
            </div>

            <div>
              <button 
              onClick={hdlGoToPayment}
              // disabled = {!addressSave}
              className="bg-green-600 w-full py-2 text-white text-xl p-2 
              rounded-md shadow-md hover:bg-green-700">
                ดำเนินการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
