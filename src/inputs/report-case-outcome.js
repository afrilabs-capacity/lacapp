import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

const ReportCaseOutcome = (props) => {
  const { formik, name } = props;
  const { updateReport } = useContext(MreportProvider.Context);

  const reportCaseOutcome = [
    { value: "Struck Out", key: "1", text: "Struck Out" },
    { value: "Adjourned", key: "2", text: "Adjourned" },
    { value: "Legal Advice", key: "3", text: "Legal Advice" },
    { value: "Unstated", key: "4", text: "Unstated" },
    { value: "Convicted", key: "5", text: "Convicted" },
    { value: "Discharge", key: "6", text: "Discharge" },
    { value: "Discharge/Acquited", key: "7", text: "Discharge/Acquited" },
  ];

  return (
    <>
      <select
        onChange={(e) => {
          updateReport("case_outcome", e.target.value);
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.case_outcome}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {reportCaseOutcome.map((item) => (
          <option key={item.key} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </>
  );
};
export default ReportCaseOutcome;
