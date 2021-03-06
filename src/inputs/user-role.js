import React, { useContext, useEffect } from "react";
import UserProvider from "../context/UserContext";

const UserRole = (props) => {
  const { formik, name } = props;
  const { user, updateUser } = useContext(UserProvider.Context);

  let articleStatus;

  useEffect(() => {
    //alert(user)
  }, [formik.values.role]);

  return (
    <div className={""}>
      <label>Administrator &nbsp;</label>
      <input
        type="radio"
        name={name}
        checked={formik.values.role == "admin" ? true : false}
        value="admin"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <label>&nbsp;&nbsp;&nbsp;Lawyer &nbsp;</label>
      <input
        type="radio"
        name={name}
        value="lawyer"
        checked={formik.values.role == "lawyer" ? true : false}
        onChange={formik.handleChange}
      />
    </div>
  );
};
export default UserRole;
