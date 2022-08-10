import React from "react";
import DateTimePicker from "react-datetime-picker";

function RunDatePicker(props) {
  const handleChange = (value) => {
    props.value.runDate = value;
    props.valueSetter({ ...props.value });
  };

  return (
    <React.Fragment>
      <div className="date-time-picker">
        <DateTimePicker
          monthAriaLabel="Month"
          onChange={handleChange}
          value={props.value.runDate}
          disableClock={true}
          calendarType="US"
          clearIcon={null}
          calendarIcon={null}
        />
      </div>
    </React.Fragment>
  );
}

export default RunDatePicker;
