import React from "react";

interface LessonRequestFormProps {
  topic: string;
  loading: boolean;
  onTopicChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LessonRequestForm({
  topic,
  loading,
  onTopicChange,
  onSubmit,
}: LessonRequestFormProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Yeni Talep Oluştur
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Konu Başlığı
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            disabled={loading}
            placeholder="Örn: .Net Core"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading ? " İşleniyor..." : " Talep Gönder"}
        </button>
      </form>
    </div>
  );
}
