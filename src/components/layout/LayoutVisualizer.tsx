import React, { useMemo } from "react";
import { LayoutConfig, RendererType } from "@/lib/types/layout";

// 렌더러 타입별 색상 설정
const typeColors: Record<string, string> = {
  [RendererType.TEXT]: "#E3F2FD", // 연한 파란색
  [RendererType.SECTION]: "#FFF3E0", // 연한 주황색
  [RendererType.LIST]: "#E8F5E9", // 연한 녹색
  [RendererType.TABLE]: "#F3E5F5", // 연한 보라색
  [RendererType.TWO_COLUMN]: "#FFEBEE", // 연한 빨간색
  [RendererType.WORK_EXPERIENCE]: "#E0F7FA", // 연한 청록색
};

interface LayoutVisualizerProps {
  layoutConfig: LayoutConfig;
  onElementClick?: (elementId: string) => void;
  activeElementId?: string;
}

const LayoutVisualizer: React.FC<LayoutVisualizerProps> = ({
  layoutConfig,
  onElementClick,
  activeElementId,
}) => {
  // 레이아웃 요소 정렬
  const sortedElements = useMemo(
    () =>
      [...layoutConfig.elements].sort((a, b) => {
        const orderA = a.order !== undefined ? a.order : 0;
        const orderB = b.order !== undefined ? b.order : 0;
        return orderA - orderB;
      }),
    [layoutConfig.elements]
  );

  return (
    <div className="border rounded-md p-2 bg-white">
      <div className="space-y-2">
        {sortedElements.map((element) => (
          <div
            key={element.id}
            className={`border rounded p-2 transition-all ${
              activeElementId === element.id ? "ring-2 ring-blue-500" : ""
            }`}
            style={{
              backgroundColor: typeColors[element.type] || "#F5F5F5",
              marginTop: element.marginTop || 0,
              marginBottom: element.marginBottom || 0,
            }}
            onClick={
              onElementClick ? () => onElementClick(element.id) : undefined
            }
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{element.id}</p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className="text-xs px-2 py-1 bg-white rounded-full border">
                  {element.order !== undefined
                    ? `순서: ${element.order}`
                    : "순서 없음"}
                </span>
                <p className="text-xs text-gray-500">타입: {element.type}</p>
              </div>
            </div>

            {element.source && (
              <p className="text-xs mt-2 text-gray-600">
                소스: {element.source}
              </p>
            )}

            {element.wrap !== undefined && (
              <p className="text-xs mt-1 text-gray-600">
                줄바꿈: {element.wrap ? "사용" : "사용 안 함"}
              </p>
            )}

            {(element.marginTop !== undefined ||
              element.marginBottom !== undefined) && (
              <p className="text-xs mt-1 text-gray-600">
                여백: {element.marginTop || 0}px 위, {element.marginBottom || 0}
                px 아래
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutVisualizer;
