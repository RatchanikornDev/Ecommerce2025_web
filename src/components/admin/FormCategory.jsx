import React, { useState, useEffect } from 'react';
import { createCategory, removeCategory } from '../../api/Category';
import useEcomStore from '../../store/ecom-store';
import { toast } from 'react-toastify';
import { Plus, Trash2, Tag } from 'lucide-react';

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState('');
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.warning('กรุณากรอกชื่อหมวดหมู่');
    }
    try {
      const res = await createCategory(token, { name });
      toast.success(`เพิ่มหมวดหมู่ ${res.data.name} สำเร็จ!`);
      setName(''); // Clear input after success
      getCategory(token);
    } catch (err) {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      console.log(err);
    }
  };

  const handleRemove = async (id, categoryName) => {
    if (window.confirm(`คุณต้องการลบหมวดหมู่ "${categoryName}" ใช่หรือไม่?`)) {
      try {
        const res = await removeCategory(token, id);
        toast.success(`ลบหมวดหมู่ ${res.data.name} สำเร็จ`);
        getCategory(token);
      } catch (err) {
        toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        console.log(err);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-semibold text-gray-800">จัดการหมวดหมู่สินค้า</h1>
        </div>

        {/* Add Category Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ชื่อหมวดหมู่ใหม่..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              เพิ่มหมวดหมู่
            </button>
          </div>
        </form>

        {/* Categories List */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-700 mb-4">รายการหมวดหมู่ทั้งหมด</h2>
          {categories.length === 0 ? (
            <p className="text-gray-500 text-center py-4">ยังไม่มีหมวดหมู่</p>
          ) : (
            <ul className="space-y-2">
              {categories.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  <span className="text-gray-700">{item.name}</span>
                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>ลบ</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCategory;