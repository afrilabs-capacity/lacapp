import React, { useContext } from "react";
import UserProvider from "../context/UserContext";

const UserState = (props) => {
  const { formik, name } = props;
  const { myStates, fetchCentresApi } = useContext(UserProvider.Context);

  return (
    <>
      <select
        onChange={(e) => {
          fetchCentresApi(e.target.value);
          formik.setFieldValue("centre_id", "");
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.state_id}
        className="form-control"
        name={name}
      >
        <option value="" defaultValue disabled>
          Select
        </option>
        {myStates.map((item) => (
          <option key={item.id} value={item.id}>
            {item.state}
          </option>
        ))}
      </select>
    </>
  );
};
export default UserState;
