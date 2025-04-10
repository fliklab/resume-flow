import { LayoutConfig } from "@/lib/types/layout";
import { Resume } from "@/lib/types/resume";

interface PDFDocumentProps {
  resumeData: Resume;
  layoutConfig: LayoutConfig;
  isPreview?: boolean;
}

const PDFDocument: React.FC<PDFDocumentProps> = () => {
  return <div>PDFDocument</div>;
};

export default PDFDocument;
