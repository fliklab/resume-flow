"use client";

import React, { useState } from "react";
import { Resume } from "@/lib/types/resume";

interface ResumeFormProps {
  resumeData: Resume;
  onUpdate: (updatedResume: Resume) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, onUpdate }) => {
  const [formData, setFormData] = useState<Resume>(resumeData);

  const handleChange = (section: string, field: string, value: string) => {
    // 중첩 객체 업데이트 (간단한 구현)
    if (section === "basics") {
      setFormData({
        ...formData,
        basics: {
          ...formData.basics,
          [field]: value,
        },
      });
    }

    // 실제 구현에서는 더 복잡한 업데이트 로직 필요
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-medium mb-4">기본 정보</h2>

        <div className="grid grid-cols-1 gap-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              value={formData.basics.name}
              onChange={(e) => handleChange("basics", "name", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              직함
            </label>
            <input
              type="text"
              id="label"
              value={formData.basics.label || ""}
              onChange={(e) => handleChange("basics", "label", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={formData.basics.email || ""}
              onChange={(e) => handleChange("basics", "email", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              요약
            </label>
            <textarea
              id="summary"
              value={formData.basics.summary || ""}
              onChange={(e) =>
                handleChange("basics", "summary", e.target.value)
              }
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* 기본 정보 외 다른 섹션들은 실제 구현 시 추가 */}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          저장하기
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;
