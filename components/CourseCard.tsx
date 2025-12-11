import React from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  instructorName: string;
  price: number;
}

interface CourseCardProps {
  course: Course;
  isPurchased: boolean;
  loading: boolean;
  onPurchase: (courseId: number) => void;
}

export default function CourseCard({
  course,
  isPurchased,
  loading,
  onPurchase,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
      <p className="text-gray-600 mb-3">{course.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">{course.instructorName}</span>
        <span className="text-2xl font-bold text-blue-600">
          ₺{course.price}
        </span>
      </div>
      <button
        onClick={() => onPurchase(course.id)}
        disabled={loading || isPurchased}
        className={`w-full py-2 rounded font-semibold transition ${
          isPurchased
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isPurchased ? " Satın Alındı" : " Satın Al"}
      </button>
    </div>
  );
}
