"use client";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React, { useState } from "react";

import PDFDocumentComponent, { jsonData } from "./pdf-document";

const PDFPreviewApp: React.FC = () => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [parseError, setParseError] = useState<string>("");
  const [content, setContent] = useState<string>(jsonData);
  const [prevContent, setPrevContent] = useState<string>(jsonData);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">PDF 이력서 생성기</h1>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setShowEditor(!showEditor)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              {showEditor ? "내용 수정 완료" : "내용 수정"}
            </button>

            {!parseError ? (
              <PDFDownloadLink
                document={
                  <PDFDocumentComponent content={JSON.parse(prevContent)} />
                }
                fileName="resume.pdf"
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors"
              >
                {({ loading }) => (loading ? "문서 생성중..." : "PDF 다운로드")}
              </PDFDownloadLink>
            ) : null}
          </div>

          {showEditor && (
            <div className="mb-6">
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);

                  try {
                    JSON.parse(e.target.value);
                    setParseError("");
                    setPrevContent(e.target.value);
                  } catch (error) {
                    console.error(error);
                    setParseError(
                      "JSON 형식이 올바르지 않습니다. 내용을 확인해주세요."
                    );
                  }
                }}
                className="w-full h-[800px] p-6 border rounded-lg font-mono text-sm"
                placeholder="JSON 형식으로 내용을 작성하세요..."
                style={{
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              />
              {parseError ? (
                <div className="mt-2 text-sm text-red-600 font-semibold">
                  ⚠️ {parseError}
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-600">
                  JSON 형식으로 이력서 내용을 작성해주세요.
                </div>
              )}
            </div>
          )}

          {!showEditor && (
            <div className="border rounded-lg">
              <PDFViewer width="100%" height={800} className="rounded-lg">
                <PDFDocumentComponent content={JSON.parse(prevContent)} />
              </PDFViewer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFPreviewApp;
