import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">이력서 PDF 생성기</h1>
      <Image src="/concept.svg" alt="concept" width={640} height={100} />
      <div className="flex gap-4">
        <a
          href="/preview"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          이력서 미리보기
        </a>
        <a
          href="/edit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          이력서 수정하기
        </a>
      </div>
    </div>
  );
}
