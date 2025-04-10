import { LayoutConfig, RendererType } from "@/lib/types/layout";

export const mockLayoutData: LayoutConfig = {
  elements: [
    {
      id: "header",
      type: RendererType.TEXT,
      source: "header",
      settings: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000000",
      },
    },
    {
      id: "basicInfo",
      type: RendererType.TEXT,
      source: "basicInfo",
      settings: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#000000",
      },
    },
    {
      id: "profile",
      type: RendererType.TEXT,
      source: "profile",
      settings: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#000000",
      },
    },
    {
      id: "sections",
      type: RendererType.SECTION,
      source: "sections",
      settings: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#000000",
      },
    },
  ],
};
