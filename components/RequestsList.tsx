import React from "react";

interface MatchRequest {
  id: number;
  studentId: number;
  topic: string;
  status: "pending" | "matched";
  assignedInstructorId?: number;
  assignedInstructorName?: string;
  notificationSent?: boolean;
}

interface RequestsListProps {
  matchRequests: MatchRequest[];
}

export default function RequestsList({ matchRequests }: RequestsListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Taleplerim ({matchRequests.length})
      </h3>
      {matchRequests.length === 0 ? (
        <p className="text-gray-600">Henüz talep oluşturmadınız.</p>
      ) : (
        <div className="space-y-4">
          {matchRequests.map((req, index) => (
            <div
              key={`${req.id}-${req.studentId}-${index}`}
              className={`border-l-4 p-4 rounded ${
                req.status === "matched"
                  ? "bg-green-50 border-green-500"
                  : "bg-yellow-50 border-yellow-500"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Konu: {req.topic}
                  </h4>
                  {req.status === "matched" && (
                    <p className="text-sm text-green-700 mt-1">
                      Atanan Eğitmen:{" "}
                      <strong>{req.assignedInstructorName}</strong>
                    </p>
                  )}
                  {req.notificationSent && (
                    <p className="text-xs text-gray-500 mt-1">
                      Eğitmene bildirim gönderildi
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
