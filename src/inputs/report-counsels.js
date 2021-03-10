import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

const ReportCounsel = (props) => {
  const { formik, name } = props;
  const { counsels, updateReport } = useContext(MreportProvider.Context);

  return (
    <>
      <select
        onChange={(e) => {
          updateReport("counsel_assigned", e.target.value);
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.counsel_assigned}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {counsels.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};
export default ReportCounsel;
