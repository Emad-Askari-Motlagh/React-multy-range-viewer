import React from "react";
import RangeViewer from "./RangeViewer";
import moment from "moment";

const App = () => {
  const data = [
    {
      startDate: moment(),
      endDate: moment().add(2, 'days'),
      colors: ["red", "red"],
      key: "1",
      type: "leave",
      color: "red",
    },
    {
      startDate: moment().add(10, 'days'),
      endDate: moment().add(12, 'days'),
      colors: ["red", "red"],
      key: "2",
      type: "WorkTime",
      color: "orange",
    },
  ];

  return (
    <div style={{ height: "500px", width: "700px" ,margin:'auto'}}>
      <RangeViewer
        loading={false}
        activeDate={moment()}
        cellColor="white"
        onShownDateChange={(date) => console.log("Date changed:", date)}
        data={data}
        beginDayOfWeek={'Monday'} //'Sunday' or 'Monday'
        GuildComponent={<GuildComponent theme="dark"/>}
      />
    </div>
  );
};

export default App;
const GuildComponent = ({ theme }: { theme: string | undefined }) => (
  <div
    className="guid-colors-parent"
    style={{
      color: theme === 'dark' ? 'whiteSmoke' : '#585858',
      fontWeight: 'bold',
    }}
  >
    <span>
      <span className="guid-colors1"></span>
      <span>Arbete</span>
    </span>
    <span>
      <span className="guid-colors2"></span>
      <span>Sjuk</span>
    </span>
    <span>
      <span className="guid-colors3"></span>
      <span>Semester</span>
    </span>
    <span>
      <span className="guid-colors4"></span>
      <span>Vab</span>
    </span>
  </div>
)