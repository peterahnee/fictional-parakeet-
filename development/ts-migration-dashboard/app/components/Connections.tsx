import React from 'react';
import type { BoxModel, BoxRect } from './types';

export default function Connections({
  boxesByModuleId,
  activeBoxRect,
}: {
  boxesByModuleId: Record<string, BoxModel>;
  activeBoxRect: BoxRect;
}) {
  return (
    <svg className="module-connections">
      {boxesByModuleId[activeBoxRect.moduleId].dependencyBoxRects.length ===
      0 ? null : (
        <polygon
          className="module-connection__dependency-arrowhead"
          points={`${activeBoxRect.centerX - 6},${activeBoxRect.centerY - 6} ${
            activeBoxRect.centerX + 6
          },${activeBoxRect.centerY - 6} ${activeBoxRect.centerX},${
            activeBoxRect.centerY
          }`}
        />
      )}
      {boxesByModuleId[activeBoxRect.moduleId].dependencyBoxRects.map(
        (dependencyBoxRect) => {
          return (
            <React.Fragment key={dependencyBoxRect.moduleId}>
              <path
                className="module-connection__dependency"
                d={`M ${activeBoxRect.centerX} ${activeBoxRect.centerY} L ${
                  activeBoxRect.centerX
                } ${
                  dependencyBoxRect.centerY + dependencyBoxRect.width / 2 + 7
                } L ${dependencyBoxRect.centerX} ${
                  dependencyBoxRect.centerY + dependencyBoxRect.width / 2 + 7
                } L ${dependencyBoxRect.centerX} ${dependencyBoxRect.centerY}`}
              />
              <circle
                className="module-connection__dependency-point"
                cx={dependencyBoxRect.centerX}
                cy={dependencyBoxRect.centerY}
              />
            </React.Fragment>
          );
        },
      )}
      {boxesByModuleId[activeBoxRect.moduleId].dependentBoxRects.map(
        (dependentBoxRect) => {
          return (
            <React.Fragment key={dependentBoxRect.moduleId}>
              <path
                d={`M ${activeBoxRect.centerX} ${activeBoxRect.centerY} L ${
                  activeBoxRect.centerX
                } ${
                  dependentBoxRect.centerY - dependentBoxRect.width / 2 - 7
                } L ${dependentBoxRect.centerX} ${
                  dependentBoxRect.centerY - dependentBoxRect.width / 2 - 7
                } L ${dependentBoxRect.centerX} ${dependentBoxRect.centerY}`}
                className="module-connection__dependent"
              />
              <polygon
                className="module-connection__dependent-arrowhead"
                points={`${dependentBoxRect.centerX - 6},${
                  dependentBoxRect.centerY - 6
                } ${dependentBoxRect.centerX + 6},${
                  dependentBoxRect.centerY - 6
                } ${dependentBoxRect.centerX},${dependentBoxRect.centerY}`}
              />
            </React.Fragment>
          );
        },
      )}
    </svg>
  );
}
