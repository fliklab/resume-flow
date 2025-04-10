"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ResumeForm from "@/components/forms/ResumeForm";
import LayoutManager from "@/components/pdf/layout/LayoutManager";
import PDFDocument from "@/components/pdf/PDFDocument";
import { mockResumeData } from "@/data/mock/resume-data";
import { mockLayoutData } from "@/data/mock/layout-mock";
import { Resume } from "@/lib/types/resume";
import { LayoutConfig } from "@/lib/types/layout";

export default function EditPage() {
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [layoutData, setLayoutData] = useState<LayoutConfig | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "layout">("content");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제 환경에서는 API나 로컬 스토리지에서 데이터를 가져올 수 있음
    setResumeData(mockResumeData);
    setLayoutData(mockLayoutData);
    setIsLoading(false);
  }, []);

  const handleResumeUpdate = (updatedResume: Resume) => {
    setResumeData(updatedResume);
    // 실제 구현에서는 여기서 저장 로직 추가
  };

  const handleLayoutUpdate = (updatedLayout: LayoutConfig) => {
    setLayoutData(updatedLayout);
    // 실제 구현에서는 여기서 저장 로직 추가
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        로딩 중...
      </div>
    );
  }

  if (!resumeData || !layoutData) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        데이터를 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">이력서 편집</h1>
          <div className="flex space-x-4">
            <Link
              href="/preview"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              미리보기
            </Link>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              저장하기
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* 왼쪽 패널 - 미리보기 영역 */}
        <div className="w-full md:w-2/3 p-6 bg-gray-100 overflow-y-auto">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-medium mb-4">실시간 미리보기</h2>
            <div className="border rounded">
              <PDFDocument
                key={JSON.stringify(layoutData.elements)} // 레이아웃 데이터 변경이 반영되지 않는 경우가 있어서 강제로 key 값을 변경하여 재렌더링
                resumeData={resumeData}
                layoutConfig={layoutData}
                isPreview={true}
              />
            </div>
          </div>
        </div>

        {/* 오른쪽 패널 - 편집 영역 */}
        <div className="w-full md:w-1/3 p-6 bg-gray-50 overflow-y-auto">
          <div className="mb-4 border-b">
            <div className="flex">
              <button
                className={`py-2 px-4 ${
                  activeTab === "content"
                    ? "border-b-2 border-blue-500 font-medium"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("content")}
              >
                내용 편집
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "layout"
                    ? "border-b-2 border-blue-500 font-medium"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("layout")}
              >
                레이아웃 편집
              </button>
            </div>
          </div>
          {activeTab === "content" ? (
            <ResumeForm resumeData={resumeData} onUpdate={handleResumeUpdate} />
          ) : (
            <LayoutManager
              layoutConfig={layoutData}
              onUpdate={handleLayoutUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
