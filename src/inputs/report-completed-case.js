import React, { useContext } from "react";
import MreportProvider from "../context/MreportContext";

function ReportCompletedCase(props) {
  const { formik, name } = props;

  const { updateReport } = useContext(MreportProvider.Context);

  const reportCompletedCase = [
    { key: "1", value: "yes" },
    { key: "2", value: "No" },
  ];

  return (
    <>
      <div className="d-flex flex-row justify-content-center">
        {reportCompletedCase.map((option) => {
          return (
            <div key={option.key} style={{ margin: "1em" }}>
              <label htmlFor={option.value}>{option.value} </label>
              &nbsp;
              <input
                name={name}
                type="radio"
                onChange={(e) => {
                  updateReport("completed_case", e.target.value);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlue}
                value={option.value}
                checked={formik.values.completed_case == option.value}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ReportCompletedCase;
