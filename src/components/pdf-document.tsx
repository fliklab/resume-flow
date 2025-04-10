"use client";

import {
  Font,
  Document as PDFDocument,
  Page as PDFPage,
  Text as PDFText,
  View as PDFView,
  StyleSheet,
} from "@react-pdf/renderer";
import React from "react";

import contentData from "../app/content/layoutData.json";

// Types

interface DocumentData {
  header: HeaderSection;
  basicInfo: BasicInfo;
  profile: string[];
  sections: MainSection[];
  sideSections: SideSection[];
}

interface TableData {
  headers: string[];
  rows: string[][];
}

interface CardData {
  [key: string]: {
    [key: string]: string | CardData;
  };
}

type SectionData = TableData | CardData | string;

interface HeaderSection {
  title: string;
  subtitle: string;
}

interface BasicInfo {
  address: string;
  email: string;
  phone: string;
  website: string;
}

interface MainSection {
  title: string;
  content: {
    type: "text" | "table";
    data: SectionData;
  };
}

interface SideSection {
  title: string;
  content: {
    type: "text" | "table";
    data: SectionData;
  };
}

// Font Registration
Font.register({
  family: "Noto Sans KR",
  src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2",
      fontWeight: "bold",
    },
  ],
});

// Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Noto Sans KR",
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 20,
  },
  basicInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
    gap: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  infoLabel: {
    fontSize: 10,
    color: "#666666",
    marginRight: 8,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 10,
    color: "#333333",
  },
  profileSection: {
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
  },
  profileText: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
    borderBottom: "1pt solid #000000",
    paddingBottom: 4,
  },
  sideSectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 16,
    paddingBottom: 8,
  },
  table: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    minHeight: 32,
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    lineHeight: 1.4,
  },
  tableCellHeader: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "#F3F4F6",
    lineHeight: 1.4,
  },
});

export const jsonData = JSON.stringify(contentData);

// 타입 가드 함수 추가
function isTableData(data: SectionData): data is TableData {
  return (
    (data as TableData).headers !== undefined &&
    (data as TableData).rows !== undefined
  );
}

function isCardData(data: SectionData): data is CardData {
  return (
    typeof data === "object" && !Array.isArray(data) && !("headers" in data)
  );
}

const PDFDocumentComponent: React.FC<{ content: DocumentData }> = ({
  content,
}) => (
  <PDFDocument>
    <PDFPage size="A4" style={styles.page}>
      {/* Header */}
      <PDFView style={styles.header}>
        <PDFText style={styles.headerTitle}>{content.header.title}</PDFText>
        <PDFText style={styles.headerSubtitle}>
          {content.header.subtitle}
        </PDFText>
      </PDFView>

      {/* Profile Section */}
      <PDFView style={styles.profileSection}>
        {content.profile.map((text, index) => (
          <PDFText key={index} style={styles.profileText}>
            {text}
          </PDFText>
        ))}
      </PDFView>

      {/* Basic Info */}
      <PDFView style={styles.basicInfo}>
        <PDFView style={styles.infoItem}>
          <PDFText style={styles.infoLabel}>Address</PDFText>
          <PDFText style={styles.infoText}>{content.basicInfo.address}</PDFText>
        </PDFView>
        <PDFView style={styles.infoItem}>
          <PDFText style={styles.infoLabel}>Email</PDFText>
          <PDFText style={styles.infoText}>{content.basicInfo.email}</PDFText>
        </PDFView>
        <PDFView style={styles.infoItem}>
          <PDFText style={styles.infoLabel}>Phone</PDFText>
          <PDFText style={styles.infoText}>{content.basicInfo.phone}</PDFText>
        </PDFView>
        <PDFView style={styles.infoItem}>
          <PDFText style={styles.infoLabel}>Links</PDFText>
          <PDFText style={styles.infoText}>{content.basicInfo.website}</PDFText>
        </PDFView>
      </PDFView>

      <PDFView style={{ flexDirection: "row", gap: 12 }}>
        {/* Main Sections */}
        <PDFView style={{ flex: 2.5 }}>
          {content.sections.map((section, index) => (
            <PDFView key={index}>
              <PDFText style={styles.sectionTitle}>{section.title}</PDFText>
              {typeof section.content.data === "string" ? (
                <PDFText style={styles.profileText}>
                  {section.content.data}
                </PDFText>
              ) : isTableData(section.content.data) ? (
                <PDFView style={styles.table}>
                  <PDFView style={styles.tableRow}>
                    {section.content.data.headers.map(
                      (header: string, idx: number) => (
                        <PDFText key={idx} style={styles.tableCellHeader}>
                          {header}
                        </PDFText>
                      )
                    )}
                  </PDFView>
                  {section.content.data.rows.map(
                    (row: string[], rowIdx: number) => (
                      <PDFView key={rowIdx} style={styles.tableRow}>
                        {row.map((cell: string, cellIdx: number) => (
                          <PDFText key={cellIdx} style={styles.tableCell}>
                            {cell}
                          </PDFText>
                        ))}
                      </PDFView>
                    )
                  )}
                </PDFView>
              ) : isCardData(section.content.data) ? (
                <PDFView style={{}}>
                  <PDFView style={{}}>
                    {Object.keys(section.content.data).map(
                      (label: string, idx: number) => (
                        <PDFView key={idx} style={{ flexDirection: "column" }}>
                          <PDFText key={idx} style={styles.sideSectionTitle}>
                            {label}
                          </PDFText>
                          {isCardData(section.content.data) &&
                            Object.entries(
                              section.content.data[label] as Record<
                                string,
                                string
                              >
                            ).map(([innerLabel, value]) => (
                              <PDFText
                                key={innerLabel}
                                style={styles.profileText}
                              >
                                <PDFText style={{ color: "#666666" }}>
                                  {innerLabel}{" "}
                                </PDFText>
                                {value}
                              </PDFText>
                            ))}
                        </PDFView>
                      )
                    )}
                  </PDFView>
                </PDFView>
              ) : null}
            </PDFView>
          ))}
        </PDFView>

        {/* Side Section */}
        <PDFView style={{ flex: 1, flexDirection: "column" }}>
          {content.sideSections?.map((section, index) => (
            <PDFView key={index}>
              <PDFText style={styles.sectionTitle}>{section.title}</PDFText>
              {typeof section.content.data === "string" ? (
                <PDFText style={styles.profileText}>
                  {section.content.data}
                </PDFText>
              ) : isCardData(section.content.data) ? (
                <PDFView style={{}}>
                  <PDFView style={{}}>
                    {Object.keys(section.content.data).map(
                      (label: string, idx: number) => (
                        <PDFView key={idx} style={{ flexDirection: "column" }}>
                          <PDFText key={idx} style={styles.sideSectionTitle}>
                            {label}
                          </PDFText>
                          {isCardData(section.content.data) &&
                            Object.entries(
                              section.content.data[label] as Record<
                                string,
                                string
                              >
                            ).map(([innerLabel, value]) => (
                              <PDFText
                                key={innerLabel}
                                style={styles.profileText}
                              >
                                <PDFText style={{ color: "#666666" }}>
                                  {innerLabel}{" "}
                                </PDFText>
                                {value}
                              </PDFText>
                            ))}
                        </PDFView>
                      )
                    )}
                  </PDFView>
                </PDFView>
              ) : null}
            </PDFView>
          ))}
        </PDFView>
      </PDFView>
    </PDFPage>
  </PDFDocument>
);

export default PDFDocumentComponent;
