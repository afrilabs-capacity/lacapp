import React, { useContext, useEffect, useState } from "react";
import MreportProvider from "../context/MreportContext";

const ReportAge = (props) => {
  const { formik, name } = props;
  const { updateReport } = useContext(MreportProvider.Context);
  let ageStart = 18;
  let ageEnd = 99;
  let ageList = [];

  const [ages, setAges] = useState([{ value: 18, key: 18, text: 18 }]);

  const generateAges = () => {
    while (ageStart < ageEnd) {
      ageStart++;
      //setAges(prevstste=>[...prevstste,{value:ageStart,key:ageStart,text:ageStart} ])
      ageList.push({ value: ageStart, key: ageStart, text: ageStart });
    }
    setAges((prevstate) => [...prevstate, ...ageList]);
  };

  useEffect(() => {
    generateAges();
    //alert(ages.length)
  }, []);

  //console.log("ages", ages)
  return (
    <>
      <select
        onChange={(e) => {
          updateReport("age", e.target.value);
          return formik.handleChange(e);
        }}
        //onSelect={(e)=>updateReport("age", e.target.value)}
        onBlur={formik.handleBlur}
        value={formik.values.age}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {ages.length
          ? ages.map((age) => (
              <option key={age.key} value={age.value}>
                {age.text}
              </option>
            ))
          : ""}
      </select>
    </>
  );
};
export default ReportAge;
