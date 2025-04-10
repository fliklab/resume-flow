import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { RendererType } from "../types/layout";
import { Resume } from "../types/resume";

// 스타일 정의
const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "IBMPlexSansKR-Bold",
  },
  subheading: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "IBMPlexSansKR",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "IBMPlexSansKR-Light",
  },
  bold: {
    fontFamily: "IBMPlexSansKR-Bold",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  col: {
    flex: 1,
  },
});

// 먼저 필요한 인터페이스 정의
interface RendererProps {
  source: string;
  settings?: RendererSettings;
  resumeData: Resume;
}

interface RendererSettings {
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  title?: string;
  keyField?: string;
  valueField?: string;
  valueDelimiter?: string;
  showDates?: boolean;
  showHighlights?: boolean;
  leftSource?: string;
  rightSource?: string;
  columns?: ColumnDefinition[];
  [key: string]: unknown;
}

interface ColumnDefinition {
  header: string;
  field: string;
  width?: string;
}

export const getDataFromSource = (
  source: string,
  resumeData: Resume
): unknown => {
  if (!source) return null;

  // 배열 인덱스 처리 (예: work[0])
  const arrayMatch = source.match(/^(\w+)\[(\d+)\](.*)$/);
  if (arrayMatch) {
    const [, arrayName, indexStr, remaining] = arrayMatch;
    const index = parseInt(indexStr, 10);

    // 타입 안전성을 위해 unknown으로 먼저 변환
    const resumeDataUnknown = resumeData as unknown;
    const resumeDataRecord = resumeDataUnknown as Record<string, unknown[]>;
    const array = resumeDataRecord[arrayName];

    if (Array.isArray(array) && array.length > index) {
      if (remaining) {
        // 중첩 객체 처리 (예: work[0].position)
        return getDataFromSource(
          remaining.substring(1),
          array[index] as unknown as Resume
        );
      }
      return array[index];
    }
    return null;
  }

  // 중첩 객체 처리 (예: basics.name)
  const parts = source.split(".");
  let data: unknown = resumeData;

  for (const part of parts) {
    if (data === null || data === undefined) return null;
    data = (data as Record<string, unknown>)[part];
  }

  return data;
};

// 렌더러 컴포넌트에 타입 적용
export const TextRenderer: React.FC<RendererProps> = ({
  source,
  settings,
  resumeData,
}) => {
  const data = getDataFromSource(source, resumeData);
  if (!data) return null;

  return (
    <Text
      style={[
        styles.text,
        settings?.fontSize ? { fontSize: settings.fontSize } : {},
        settings?.fontWeight === "bold" ? styles.bold : {},
        settings?.color ? { color: settings.color } : {},
      ]}
    >
      {String(data)}
    </Text>
  );
};

// 섹션 렌더러
export const SectionRenderer: React.FC<RendererProps> = ({
  source,
  settings,
  resumeData,
}) => {
  const title = settings?.title || "";
  const data = source ? getDataFromSource(source, resumeData) : null;

  return (
    <View style={styles.section}>
      {title && (
        <Text
          style={[
            styles.subheading,
            settings?.fontSize ? { fontSize: settings.fontSize } : {},
          ]}
        >
          {title}
        </Text>
      )}
      {data ? <Text style={styles.text}>{JSON.stringify(data)}</Text> : null}
    </View>
  );
};

// 리스트 렌더러
export const ListRenderer: React.FC<RendererProps> = ({
  source,
  settings,
  resumeData,
}) => {
  const data = getDataFromSource(source, resumeData) as
    | Record<string, unknown>[]
    | null;
  if (!Array.isArray(data) || data.length === 0) return null;

  const keyField = settings?.keyField || "name";
  const valueField = settings?.valueField || "value";
  const valueDelimiter = settings?.valueDelimiter || ", ";

  return (
    <View style={styles.section}>
      {data.map((item, index) => {
        const key = String(item[keyField] || "");
        const rawValue = item[valueField];
        const value = Array.isArray(rawValue)
          ? rawValue.join(valueDelimiter)
          : String(rawValue || "");

        return (
          <View key={index} style={{ marginBottom: 5 }}>
            <Text style={[styles.text, styles.bold]}>{key}</Text>
            {value && <Text style={styles.text}>{value}</Text>}
          </View>
        );
      })}
    </View>
  );
};

