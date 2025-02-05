import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store' // ใช้ Zustand Store สำหรับจัดการสถานะ
import { createProduct, deleteProduct, updateProduct } from '../../api/product' // ฟังก์ชัน API สำหรับจัดการสินค้า
import { toast } from 'react-toastify' // ใช้สำหรับแสดงข้อความแจ้งเตือน
import Uploadfile from './Uploadfile' // คอมโพเนนต์สำหรับอัปโหลดไฟล์
import { Link } from 'react-router-dom' // ใช้สำหรับลิงก์ไปยังหน้าอื่น
import { Pencil, Trash2 } from 'lucide-react' // ไอคอนสำหรับแก้ไขและลบ
import {numberFormat} from '../../utils/number'
import { dateFormat } from '../../utils/dateformat'
// กำหนดค่าเริ่มต้นของฟอร์มสินค้า
const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: '',
  images: [],
}

const FormProduct = () => {
  // ดึงข้อมูลจาก Zustand Store
  const token = useEcomStore((state) => state.token) // Token สำหรับการยืนยันตัวตน
  const getCategory = useEcomStore((state) => state.getCategory) // ฟังก์ชันดึงหมวดหมู่สินค้า
  const categories = useEcomStore((state) => state.categories) // รายการหมวดหมู่สินค้า
  const getProduct = useEcomStore((state) => state.getProduct) // ฟังก์ชันดึงข้อมูลสินค้า
  const products = useEcomStore((state) => state.products) // รายการสินค้าทั้งหมด

  // ใช้ useState สำหรับจัดการสถานะฟอร์มสินค้า
  const [form, setForm] = useState(initialState)

  // ใช้ useEffect เพื่อดึงหมวดหมู่และข้อมูลสินค้าเมื่อคอมโพเนนต์โหลดครั้งแรก
  useEffect(() => {
    getCategory() // ดึงข้อมูลหมวดหมู่สินค้า
    getProduct(100) // ดึงข้อมูลสินค้า (100 รายการ)
  }, [])

  // ฟังก์ชันจัดการการเปลี่ยนแปลงค่าฟอร์ม
  const handleOnchange = (e) => {
    setForm({
      ...form, // ค่าที่มีอยู่ในฟอร์ม
      [e.target.name]: e.target.value, // อัปเดตค่าตาม name และ value
    })
  }

  // ฟังก์ชันจัดการเมื่อส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault() // ป้องกันการ reload หน้า
    try {
      // เรียกใช้ API เพื่อสร้างสินค้า
      const res = await createProduct(token, form)
      setForm(initialState) // รีเซ็ตฟอร์ม
      getProduct() // อัปเดตข้อมูลสินค้า
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`) // แสดงข้อความแจ้งเตือน
    } catch (err) {
      console.error(err) // แสดงข้อผิดพลาดใน console
    }
  }

  // ฟังก์ชันจัดการลบสินค้า
  const handleDelete = async (id) => {
    if (window.confirm('คุณแน่ใจจะลบสินค้านี้หรือไม่?')) {
      try {
        // เรียกใช้ API เพื่อลบสินค้า
        const res = await deleteProduct(token, id)
        console.log(res);
        toast.success('ลบสินค้าเรียบร้อยแล้ว') // แสดงข้อความแจ้งเตือน
        getProduct() // อัปเดตข้อมูลสินค้า
      } catch (err) {
        console.error(err) // แสดงข้อผิดพลาดใน console
      }
    }
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* หัวข้อฟอร์ม */}
        <h1 className="text-2xl font-bold text-gray-700">เพิ่มข้อมูลสินค้า</h1>

        {/* ฟิลด์สำหรับกรอกชื่อสินค้า */}
        <div>
          <label className="block text-gray-600 mb-2">ชื่อสินค้า</label>
          <input
            className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.title}
            onChange={handleOnchange}
            placeholder="Title"
            name="title"
          />
        </div>

        {/* ฟิลด์สำหรับกรอกรายละเอียดสินค้า */}
        <div>
          <label className="block text-gray-600 mb-2">รายละเอียด</label>
          <input
            className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.description}
            onChange={handleOnchange}
            placeholder="Description"
            name="description"
          />
        </div>

        {/* ฟิลด์สำหรับกรอกข้อมูลราคาและจำนวน */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-2">ราคา</label>
            <input
              type="number"
              className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.price}
              onChange={handleOnchange}
              placeholder="Price"
              name="price"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">จำนวน</label>
            <input
              type="number"
              className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.quantity}
              onChange={handleOnchange}
              placeholder="Quantity"
              name="quantity"
            />
          </div>
        </div>

        {/* Dropdown เลือกหมวดหมู่สินค้า */}
        <div>
          <label className="block text-gray-600 mb-2">หมวดหมู่</label>
          <select
            className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="categoryId"
            onChange={handleOnchange}
            required
            value={form.categoryId}
          >
            <option value="" disabled>
              Please Select
            </option>
            {categories?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* อัปโหลดไฟล์ */}
        <Uploadfile form={form} setForm={setForm} />

        {/* ปุ่มส่งฟอร์ม */}
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-md"
        >
          เพิ่มสินค้า
        </button>

        {/* ตารางแสดงรายการสินค้า */}
        <h2 className="text-xl font-semibold mt-10 text-gray-700">สินค้าทั้งหมด</h2>
        <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-3">No.</th>
              <th className="border p-3">รูปภาพ</th>
              <th className="border p-3">ชื่อสินค้า</th>
              <th className="border p-3">รายละเอียด</th>
              <th className="border p-3">ราคา</th>
              <th className="border p-3">จำนวน</th>
              <th className="border p-3">จำนวนที่ขายได้</th>
              <th className="border p-3">วันที่อัปเดต</th>
              <th className="border p-3">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                <td className="border p-3 text-center">{index + 1}</td>
                <td className="border p-3 text-center">
                  {item.images.length > 0 ? (
                    <img
                      className="w-20 h-20 rounded-md shadow-md"
                      src={item.images[0].url}
                      alt="product"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-md shadow-md">
                      No Image
                    </div>
                  )}
                </td>
                <td className="border p-3 text-center">{item.title}</td>
                <td className="border p-3">{item.description}</td>
                <td className="border p-3 text-center">{numberFormat(item.price)}</td>
                <td className="border p-3 text-center">{item.quantity}</td>
                <td className="border p-3 text-center">{item.sold}</td>
                <td className="border p-3 text-center">{dateFormat(item.updatedAt)}</td>
                <td className="border p-3 flex justify-center gap-2">
                  {/* ลิงก์ไปแก้ไขสินค้า */}
                  <Link to={`/admin/product/${item.id}`} className="text-blue-500">
                    <Pencil />
                  </Link>
                  {/* ปุ่มลบสินค้า */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  )
}

export default FormProduct