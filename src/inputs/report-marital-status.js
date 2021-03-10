import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

const ReportMaritalStatus = (props) => {
  const { formik, name } = props;

  const { updateReport } = useContext(MreportProvider.Context);

  const marritalStatus = [
    { value: "Married", key: "1", text: "Married" },
    { value: "Single", key: "2", text: "Single" },
    { value: "Divorce", key: "3", text: "Divorce" },
    { value: "Widow", key: "4", text: "Widow" },
    { value: "Widower", key: "5", text: "Widower" },
  ];

  return (
    <>
      <select
        onChange={(e) => {
          updateReport("marital_status", e.target.value);
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.marital_status}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {marritalStatus.map((item) => (
          <option key={item.key} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </>
  );
};
export default ReportMaritalStatus;
