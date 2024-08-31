import React, { useEffect, useState } from "react";
import moment from "moment";
import "./RangeViewer.css"; // Adjust the import path as needed
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { FaInfo } from "react-icons/fa";
type BeginDayOfWeek = 'Sunday' | 'Monday';

interface SelectionType {
  startDate: Date;
  endDate: Date;
  key: string;
  autoFocus?: boolean;
  colors?: [string, string];
  __typename?: string;
  leaveType?: string;
  type?: string;
  color?: string;
  disabled?: boolean;
  showDateDisplay?: boolean;
  
}


interface InputData {
  startDate: moment.Moment;
  endDate: moment.Moment;
  colors: Array<string>;
  key: string;
  type: string;
  color: string;
}

interface StaticDatePickerProps {
  label?: string;
  loading: boolean;
  theme?: string;
  GuildComponent?: JSX.Element;
  cellColor: string;
  handleDayClick?: (item: any) => void;
  onShownDateChange: (date: moment.Moment) => void;
  activeDate: moment.Moment;
  data: InputData[];
  beginDayOfWeek:BeginDayOfWeek
}

const RangeViewer = ({
  label,

  handleDayClick,
  onShownDateChange,
  GuildComponent,
  loading,
  cellColor,
  theme,
  activeDate,
  data,
  beginDayOfWeek
}: StaticDatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(activeDate ?? moment());
  const [extendedLoading, setExtendedLoading] = useState(false);


  const goToPreviousMonth = () => {
    const nextMonth = currentMonth.clone().subtract(1, "month");
    setCurrentMonth(nextMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = currentMonth.clone().add(1, "month");
    setCurrentMonth(nextMonth);
  };

  useEffect(() => {
    onShownDateChange(currentMonth);
  }, [currentMonth, onShownDateChange]);



  const getWeekOfMonth = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek =beginDayOfWeek==='Monday'? (startOfMonth.getDay() + 6) % 7:startOfMonth.getDay(); // Monday = 0, Sunday = 6
    const dayOfMonth = date.getDate();
    return Math.ceil((dayOfMonth + firstDayOfWeek) / 7) - 1;
  };

 const renderCalendar = () => {
  const weeks: JSX.Element[][] = [];
  const startOfMonth = currentMonth.clone().startOf("month");
  const endOfMonth = currentMonth.clone().endOf("month");

  let currentDate = startOfMonth.clone();

  while (currentDate.isSameOrBefore(endOfMonth, "day")) {
    let color = "transparent";
    let firstDayInRange = false;
    let lastDayInRange = false;

    data.forEach((e) => {
      const start = moment(e.startDate);
      const end = moment(e.endDate);
      if (
        start.isSame(currentDate, "day") ||
        end.isSame(currentDate, "day") ||
        currentDate.isBetween(start, end, null, "[]")
      ) {
        firstDayInRange = start.isSame(currentDate, "day");
        lastDayInRange = end.isSame(currentDate, "day");
        color = e.color || "transparent"; // Default to transparent if color is undefined
      }
    });

    const weekNumber = getWeekOfMonth(currentDate.toDate());

    if (!weeks[weekNumber]) {
      weeks[weekNumber] = [];
    }

    weeks[weekNumber].push(
      <div
        key={currentDate.format("YYYY-MM-DD")}
        style={{
          padding: 0,
          height: "30px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "3px 0",
          backgroundColor: color,
          color: cellColor,
          width: !firstDayInRange || !lastDayInRange ? "100%" : "70%",
          borderRadius: 0,
          boxShadow: "rgba(0, 0, 0, 0.03) 0px 1px 3px 0px, rgba(0, 0, 0, 0.03) 0px 1px 2px 0px",
          borderTopLeftRadius: firstDayInRange ? "20px" : "initial",
          borderBottomLeftRadius: firstDayInRange ? "20px" : "initial",
          borderTopRightRadius: lastDayInRange ? "20px" : "initial",
          borderBottomRightRadius: lastDayInRange ? "20px" : "initial",
         
      
          fontWeight: "bold",
          filter:  !firstDayInRange && !lastDayInRange ? "contrast(80%)" : "contrast(100%)"
        }}
        // onClick={() => handleDayClick(range)}
      >
        {currentDate.format("DD")}
      </div>
    );

    currentDate = currentDate.clone().add(1, "day");
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
    const days = moment.weekdaysMin(); // Get short day names starting with Sunday
    const adjustedDays =beginDayOfWeek==='Monday'? [...days.slice(1), days[0]]:days; // Move Sunday to the end
    return adjustedDays.map((day, index) => {
      return (
        <div
          key={index}
          style={{
            padding: "10px",
            textAlign: "center",
            fontWeight: "bold",
            color: cellColor,
          }}
        >
          {day}
        </div>
      );
    });
  };

  return (
    <div className="month-details-container" style={{ position: "relative" }}>
      <div>
        <div className="arrows-container">
          <button
            onClick={goToPreviousMonth}
            style={{ backgroundColor: "transparent", borderWidth: 0 }}
          >
            <span>
              <MdOutlineKeyboardArrowLeft size={29} />
            </span>
          </button>
          <span style={{ color: cellColor, textShadow: "none" }}>
            {`${moment(currentMonth).format("MMMM YYYY")}`}
          </span>
          <button
            onClick={goToNextMonth}
            style={{ backgroundColor: "transparent", borderWidth: 0 }}
          >
            <span>
              <MdOutlineKeyboardArrowRight size={29} />
            </span>
          </button>
        </div>
      </div>

      <div className="users-container">
        <div
          className="month-details-container--header-container"
          style={{
            backgroundColor: theme === "light" ? "lightGray" : "#383838",
          }}
        >
          <FaInfo color="#49b4b8" size={22} style={{ marginRight: "3px" }} />
          <div className="place-middle">{GuildComponent}</div>
        </div>

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
          }}
        >
          {extendedLoading
            ? new Array(5).fill("").map((_, i) => (
                <div key={i} />
              ))
            : renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default RangeViewer;
