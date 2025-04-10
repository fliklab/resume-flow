import { Resume } from "@/lib/types/resume";

export const mockResumeData: Resume = {
  basics: {
    name: "홍길동",
    label: "소프트웨어 개발자",
    email: "hong@example.com",
    phone: "010-1234-5678",
    url: "https://hongildong.dev",
    summary:
      "10년 경력의 프론트엔드 개발자로 사용자 경험에 초점을 맞춘 웹 애플리케이션 개발에 전문성이 있습니다.",
    location: {
      address: "서울시 강남구",
      postalCode: "06123",
      city: "서울",
      countryCode: "KR",
      region: "서울특별시",
    },
    profiles: [
      {
        network: "GitHub",
        username: "honggildong",
        url: "https://github.com/honggildong",
      },
      {
        network: "LinkedIn",
        username: "홍길동",
        url: "https://linkedin.com/in/honggildong",
      },
    ],
  },
  work: [
    {
      name: "네이버",
      position: "시니어 프론트엔드 개발자",
      url: "https://navercorp.com",
      startDate: "2018-03-01",
      endDate: "2023-08-31",
      summary: "네이버 쇼핑 서비스의 프론트엔드 개발을 담당",
      highlights: [
        "React 기반 프론트엔드 아키텍처 설계 및 구현",
        "성능 최적화를 통한 페이지 로딩 시간 40% 단축",
        "마이크로프론트엔드 아키텍처 도입",
      ],
    },
    {
      name: "카카오",
      position: "프론트엔드 개발자",
      url: "https://kakaocorp.com",
      startDate: "2015-01-15",
      endDate: "2018-02-28",
      summary: "카카오톡 웹 서비스 개발",
      highlights: [
        "Vue.js 기반 실시간 채팅 인터페이스 개발",
        "모바일 반응형 디자인 구현",
      ],
    },
  ],
  education: [
    {
      institution: "서울대학교",
      url: "https://snu.ac.kr",
      area: "컴퓨터공학",
      studyType: "학사",
      startDate: "2011-03-01",
      endDate: "2015-02-28",
      score: "4.2/4.5",
      courses: ["자료구조", "알고리즘", "컴퓨터 네트워크", "운영체제"],
    },
  ],
  skills: [
    {
      name: "프론트엔드 개발",
      level: "전문가",
      keywords: ["React", "TypeScript", "Next.js", "HTML", "CSS", "JavaScript"],
    },
    {
      name: "백엔드 개발",
      level: "중급",
      keywords: ["Node.js", "Express", "MongoDB"],
    },
  ],
  languages: [
    {
      language: "한국어",
      fluency: "원어민",
    },
    {
      language: "영어",
      fluency: "업무상 소통 가능",
    },
  ],
  projects: [
    {
      name: "이력서 PDF 생성기",
      description: "다양한 형식의 이력서를 PDF로 생성하는 웹 애플리케이션",
      startDate: "2023-01-01",
      endDate: "2023-06-30",
      highlights: [
        "React와 Next.js를 사용한 프론트엔드 개발",
        "React-PDF를 활용한 PDF 생성 기능 구현",
      ],
      url: "https://resume-generator.example.com",
    },
  ],
};
