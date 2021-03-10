import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

const ReportComplaints = (props) => {
  const { formik, name } = props;
  const { updateReport } = useContext(MreportProvider.Context);

  const reportComplaints = [
    {
      value: "Employment/Labour Matters",
      key: "1",
      text: "Employment/Labour Matters",
    },
    {
      value: "Landlord/Tenant Matters",
      key: "2",
      text: "Landlord/Tenant Matters",
    },
    {
      value: "Fundamental Human Rights",
      key: "3",
      text: "Fundamental Human Rights",
    },
    { value: "Inheritance Matters", key: "4", text: "Inheritance Matters" },
    { value: "Matrimonial Matters", key: "5", text: "Matrimonial Matters" },
    { value: "Accident", key: "6", text: "Accident" },
    { value: "Defamation", key: "7", text: "Defamation" },
    { value: "Land Dispute", key: "8", text: "Land Dispute" },
    { value: "Death Benefit", key: "9", text: "Death Benefit" },
    {
      value: "Other Civil Complaint",
      key: "10",
      text: "Other Civil Complaint",
    },
  ];

  return (
    <>
      <select
        onChange={(e) => {
          updateReport("complaints", e.target.value);
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.complaints}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {reportComplaints.map((item) => (
          <option key={item.key} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </>
  );
};
export default ReportComplaints;
