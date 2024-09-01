import React, { CSSProperties, useEffect, useState } from "react";
import "./ReactMultiDateRange.css";

type BeginDayOfWeek = "sunday" | "monday";

interface InputData {
  startDate: Date;
  endDate: Date;
  key: string;
  type: string;
  color: string;
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
}

// Utility functions to handle date manipulations
const cloneDate = (date: Date) => new Date(date.getTime());
const addMonths = (date: Date, months: number) =>
  new Date(date.setMonth(date.getMonth() + months));
const subtractMonths = (date: Date, months: number) =>
  new Date(date.setMonth(date.getMonth() - months));
const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);
const isSameDay = (d1: Date, d2: Date) =>
  d1.toDateString() === d2.toDateString();
const isBetween = (date: Date, startDate: Date, endDate: Date) =>
  date >= startDate && date <= endDate;

const ReactMultiDateRange = ({
  handleRangeClick,
  onShownDateChange,
  GuildComponent,
  loading,
  theme,
  activeDate,
  data,
  beginDayOfWeek,
  backgroundColor,
  textColor,
  borderColor,
  containerStyle,
  width,
}: StaticDatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    activeDate ?? new Date()
  );

  const goToPreviousMonth = () => {
    setCurrentMonth(cloneDate(subtractMonths(cloneDate(currentMonth), 1)));
  };

  const goToNextMonth = () => {
    setCurrentMonth(cloneDate(addMonths(cloneDate(currentMonth), 1)));
  };

  useEffect(() => {
    onShownDateChange(currentMonth);
  }, [currentMonth, onShownDateChange]);

  const getWeekOfMonth = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek =
      beginDayOfWeek === "monday"
        ? (startOfMonth.getDay() + 6) % 7
        : startOfMonth.getDay(); // Monday = 0, Sunday = 6
    const dayOfMonth = date.getDate();
    return Math.ceil((dayOfMonth + firstDayOfWeek) / 7) - 1;
  };

  const renderCalendar = () => {
    const weeks: JSX.Element[][] = [];
    const startOfCurrentMonth = startOfMonth(currentMonth);
    const endOfCurrentMonth = endOfMonth(currentMonth);

    let currentDate = cloneDate(startOfCurrentMonth);

    while (currentDate <= endOfCurrentMonth) {
      let color = "transparent";
      let firstDayInRange = false;
      let lastDayInRange = false;
      let rangeObj: InputData | null = null; // To store the range that contains the current day

      data.forEach((range) => {
        const start = range.startDate;
        const end = range.endDate;

        if (
          isSameDay(start, currentDate) ||
          isSameDay(end, currentDate) ||
          isBetween(currentDate, start, end)
        ) {
          firstDayInRange = isSameDay(start, currentDate);
          lastDayInRange = isSameDay(end, currentDate);
          color = range.color || "transparent";
          rangeObj = range; // Set the rangeObj to the current range
        }
      });

      const weekNumber = getWeekOfMonth(currentDate);

      if (!weeks[weekNumber]) {
        weeks[weekNumber] = [];
      }

      weeks[weekNumber].push(
        <div
          key={currentDate.toDateString()}
          style={{
            padding: 0,
            height: "30px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "3px 0",
            backgroundColor: color,
            color: textColor,
            width: !firstDayInRange || !lastDayInRange ? "100%" : "70%",
            borderRadius: 0,
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            borderTopLeftRadius: firstDayInRange ? "20px" : "initial",
            borderBottomLeftRadius: firstDayInRange ? "20px" : "initial",
            borderTopRightRadius: lastDayInRange ? "20px" : "initial",
            borderBottomRightRadius: lastDayInRange ? "20px" : "initial",
            fontWeight: "bold",
            filter:
              !firstDayInRange && !lastDayInRange
                ? "contrast(80%)"
                : "contrast(100%)",
          }}
          onClick={() => {
            if (rangeObj) handleRangeClick(rangeObj);
          }}
        >
          {currentDate.getDate()}
        </div>
      );

      currentDate = addMonths(cloneDate(currentDate), 0); // Advance by 1 day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weeks.map((week, index) => (
      <div
        key={index}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "0.2px",
        }}
      >
        {week}
      </div>
    ));
  };

  const renderDayHeaders = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const adjustedDays =
      beginDayOfWeek === "monday" ? [...days.slice(1), days[0]] : days;
    return adjustedDays.map((day, index) => {
      return (
        <div
          key={index}
          style={{
            padding: "10px",
            textAlign: "center",
            fontWeight: "bold",
            color: textColor,
          }}
        >
          {day.slice(0, 2)}
        </div>
      );
    });
  };

  return (
    <div
      className="month-details-container"
      style={{
        width: width ? width : "initial",
        margin: "auto",
        position: "relative",
        backgroundColor: backgroundColor,
        border: borderColor ? `1px solid ${borderColor}` : "none",
        ...containerStyle,
      }}
    >
      <div>
        <div className="arrows-container">
          <button
            onClick={goToPreviousMonth}
            style={{ backgroundColor: "transparent", borderWidth: 0 }}
          >
            <span>
              <i
                className="fa-solid fa-arrow-left"
                style={{ color: textColor }}
              ></i>
            </span>
          </button>
          <span
            style={{
              color: textColor,
              textShadow: "none",
            }}
          >
            {`${currentMonth.toLocaleString("default", {
              month: "long",
            })} ${currentMonth.getFullYear()}`}
          </span>
          <button
            onClick={goToNextMonth}
            style={{ backgroundColor: "transparent", borderWidth: 0 }}
          >
            <span>
              <i
                className="fa-solid fa-arrow-right"
                style={{ color: textColor }}
              ></i>
            </span>
          </button>
        </div>
      </div>

      <div>
        {GuildComponent && (
          <div
            className="month-details-container--header-container"
            style={{
              backgroundColor: theme === "light" ? "lightGray" : "#383838",
              border: borderColor ? `1px solid ${borderColor}` : "none",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <i className="material-icons" style={{ color: "lightBlue" }}>
              info
            </i>
            <div className="place-middle">{GuildComponent}</div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(7, 1fr)`,
            gridTemplateRows: "auto",
            padding: "1% 2%",
            backgroundColor: "#38383822",
          }}
        >
          {renderDayHeaders()}
        </div>
        <div
          style={{
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            padding: "2%",
            position: "relative",
          }}
        >
          {loading
            ? new Array(5).fill("").map((_, i) => (
                <div
                  key={i}
                  className="skeleton"
                  style={{
                    height: "15px",
                    width: "90%",
                    marginTop: "10px",
                  }}
                ></div>
              ))
            : renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default ReactMultiDateRange;