// 워크 익스피리언스 렌더러
export const WorkExperienceRenderer: React.FC<RendererProps> = ({
  source,
  resumeData,
}) => {
  const data = getDataFromSource(source, resumeData) as Array<{
    position: string;
    name: string;
    startDate: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
  }> | null;

  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <View style={styles.section}>
      {data.map((job, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={[styles.text, styles.bold]}>
            {job.position} @ {job.name}
          </Text>
          <Text style={styles.text}>
            {job.startDate} - {job.endDate || "현재"}
          </Text>
          <Text style={job.summary ? styles.text : styles.text}>
            {job.summary}
          </Text>
          {job.highlights &&
            job.highlights.map((highlight, idx) => (
              <Text key={idx} style={styles.text}>
                • {highlight}
              </Text>
            ))}
        </View>
      ))}
    </View>
  );
};

// 테이블 렌더러
export const TableRenderer: React.FC<RendererProps> = ({
  source,
  settings,
  resumeData,
}) => {
  const data = getDataFromSource(source, resumeData) as
    | Record<string, unknown>[]
    | null;
  if (!Array.isArray(data) || data.length === 0) return null;

  const columns = settings?.columns || [];

  return (
    <View style={styles.section}>
      {/* 헤더 행 */}
      <View
        style={[
          styles.row,
          { borderBottomWidth: 1, borderBottomColor: "#ccc", paddingBottom: 5 },
        ]}
      >
        {columns.map((col, colIndex) => (
          <Text
            key={colIndex}
            style={[styles.text, styles.bold, { flex: 1, width: col.width }]}
          >
            {col.header}
          </Text>
        ))}
      </View>

      {/* 데이터 행 */}
      {data.map((item, rowIndex) => (
        <View key={rowIndex} style={[styles.row, { paddingVertical: 5 }]}>
          {columns.map((col, colIndex) => {
            // 날짜 범위 필드 처리 (startDate-endDate)
            let value = "";
            if (col.field.includes("-")) {
              const [startField, endField] = col.field.split("-");
              value = `${String(item[startField] || "")} - ${String(
                item[endField] || "현재"
              )}`;
            } else {
              value = String(item[col.field] || "");
            }

            return (
              <Text
                key={colIndex}
                style={[styles.text, { flex: 1, width: col.width }]}
              >
                {value}
              </Text>
            );
          })}
        </View>
      ))}
    </View>
  );
};

// 두 컬럼 렌더러
export const TwoColumnRenderer: React.FC<RendererProps> = ({
  source,
  settings,
  resumeData,
}) => {
  // source 매개변수 활용 (예: "source1|source2" 형식 파싱)
  let leftSource = "";
  let rightSource = "";

  if (source && source.includes("|")) {
    const sources = source.split("|");
    leftSource = sources[0] || "";
    rightSource = sources.length > 1 ? sources[1] : "";
  } else {
    // 기존 방식대로 settings에서 가져오기
    leftSource = settings?.leftSource || "";
    rightSource = settings?.rightSource || "";
  }
  const leftData = leftSource
    ? getDataFromSource(leftSource, resumeData)
    : null;

  const rightData = rightSource
    ? getDataFromSource(rightSource, resumeData)
    : null;

  return (
    <View style={styles.row}>
      <View style={styles.col}>
        {leftData !== null && leftData !== undefined && (
          <Text style={styles.text}>{JSON.stringify(leftData)}</Text>
        )}
      </View>
      <View style={styles.col}>
        {rightData !== null && rightData !== undefined && (
          <Text style={styles.text}>{JSON.stringify(rightData)}</Text>
        )}
      </View>
    </View>
  );
};

// 렌더러 팩토리
export const getRenderer = (type: RendererType): React.FC<RendererProps> => {
  const renderers: Record<string, React.FC<RendererProps>> = {
    [RendererType.TEXT]: TextRenderer,
    [RendererType.SECTION]: SectionRenderer,
    [RendererType.LIST]: ListRenderer,
    [RendererType.TABLE]: TableRenderer,
    [RendererType.TWO_COLUMN]: TwoColumnRenderer,
    [RendererType.WORK_EXPERIENCE]: WorkExperienceRenderer,
  };

  return renderers[type] || (() => null);
};
