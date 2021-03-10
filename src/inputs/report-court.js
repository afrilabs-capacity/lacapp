import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

const ReportCourt = (props) => {
  const { formik, name } = props;
  const { updateReport } = useContext(MreportProvider.Context);

  const reportCourt = [
    { value: "Area Court", key: "1", text: "Area Court" },
    { value: "Magistrate Court", key: "2", text: "Magistrate Court" },
    { value: "Sharia Court", key: "3", text: "Sharia Court" },
    { value: "High Court", key: "4", text: "High Court" },
    {
      value: "Customary Court of Appeal",
      key: "5",
      text: "Customary Court of Appeal",
    },
    { value: "Legal Advice", key: "6", text: "Legal Advice" },
    { value: "Mediation", key: "7", text: "Mediation" },
  ];

  return (
    <>
      <select
        onChange={(e) => {
          updateReport("court", e.target.value);
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.court}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {reportCourt.map((item) => (
          <option key={item.key} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </>
  );
};
export default ReportCourt;
