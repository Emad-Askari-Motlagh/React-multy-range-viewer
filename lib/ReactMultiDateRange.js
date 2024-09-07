"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./ReactMultiDateRange.css");
var md_1 = require("react-icons/md");
var fa_1 = require("react-icons/fa");
// Utility functions to handle date manipulations
var cloneDate = function (date) { return new Date(date.getTime()); };
var addMonths = function (date, months) {
    return new Date(date.setMonth(date.getMonth() + months));
};
var subtractMonths = function (date, months) {
    return new Date(date.setMonth(date.getMonth() - months));
};
var startOfMonth = function (date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};
var endOfMonth = function (date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};
var isSameDay = function (d1, d2) {
    return d1.toDateString() === d2.toDateString();
};
var isBetween = function (date, startDate, endDate) {
    return date >= startDate && date <= endDate;
};
var ReactMultiDateRange = function (_a) {
    var handleRangeClick = _a.handleRangeClick, onShownDateChange = _a.onShownDateChange, GuildComponent = _a.GuildComponent, loading = _a.loading, theme = _a.theme, activeDate = _a.activeDate, data = _a.data, beginDayOfWeek = _a.beginDayOfWeek, backgroundColor = _a.backgroundColor, textColor = _a.textColor, borderColor = _a.borderColor, containerStyle = _a.containerStyle, width = _a.width, guidHeaderColor = _a.guidHeaderColor, guidComponentStyle = _a.guidComponentStyle;
    var _b = (0, react_1.useState)(activeDate !== null && activeDate !== void 0 ? activeDate : new Date()), currentMonth = _b[0], setCurrentMonth = _b[1];
    var goToPreviousMonth = function () {
        setCurrentMonth(cloneDate(subtractMonths(cloneDate(currentMonth), 1)));
    };
    var goToNextMonth = function () {
        setCurrentMonth(cloneDate(addMonths(cloneDate(currentMonth), 1)));
    };
    (0, react_1.useEffect)(function () {
        onShownDateChange(currentMonth);
    }, [currentMonth, onShownDateChange]);
    var getWeekOfMonth = function (date) {
        var startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        var firstDayOfWeek = beginDayOfWeek === "monday"
            ? (startOfMonth.getDay() + 6) % 7
            : startOfMonth.getDay(); // Monday = 0, Sunday = 6
        var dayOfMonth = date.getDate();
        return Math.ceil((dayOfMonth + firstDayOfWeek) / 7) - 1;
    };
    var renderCalendar = function () {
        var weeks = [];
        var startOfCurrentMonth = startOfMonth(currentMonth);
        var endOfCurrentMonth = endOfMonth(currentMonth);
        var cellTextColor = textColor;
        var currentDate = cloneDate(startOfCurrentMonth);
        var _loop_1 = function () {
            var color = "transparent";
            var firstDayInRange = false;
            var lastDayInRange = false;
            var textColor_1 = cellTextColor;
            var rangeObj = null; // To store the range that contains the current day
            data.forEach(function (range) {
                var start = range.startDate;
                var end = range.endDate;
                if (isSameDay(start, currentDate) ||
                    isSameDay(end, currentDate) ||
                    isBetween(currentDate, start, end)) {
                    firstDayInRange = isSameDay(start, currentDate);
                    lastDayInRange = isSameDay(end, currentDate);
                    color = range.color || "transparent";
                    textColor_1 = range.cellTextColor,
                        rangeObj = range; // Set the rangeObj to the current range
                }
            });
            var weekNumber = getWeekOfMonth(currentDate);
            if (!weeks[weekNumber]) {
                weeks[weekNumber] = [];
            }
            weeks[weekNumber].push(react_1.default.createElement("div", { key: currentDate.toDateString(), style: {
                    padding: 0,
                    height: "30px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "3px 0",
                    backgroundColor: color,
                    color: textColor_1,
                    width: !firstDayInRange || !lastDayInRange ? "100%" : "70%",
                    borderRadius: 0,
                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                    borderTopLeftRadius: firstDayInRange ? "20px" : "initial",
                    borderBottomLeftRadius: firstDayInRange ? "20px" : "initial",
                    borderTopRightRadius: lastDayInRange ? "20px" : "initial",
                    borderBottomRightRadius: lastDayInRange ? "20px" : "initial",
                    fontWeight: "bold",
                    filter: !firstDayInRange && !lastDayInRange
                        ? "contrast(80%)"
                        : "contrast(100%)",
                }, onClick: function () {
                    if (rangeObj)
                        handleRangeClick(rangeObj);
                } }, currentDate.getDate()));
            currentDate = addMonths(cloneDate(currentDate), 0); // Advance by 1 day
            currentDate.setDate(currentDate.getDate() + 1);
        };
        while (currentDate <= endOfCurrentMonth) {
            _loop_1();
        }
        return weeks.map(function (week, index) { return (react_1.default.createElement("div", { key: index, style: {
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "0.2px",
            } }, week)); });
    };
    var renderDayHeaders = function () {
        var days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        var adjustedDays = beginDayOfWeek === "monday" ? __spreadArray(__spreadArray([], days.slice(1), true), [days[0]], false) : days;
        return adjustedDays.map(function (day, index) {
            return (react_1.default.createElement("div", { key: index, style: {
                    padding: "10px",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: textColor,
                } }, day.slice(0, 2)));
        });
    };
    return (react_1.default.createElement("div", { className: "month-details-container", style: __assign({ width: width ? width : "initial", margin: "auto", position: "relative", backgroundColor: backgroundColor, border: borderColor ? "1px solid ".concat(borderColor) : "none" }, containerStyle) },
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "arrows-container" },
                react_1.default.createElement("button", { onClick: goToPreviousMonth, style: { backgroundColor: "transparent", borderWidth: 0 } },
                    react_1.default.createElement("span", null,
                        react_1.default.createElement(md_1.MdOutlineKeyboardArrowLeft, { size: 29, color: textColor }))),
                react_1.default.createElement("span", { style: {
                        color: textColor,
                        textShadow: "none",
                    } }, "".concat(currentMonth.toLocaleString("default", {
                    month: "long",
                }), " ").concat(currentMonth.getFullYear())),
                react_1.default.createElement("button", { onClick: goToNextMonth, style: { backgroundColor: "transparent", borderWidth: 0 } },
                    react_1.default.createElement("span", null,
                        react_1.default.createElement(md_1.MdOutlineKeyboardArrowRight, { size: 29, color: textColor }))))),
        react_1.default.createElement("div", { style: guidComponentStyle },
            GuildComponent && (react_1.default.createElement("div", { className: "month-details-container--header-container" },
                react_1.default.createElement(fa_1.FaInfo, { color: "#49b4b8", size: 22, style: { marginRight: "3px" } }),
                react_1.default.createElement("div", { className: "place-middle" }, GuildComponent))),
            react_1.default.createElement("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gridTemplateRows: "auto",
                    padding: "1% 2%",
                    backgroundColor: "#38383822",
                } }, renderDayHeaders()),
            react_1.default.createElement("div", { style: {
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    padding: "2%",
                    position: "relative",
                } }, loading
                ? new Array(5).fill("").map(function (_, i) { return (react_1.default.createElement("div", { key: i, className: "skeleton", style: {
                        height: "15px",
                        width: "90%",
                        marginTop: "10px",
                    } })); })
                : renderCalendar()))));
};
exports.default = ReactMultiDateRange;
