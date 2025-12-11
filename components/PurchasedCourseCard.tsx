import React from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  instructorName: string;
  price: number;
}

interface PurchasedCourseCardProps {
  course: Course;
}

export default function PurchasedCourseCard({
  course,
}: PurchasedCourseCardProps) {
  return (
    <div className="bg-green-50 border-2 border-green-300 rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
      </div>
      <p className="text-gray-600 mb-3">{course.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{course.instructorName}</span>
        <span className="text-lg font-bold text-green-600">
          ₺{course.price}
        </span>
      </div>
      <button className="w-full mt-4 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition">
        Kursa Giriş Yap
      </button>
    </div>
  );
}
