import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

const ReportOccupation = (props) => {
  const { formik, name } = props;
  const { updateReport } = useContext(MreportProvider.Context);

  const reportOccupation = [
    { value: "Business Man", key: "1", text: "Business Man" },
    { value: "Trader", key: "2", text: "Trader" },
    { value: "Farmer", key: "3", text: "Farmer" },
    { value: "Civil Servant", key: "4", text: "Civil Servant" },
    { value: "Retiree", key: "5", text: "Retiree" },
    { value: "NYSC", key: "6", text: "NYSC" },
    { value: "Unemployed", key: "7", text: "Unemployed" },
    { value: "HouseWife", key: "8", text: "HouseWife" },
    { value: "Student", key: "9", text: "Student" },
    { value: "Artisan", key: "10", text: "Artisan" },
    { value: "Driver", key: "11", text: "Driver" },
  ];

  return (
    <>
      <select
        onChange={(e) => {
          updateReport("occupation", e.target.value);
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.occupation}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {reportOccupation.map((item) => (
          <option key={item.key} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </>
  );
};
export default ReportOccupation;
