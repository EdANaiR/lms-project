"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import PurchasedCourseCard from "@/components/PurchasedCourseCard";
import LessonRequestForm from "@/components/LessonRequestForm";
import RequestsList from "@/components/RequestsList";
import ProtectedRoute from "@/components/ProtectedRoute";

interface User {
  id: number;
  username: string;
  role: "user" | "instructor" | "admin";
  wallet: number;
  purchasedCourseIds: number[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructorName: string;
  price: number;
}

interface MatchRequest {
  id: number;
  studentId: number;
  topic: string;
  status: "pending" | "matched";
  assignedInstructorId?: number;
  assignedInstructorName?: string;
  notificationSent?: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "courses" | "purchased" | "lessons"
  >("courses");
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [matchRequests, setMatchRequests] = useState<MatchRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [topic, setTopic] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const userData: User = JSON.parse(storedUser);
    setUser(userData);

    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/data");
        const data = await response.json();

        if (response.ok) {
          setCourses(data.courses);
          setMatchRequests(data.matchRequests);
        }
      } catch (error) {
        console.error("Veri yükleme hatası:", error);
      }
    };

    fetchData();
  }, [router]);

  const handlePurchase = async (courseId: number) => {
    if (!user) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/courses/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, courseId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Satın alma başarısız");
        setMessageType("error");
        setLoading(false);
        return;
      }

      setModalMessage(data.message);
      setShowModal(true);

      const updatedUser = {
        ...user,
        wallet: data.remainingBalance,
        purchasedCourseIds: data.user.purchasedCourseIds,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setTimeout(() => {
        setShowModal(false);
        setMessage("");
      }, 3000); // 3 saniye sonra modalı kapatır
    } catch (error) {
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLessonRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !topic.trim()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/match/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: user.id, topic }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Talep gönderilemedi");
        setMessageType("error");
        setLoading(false);
        return;
      }

      const newRequest = data.matchDetails;
      const updatedRequests = [...matchRequests, newRequest];
      setMatchRequests(updatedRequests);
      localStorage.setItem("matchRequests", JSON.stringify(updatedRequests));

      setModalMessage(data.message);
      setShowModal(true);
      setTopic("");

      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    } catch (error) {
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("matchRequests");
    router.push("/login");
  };

  if (!user) {
    return <div className="text-center mt-20">Yükleniyor...</div>;
  }

  const purchasedCourses = courses.filter((c) =>
    user.purchasedCourseIds.includes(c.id)
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ana Sayfa</h1>
              <p className="text-sm text-gray-600 mt-1">
                Hoşgeldiniz, <strong>{user.username}</strong> (
                {user.role === "user"
                  ? "Öğrenci"
                  : user.role === "instructor"
                  ? "Eğitmen"
                  : "Admin"}
                )
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Cüzdan Bakiyesi</p>
                <p className="text-2xl font-bold text-green-600">
                  ₺{user.wallet}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex gap-4 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === "courses"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-800"
              }`}
            >
              Tüm Eğitimler
            </button>
            <button
              onClick={() => setActiveTab("purchased")}
              className={`px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === "purchased"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-800"
              }`}
            >
              Satın Aldığım Eğitimler ({purchasedCourses.length})
            </button>
            <button
              onClick={() => setActiveTab("lessons")}
              className={`px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === "lessons"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-800"
              }`}
            >
              Canlı Ders Talep Et ({matchRequests.length})
            </button>
          </div>
          {message && (
            <div
              className={`mb-4 p-4 rounded-lg ${
                messageType === "error"
                  ? "bg-red-100 text-red-700 border border-red-400"
                  : "bg-green-100 text-green-700 border border-green-400"
              }`}
            >
              {message}
            </div>
          )}
          {activeTab === "courses" && ( //Eğitimler
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => {
                const isPurchased = user.purchasedCourseIds.includes(course.id);
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isPurchased={isPurchased}
                    loading={loading}
                    onPurchase={handlePurchase}
                  />
                );
              })}
            </div>
          )}
          {activeTab === "purchased" && ( //Satın alınana eğitimler
            <div>
              {purchasedCourses.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                  <p className="text-gray-600">
                    Henüz hiç eğitim satın almadınız. "Tüm Eğitimler"
                    sekmesinden başlayabilirsiniz.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {purchasedCourses.map((course) => (
                    <PurchasedCourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "lessons" && ( //Canlı Ders Talep Oluşturma
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <LessonRequestForm
                  topic={topic}
                  loading={loading}
                  onTopicChange={setTopic}
                  onSubmit={handleLessonRequest}
                />
              </div>

              <div className="lg:col-span-2">
                <RequestsList matchRequests={matchRequests} />
              </div>
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Başarılı!
              </h2>
              <p className="text-gray-700">{modalMessage}</p>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
