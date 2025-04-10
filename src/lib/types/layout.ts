// 레이아웃 구성을 위한 타입 정의

export interface LayoutConfig {
  elements: LayoutElement[];
}

export interface LayoutElement {
  id: string;
  type: RendererType;
  source: string; // Resume 데이터에서 가져올 필드 경로 (예: "basics.name", "work[0].position")
  wrap?: boolean;
  marginTop?: number;
  marginBottom?: number;
  order?: number;
  // 렌더러별 추가 설정
  settings?: Record<string, unknown>;
}

// 지원하는 렌더러 타입
export enum RendererType {
  TEXT = "text",
  SECTION = "section",
  LIST = "list",
  TABLE = "table",
  TWO_COLUMN = "two-column",
  WORK_EXPERIENCE = "work-experience",
  // 필요에 따라 추가 가능
}
