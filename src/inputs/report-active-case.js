import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

function ReportActiveCase(props) {
  const { formik, name } = props;

  const { updateReport } = useContext(MreportProvider.Context);

  const reportActiveCase = [
    { key: "1", value: "yes" },
    { key: "2", value: "No" },
  ];

  return (
    <>
      <div className="d-flex flex-row justify-content-center">
        {reportActiveCase.map((option) => {
          return (
            <div key={option.key} style={{ margin: "1em" }}>
              <label htmlFor={option.value}>{option.value} </label>
              &nbsp;
              <input
                name={name}
                type="radio"
                onChange={(e) => {
                  updateReport("active_case", e.target.value);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlue}
                value={option.value}
                checked={formik.values.active_case === option.value}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ReportActiveCase;
