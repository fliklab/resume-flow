"use client";

import React, { useState } from "react";
import { LayoutConfig, LayoutElement } from "@/lib/types/layout";
import LayoutVisualizer from "@/components/layout/LayoutVisualizer";

interface LayoutManagerProps {
  layoutConfig: LayoutConfig;
  onUpdate: (updatedLayout: LayoutConfig) => void;
}

const LayoutManager: React.FC<LayoutManagerProps> = ({
  layoutConfig,
  onUpdate,
}) => {
  const [activeElementId, setActiveElementId] = useState<string | null>(null);
  const [elements, setElements] = useState<LayoutElement[]>(
    layoutConfig.elements.map((el) => ({ ...el }))
  );

  const handleElementClick = (elementId: string) => {
    setActiveElementId(elementId);
  };

  const handleReorder = (elementId: string, direction: "up" | "down") => {
    const updatedElements = [...elements];
    const currentIndex = updatedElements.findIndex((el) => el.id === elementId);

    if (currentIndex === -1) return;

    const newIndex =
      direction === "up"
        ? Math.max(0, currentIndex - 1)
        : Math.min(updatedElements.length - 1, currentIndex + 1);

    if (newIndex === currentIndex) return;

    // 요소 순서 변경
    const [movedElement] = updatedElements.splice(currentIndex, 1);
    updatedElements.splice(newIndex, 0, movedElement);

    // order 속성 업데이트
    const reorderedElements = updatedElements.map((el, idx) => ({
      ...el,
      order: idx,
    }));

    setElements(reorderedElements);
    onUpdate({ elements: reorderedElements });
  };

  const handleToggleWrap = (elementId: string) => {
    const updatedElements = elements.map((el) =>
      el.id === elementId ? { ...el, wrap: !el.wrap } : el
    );

    setElements(updatedElements);
    onUpdate({ elements: updatedElements });
  };

  const handleMarginChange = (
    elementId: string,
    marginType: "top" | "bottom",
    value: number
  ) => {
    const updatedElements = elements.map((el) => {
      if (el.id === elementId) {
        return marginType === "top"
          ? { ...el, marginTop: value }
          : { ...el, marginBottom: value };
      }
      return el;
    });

    setElements(updatedElements);
    onUpdate({ elements: updatedElements });
  };

  // 현재 선택된 요소 찾기
  const activeElement = activeElementId
    ? elements.find((el) => el.id === activeElementId)
    : null;

  return (
    <div className="space-y-8">
      <LayoutVisualizer
        layoutConfig={{ elements }}
        onElementClick={handleElementClick}
        activeElementId={activeElementId || undefined}
      />
      {/* 선택된 요소 세부 설정 */}
      {activeElement && (
        <div className="border rounded-md p-4 bg-white">
          <h3 className="text-lg font-medium mb-4">
            요소 설정: {activeElement.id}
          </h3>

          <div className="space-y-4">
            {/* 순서 조정 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                순서 조정
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleReorder(activeElement.id, "up")}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  disabled={activeElement.order === 0}
                >
                  ↑ 위로
                </button>
                <button
                  onClick={() => handleReorder(activeElement.id, "down")}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                  disabled={activeElement.order === elements.length - 1}
                >
                  ↓ 아래로
                </button>
              </div>
            </div>

            {/* 줄바꿈 설정 */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={!!activeElement.wrap}
                  onChange={() => handleToggleWrap(activeElement.id)}
                  className="mr-2"
                />
                <span className="text-sm">줄바꿈 사용</span>
              </label>
            </div>

            {/* 여백 설정 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                위쪽 여백 (px)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={activeElement.marginTop || 0}
                onChange={(e) =>
                  handleMarginChange(
                    activeElement.id,
                    "top",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                아래쪽 여백 (px)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={activeElement.marginBottom || 0}
                onChange={(e) =>
                  handleMarginChange(
                    activeElement.id,
                    "bottom",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutManager;
