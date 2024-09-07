declare module 'react-multi-date-range' {
    import * as React from 'react';
    import { CSSProperties } from 'react';

    type BeginDayOfWeek = 'sunday' | 'monday';

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
        guidComponentStyle?: CSSProperties
    }

    const ReactMultiDateRange: React.FC<StaticDatePickerProps>;

    export default ReactMultiDateRange;
}
