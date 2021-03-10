import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

const ReportState = (props) => {
  const { formik, name } = props;
  const { myState, updateReport } = useContext(MreportProvider.Context);

  return (
    <>
      <select
        onChange={(e) => {
          updateReport("state_of_origin", e.target.value);
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.state_of_origin}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {myState.map((item) => (
          <option key={item.id} value={item.id}>
            {item.state}
          </option>
        ))}
      </select>
    </>
  );
};
export default ReportState;
