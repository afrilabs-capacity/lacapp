import React, { useContext } from "react";
import UserProvider from "../context/UserContext";

const UserZone = (props) => {
  const { formik, name } = props;
  const { myZones, fetchStatesApi } = useContext(UserProvider.Context);

  return (
    <>
      <select
        onChange={(e) => {
          fetchStatesApi(e.target.value);
          formik.setFieldValue("state_id", "");
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.zone_id}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {myZones.map((item) => (
          <option key={item.id} value={item.id}>
            {item.zone}
          </option>
        ))}
      </select>
    </>
  );
};
export default UserZone;
