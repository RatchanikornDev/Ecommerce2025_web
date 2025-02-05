import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import {
    createProduct,
    readProduct,
    listProduct,
    updateProduct
} from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'

// กำหนดค่าเริ่มต้นของฟอร์ม
const initialState = {
    title: "Core i7",
    description: "desc",
    price: 200,
    quantity: 20,
    categoryId: '',
    images: []
}

const FormEditProduct = () => {
    const { id } = useParams() // ดึง ID ของสินค้าจาก URL
    const navigate = useNavigate() // ใช้สำหรับเปลี่ยนเส้นทางหน้า

    const token = useEcomStore((state) => state.token) // รับ token จาก store
    const getCategory = useEcomStore((state) => state.getCategory) // ดึงฟังก์ชัน getCategory จาก store
    const categories = useEcomStore((state) => state.categories) // ดึงหมวดหมู่สินค้าจาก store

    const [form, setForm] = useState(initialState) // สร้าง state สำหรับฟอร์ม

    useEffect(() => {
        getCategory() // เรียกใช้เพื่อโหลดหมวดหมู่สินค้า
        fetchProduct(token, id) // ดึงข้อมูลสินค้าตาม ID
    }, [])

    const fetchProduct = async (token, id) => {
        try {
            const res = await readProduct(token, id) // เรียก API เพื่อดึงข้อมูลสินค้า
            console.log('res from backend', res)
            setForm(res.data) // ตั้งค่าฟอร์มด้วยข้อมูลที่ได้
        } catch (err) {
            console.log('Err fetch data', err)
        }
    }
    console.log(form)

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value // อัปเดตค่าของฟอร์มเมื่อมีการเปลี่ยนแปลง
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProduct(token, id, form) // อัปเดตสินค้าในฐานข้อมูล
            console.log(res)
            toast.success(`แก้ไขข้อมูล ${res.data.title} สำเร็จ`) // แสดงข้อความสำเร็จ
            navigate('/admin/product') // ย้ายไปหน้ารายการสินค้า
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-4">แก้ไขข้อมูลสินค้า</h1>

                {/* Input สำหรับชื่อสินค้า */}
                <label className="block mb-2 font-medium">ชื่อสินค้า</label>
                <input
                    className='w-full border rounded-md p-2 mb-4'
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder='ชื่อสินค้า'
                    name='title'
                />

                {/* Input สำหรับคำอธิบายสินค้า */}
                <label className="block mb-2 font-medium">คำอธิบาย</label>
                <textarea
                    className='w-full border rounded-md p-2 mb-4'
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder='คำอธิบาย'
                    name='description'
                />

                {/* Input สำหรับราคา */}
                <label className="block mb-2 font-medium">ราคา</label>
                <input
                    type='number'
                    className='w-full border rounded-md p-2 mb-4'
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder='ราคา'
                    name='price'
                />

                {/* Input สำหรับจำนวนสินค้า */}
                <label className="block mb-2 font-medium">จำนวนสินค้า</label>
                <input
                    type='number'
                    className='w-full border rounded-md p-2 mb-4'
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder='จำนวน'
                    name='quantity'
                />

                {/* Dropdown สำหรับเลือกหมวดหมู่ */}
                <label className="block mb-2 font-medium">หมวดหมู่</label>
                <select
                    className='w-full border rounded-md p-2 mb-4'
                    name='categoryId'
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled>กรุณาเลือกหมวดหมู่</option>
                    {categories.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))}
                </select>

                <hr className="my-4" />

                {/* ส่วนสำหรับอัปโหลดไฟล์ */}
                <Uploadfile form={form} setForm={setForm} />

                {/* ปุ่มบันทึก */}
                <button className="bg-sky-800 text-white p-2 rounded-md mt-4">บันทึกการแก้ไข</button>
            </form>
        </div>
    )
}

export default FormEditProduct