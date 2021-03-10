import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

const ReportCaseType = (props) => {
  const { formik, name } = props;

  const { updateReport } = useContext(MreportProvider.Context);

  const caseType = [
    { value: "Criminal", key: "1", text: "Criminal" },
    { value: "Civil", key: "2", text: "Civil" },
  ];

  return (
    <>
      <select
        onChange={(e) => {
          updateReport("case_type", e.target.value);
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.case_type}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {caseType.map((item) => (
          <option key={item.key} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </>
  );
};
export default ReportCaseType;
