import React, { useContext, useEffect } from "react";
import UserProvider from "../context/UserContext";

const UserMonthly = (props) => {
  const { formik, name } = props;
  const { user, updateUser } = useContext(UserProvider.Context);

  let articleStatus;

  useEffect(() => {
    //alert(user)
  }, [formik.values.role]);

  return (
    <div className={""}>
      <label>Yes&nbsp;</label>
      <input
        type="radio"
        name={name}
        checked={formik.values.monthly_report == "Yes" ? true : false}
        value="Yes"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <label>&nbsp;&nbsp;&nbsp;No &nbsp;</label>
      <input
        type="radio"
        name={name}
        value="No"
        checked={formik.values.monthly_report == "No" ? true : false}
        onChange={formik.handleChange}
      />
    </div>
  );
};
export default UserMonthly;
