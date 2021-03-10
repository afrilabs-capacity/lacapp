import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

const ReportResolution = (props) => {
  const { formik, name } = props;
  const { updateReport } = useContext(MreportProvider.Context);

  const reportResolution = [
    { value: "Mediation", key: "1", text: "Mediation" },
    { value: "Advice", key: "2", text: "Advice" },
    { value: "Unstated", key: "3", text: "Unstated" },
    { value: "Discharge/Acquited", key: "4", text: "Discharge/Acquited" },
  ];

  return (
    <>
      <select
        onChange={(e) => {
          updateReport("resolution", e.target.value);
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.resolution}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {reportResolution.map((item) => (
          <option key={item.key} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </>
  );
};
export default ReportResolution;
