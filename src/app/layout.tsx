import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "이력서 PDF 생성기",
  description: "손쉽게 이력서 PDF를 생성하고 관리하세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
