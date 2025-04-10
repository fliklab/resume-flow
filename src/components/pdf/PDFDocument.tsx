"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

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
});

// PDF 문서 컴포넌트
const PDFDocument = () => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>Section</Text>
            <Text style={styles.subheading}>HereSubheading</Text>
            <Text style={styles.text}>text1</Text>
            <Text style={styles.text}>text2</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.subheading}>경력 사항</Text>
            <Text style={styles.text}>회사명: ABC 주식회사</Text>
            <Text style={styles.text}>직위: 선임 개발자</Text>
            <Text style={styles.text}>기간: 2020년 1월 - 현재</Text>
            <Text style={styles.text}>
              • React, TypeScript, Next.js를 활용한 웹 프론트엔드 개발
            </Text>
            <Text style={styles.text}>• 성능 최적화 및 코드 리팩토링</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.subheading}>학력</Text>
            <Text style={styles.text}>대학교: 서울대학교</Text>
            <Text style={styles.text}>전공: 컴퓨터공학</Text>
            <Text style={styles.text}>기간: 2015년 - 2019년</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFDocument;
