"use client";

import React, { useMemo } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { Resume } from "@/lib/types/resume";
import { LayoutConfig, LayoutElement } from "@/lib/types/layout";
import { getRenderer } from "@/lib/services/rendererFactory";

Font.register({
  family: "IBMPlexSansKR",
  src: "/fonts/IBMPlexSansKR-Regular.ttf",
});
Font.register({
  family: "IBMPlexSansKR-Bold",
  src: "/fonts/IBMPlexSansKR-Bold.ttf",
});
Font.register({
  family: "IBMPlexSansKR-Light",
  src: "/fonts/IBMPlexSansKR-Light.ttf",
});

// 스타일 정의
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "IBMPlexSansKR",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "IBMPlexSansKR-Bold",
  },
  subheading: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "IBMPlexSansKR",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "IBMPlexSansKR-Light",
  },
  divider: {
    borderBottom: "1px solid #EEEEEE",
    marginVertical: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: "#FF0000",
    textAlign: "center",
    marginTop: 20,
  },
});

interface PDFDocumentProps {
  resumeData?: Resume;
  layoutConfig?: LayoutConfig;
  isPreview?: boolean;
}

// PDF 문서 컴포넌트
const PDFDocument: React.FC<PDFDocumentProps> = (props) => {
  const { resumeData, layoutConfig, isPreview = false } = props;

  // 레이아웃 설정에 따라 요소 정렬
  const sortedElements = useMemo(() => {
    return layoutConfig
      ? [...layoutConfig.elements].sort((a, b) => {
          const orderA = a.order !== undefined ? a.order : 0;
          const orderB = b.order !== undefined ? b.order : 0;
          return orderA - orderB;
        })
      : null;
  }, [layoutConfig]);

  // 데이터가 없는 경우 기본 미리보기 표시
  if (!resumeData) {
    return (
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.heading}>데이터가 없습니다</Text>
              <Text style={styles.text}>
                이력서 데이터를 불러오지 못했습니다.
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }

  // 레이아웃 설정이 없는 경우 기본 미리보기 표시
  if (
    !layoutConfig ||
    !layoutConfig.elements ||
    layoutConfig.elements.length === 0
  ) {
    return (
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.heading}>{resumeData.basics.name}</Text>
              <Text style={styles.text}>
                레이아웃 설정을 불러오지 못했습니다.
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* 레이아웃 설정에 따라 동적으로 렌더링 */}
          {sortedElements?.map((element: LayoutElement) => {
            const Renderer = getRenderer(element.type);
            const marginTop = element.marginTop || 0;
            const marginBottom = element.marginBottom || 0;

            return (
              <View
                key={element.id}
                style={{
                  marginTop,
                  marginBottom,
                  flexWrap: element.wrap ? "wrap" : "nowrap",
                }}
              >
                <Renderer
                  source={element.source}
                  settings={element.settings}
                  resumeData={resumeData}
                />
              </View>
            );
          })}

          {/* 미리보기 모드일 때 표시할 텍스트 */}
          {isPreview && (
            <View
              style={{ position: "absolute", bottom: 20, left: 30, right: 30 }}
            >
              <Text style={{ fontSize: 8, color: "#999", textAlign: "center" }}>
                이 문서는 미리보기입니다. 실제 PDF와 다를 수 있습니다.
              </Text>
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFDocument;
