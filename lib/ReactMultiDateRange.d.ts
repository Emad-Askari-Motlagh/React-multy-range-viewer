import React, { CSSProperties } from "react";
import "./ReactMultiDateRange.css";
type BeginDayOfWeek = "sunday" | "monday";
interface InputData {
    startDate: Date;
    endDate: Date;
    key: string;
    type: string;
    color: string;
    cellTextColor?: string;
}
interface StaticDatePickerProps {
    loading: boolean;
    theme?: string;
    GuildComponent?: JSX.Element;
    handleRangeClick: (item: InputData) => void;
    onShownDateChange: (date: Date) => void;
    activeDate: Date;
    data: InputData[];
    beginDayOfWeek: BeginDayOfWeek;
    backgroundColor: string;
    textColor: string;
    borderColor?: string;
    containerStyle?: CSSProperties;
    width?: string;
    guidHeaderColor?: string;
    guidComponentStyle?: CSSProperties;
}
declare const ReactMultiDateRange: ({ handleRangeClick, onShownDateChange, GuildComponent, loading, theme, activeDate, data, beginDayOfWeek, backgroundColor, textColor, borderColor, containerStyle, width, guidHeaderColor, guidComponentStyle }: StaticDatePickerProps) => React.JSX.Element;
export default ReactMultiDateRange;
//# sourceMappingURL=ReactMultiDateRange.d.ts.map