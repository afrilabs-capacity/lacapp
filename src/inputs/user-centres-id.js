import React, { useContext } from "react";
import UserProvider from "../context/UserContext";

const UserCentre = (props) => {
  const { formik, name } = props;
  const { myCentres } = useContext(UserProvider.Context);

  return (
    <>
      <select
        onChange={(e) => {
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.centre_id > 0 ? formik.values.centre_id : ""}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {myCentres.map((item) => (
          <option key={item.id} value={item.id}>
            {item.centre}
          </option>
        ))}
      </select>
    </>
  );
};
export default UserCentre;
