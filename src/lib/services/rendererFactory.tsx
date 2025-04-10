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

// 데이터 소스에서 실제 데이터 추출하는 헬퍼 함수
export const getDataFromSource = (source: string, resumeData: Resume): any => {
  if (!source) return null;

  // 배열 인덱스 처리 (예: work[0])
  const arrayMatch = source.match(/^(\w+)\[(\d+)\](.*)$/);
  if (arrayMatch) {
    const [, arrayName, indexStr, remaining] = arrayMatch;
    const index = parseInt(indexStr, 10);
    const array = (resumeData as any)[arrayName];
    if (Array.isArray(array) && array.length > index) {
      if (remaining) {
        // 중첩 객체 처리 (예: work[0].position)
        return getDataFromSource(remaining.substring(1), array[index]);
      }
      return array[index];
    }
    return null;
  }

  // 중첩 객체 처리 (예: basics.name)
  const parts = source.split(".");
  let data: any = resumeData;

  for (const part of parts) {
    if (data === null || data === undefined) return null;
    data = data[part];
  }

  return data;
};

// 텍스트 렌더러
export const TextRenderer = ({ source, settings, resumeData }: any) => {
  const data = getDataFromSource(source, resumeData);
  if (!data) return null;

  return (
    <Text
      style={[
        styles.text,
        settings?.fontSize && { fontSize: settings.fontSize },
        settings?.fontWeight === "bold" && styles.bold,
        settings?.color && { color: settings.color },
      ]}
    >
      {data}
    </Text>
  );
};

// 섹션 렌더러
export const SectionRenderer = ({ source, settings, resumeData }: any) => {
  const title = settings?.title || "";
  const data = source ? getDataFromSource(source, resumeData) : null;

  return (
    <View style={styles.section}>
      {title && (
        <Text
          style={[
            styles.subheading,
            settings?.fontSize && { fontSize: settings.fontSize },
          ]}
        >
          {title}
        </Text>
      )}
      {data && <Text style={styles.text}>{JSON.stringify(data)}</Text>}
    </View>
  );
};

// 리스트 렌더러
export const ListRenderer = ({ source, settings, resumeData }: any) => {
  const data = getDataFromSource(source, resumeData);
  if (!Array.isArray(data) || data.length === 0) return null;

  const keyField = settings?.keyField || "name";
  const valueField = settings?.valueField || "value";
  const valueDelimiter = settings?.valueDelimiter || ", ";

  return (
    <View style={styles.section}>
      {data.map((item, index) => {
        const key = item[keyField];
        const value = Array.isArray(item[valueField])
          ? item[valueField].join(valueDelimiter)
          : item[valueField];

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
export const WorkExperienceRenderer = ({
  source,
  settings,
  resumeData,
}: any) => {
  const data = getDataFromSource(source, resumeData);
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
          <Text style={styles.text}>{job.summary}</Text>
          {job.highlights &&
            job.highlights.map((highlight: string, idx: number) => (
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
export const TableRenderer = ({ source, settings, resumeData }: any) => {
  const data = getDataFromSource(source, resumeData);
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
        {columns.map((col: any, colIndex: number) => (
          <Text
            key={colIndex}
            style={[styles.text, styles.bold, { flex: 1, width: col.width }]}
          >
            {col.header}
          </Text>
        ))}
      </View>

      {/* 데이터 행 */}
      {data.map((item: any, rowIndex: number) => (
        <View key={rowIndex} style={[styles.row, { paddingVertical: 5 }]}>
          {columns.map((col: any, colIndex: number) => {
            // 날짜 범위 필드 처리 (startDate-endDate)
            let value = "";
            if (col.field.includes("-")) {
              const [startField, endField] = col.field.split("-");
              value = `${item[startField]} - ${item[endField] || "현재"}`;
            } else {
              value = item[col.field] || "";
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
export const TwoColumnRenderer = ({ source, settings, resumeData }: any) => {
  const data = getDataFromSource(source, resumeData);
  if (!data) return null;

  const leftSource = settings?.leftSource || "";
  const rightSource = settings?.rightSource || "";
  const leftData = leftSource
    ? getDataFromSource(leftSource, resumeData)
    : null;
  const rightData = rightSource
    ? getDataFromSource(rightSource, resumeData)
    : null;

  return (
    <View style={styles.row}>
      <View style={styles.col}>
        {leftData && (
          <Text style={styles.text}>{JSON.stringify(leftData)}</Text>
        )}
      </View>
      <View style={styles.col}>
        {rightData && (
          <Text style={styles.text}>{JSON.stringify(rightData)}</Text>
        )}
      </View>
    </View>
  );
};

// 렌더러 팩토리
export const getRenderer = (type: RendererType) => {
  const renderers: Record<string, React.FC<any>> = {
    [RendererType.TEXT]: TextRenderer,
    [RendererType.SECTION]: SectionRenderer,
    [RendererType.LIST]: ListRenderer,
    [RendererType.TABLE]: TableRenderer,
    [RendererType.TWO_COLUMN]: TwoColumnRenderer,
    [RendererType.WORK_EXPERIENCE]: WorkExperienceRenderer,
  };

  return renderers[type] || (() => null);
};
