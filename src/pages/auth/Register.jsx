import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'

//  Schema สำหรับตรวจสอบความถูกต้อง
const registerSchema = z
  .object({
    email: z.string().email({ message: 'กรุณากรอกอีเมลที่ถูกต้อง' }),
    password: z.string().min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
    confirmPassword: z.string().min(8, 'กรุณายืนยันรหัสผ่าน'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'รหัสผ่านไม่ตรงกัน',
    path: ['confirmPassword'],
  })

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const [passwordScore, setPasswordScore] = useState(0)

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }

  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        'https://ecommerce2025-api.vercel.app/api/register',
        data
      )
      toast.success('ลงทะเบียนสำเร็จ!')
      console.log(res.data)
      reset()
    } catch (err) {
      const errMsg =
        err.response?.data?.message || 'เกิดข้อผิดพลาดในการลงทะเบียน'
      toast.error(errMsg)
      console.error(err)
    }
  }

  // const tam = Array.from('tammmm')
  //   console.log(tam);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">สมัครสมาชิก</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            {...register('email')}
            className="border w-full p-2 rounded-md"
            type="email"
            placeholder="กรอกอีเมล"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            {...register('password')}
            className="border w-full p-2 rounded-md"
            type="password"
            placeholder="กรอกรหัสผ่าน"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {watch('password') && (
            <p
              className={`mt-1 text-sm ${
                passwordScore < 3 ? 'text-red-500' : 'text-green-500'
              }`}
            >
              ความแข็งแรงของรหัสผ่าน: {passwordScore}/4
            </p>
          )}
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            {...register('confirmPassword')}
            className="border w-full p-2 rounded-md"
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600"
        >
          สมัครสมาชิก
        </button>
      </form>
    </div>
  )
}
