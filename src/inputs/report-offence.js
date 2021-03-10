import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

const ReportOffence = (props) => {
  const { formik, name } = props;
  const { updateReport } = useContext(MreportProvider.Context);

  const reportOffence = [
    { value: "Murder", key: "1", text: "Murder" },
    { value: "Grievous Harm", key: "2", text: "Grievous Harm" },
    { value: "Manslaughter", key: "3", text: "Manslaughter" },
    { value: "Armed Robbery", key: "4", text: "Armed Robbery" },
    { value: "Robbery", key: "5", text: "Robbery" },
    { value: "Culp. Hom. PWD", key: "6", text: "Accident" },
    { value: "Illegal Possession", key: "7", text: "Illegal Possession" },
    { value: "Stealing", key: "8", text: "Stealing" },
    { value: "Theft", key: "9", text: "Theft" },
    { value: "Accident", key: "10", text: "Accident" },
    { value: "Assault", key: "11", text: "Assault" },
    { value: "Kidnapping", key: "12", text: "Kidnapping" },
    { value: "Rape", key: "13", text: "Rape" },
    {
      value: "Assault Occ. Bodily Harm",
      key: "14",
      text: "Assault Occ. Bodily Harm",
    },
    { value: "Breach of Peace", key: "15", text: "Breach of Peace" },
    { value: "Mischief", key: "16", text: "Mischief" },
    {
      value: "Other Criminal Offence",
      key: "17",
      text: "Other Criminal Offence",
    },
  ];

  return (
    <>
      <select
        onChange={(e) => {
          updateReport("offence", e.target.value);
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.offence}
        className="form-control"
        name={name}
        id="my-offence-monthly"
      >
        <option value="" disabled>
          Select
        </option>
        {reportOffence.map((item) => (
          <option key={item.key} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </>
  );
};
export default ReportOffence;
