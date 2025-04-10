import { LayoutConfig, RendererType } from "@/lib/types/layout";

export const mockLayoutData: LayoutConfig = {
  elements: [
    {
      id: "name",
      type: RendererType.TEXT,
      source: "basics.name",
      order: 1,
      marginBottom: 5,
      settings: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000",
      },
    },
    {
      id: "label",
      type: RendererType.TEXT,
      source: "basics.label",
      order: 2,
      marginBottom: 10,
      settings: {
        fontSize: 18,
        color: "#333333",
      },
    },
    {
      id: "contact-info",
      type: RendererType.TEXT,
      source: "basics.email",
      order: 3,
      marginBottom: 5,
      settings: {
        fontSize: 12,
      },
    },
    {
      id: "summary",
      type: RendererType.TEXT,
      source: "basics.summary",
      order: 4,
      marginBottom: 20,
      settings: {
        fontSize: 12,
        fontStyle: "italic",
      },
    },
    {
      id: "work-section-title",
      type: RendererType.SECTION,
      source: "",
      order: 5,
      marginBottom: 10,
      settings: {
        title: "경력 사항",
        fontSize: 16,
      },
    },
    {
      id: "work-experience",
      type: RendererType.WORK_EXPERIENCE,
      source: "work",
      order: 6,
      marginBottom: 20,
      settings: {
        showDates: true,
        showHighlights: true,
      },
    },
    {
      id: "education-section-title",
      type: RendererType.SECTION,
      source: "",
      order: 7,
      marginBottom: 10,
      settings: {
        title: "학력",
        fontSize: 16,
      },
    },
    {
      id: "education",
      type: RendererType.TABLE,
      source: "education",
      order: 8,
      marginBottom: 20,
      settings: {
        columns: [
          { header: "기관", field: "institution", width: "30%" },
          { header: "전공", field: "area", width: "30%" },
          { header: "기간", field: "startDate-endDate", width: "25%" },
          { header: "학점", field: "score", width: "15%" },
        ],
      },
    },
    {
      id: "skills-section-title",
      type: RendererType.SECTION,
      source: "",
      order: 9,
      marginBottom: 10,
      settings: {
        title: "기술 스택",
        fontSize: 16,
      },
    },
    {
      id: "skills",
      type: RendererType.LIST,
      source: "skills",
      order: 10,
      marginBottom: 15,
      settings: {
        keyField: "name",
        valueField: "keywords",
        valueDelimiter: ", ",
      },
    },
  ],
};
