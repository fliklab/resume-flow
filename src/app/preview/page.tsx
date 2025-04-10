"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PDFDocument from "@/components/pdf/PDFDocument";
import { mockResumeData } from "@/data/mock/resume-data";
import { mockLayoutData } from "@/data/mock/layout-mock";
import { Resume } from "@/lib/types/resume";
import { LayoutConfig } from "@/lib/types/layout";

export default function PreviewPage() {
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [layoutData, setLayoutData] = useState<LayoutConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제 환경에서는 API나 로컬 스토리지에서 데이터를 가져올 수 있음
    // 현재는 목 데이터 사용
    setResumeData(mockResumeData);
    setLayoutData(mockLayoutData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        로딩 중...
      </div>
    );
  }

  if (!resumeData || !layoutData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">
          이력서 데이터를 불러오는데 실패했습니다.
        </p>
        <Link href="/edit" className="px-4 py-2 bg-blue-500 text-white rounded">
          이력서 작성하기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            이력서 미리보기
          </h1>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
              PDF 다운로드
            </button>
            <Link
              href="/edit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              수정하기
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow p-6 bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <PDFDocument
            resumeData={resumeData}
            layoutConfig={layoutData}
            isPreview={true}
          />
        </div>
      </main>
    </div>
  );
}
