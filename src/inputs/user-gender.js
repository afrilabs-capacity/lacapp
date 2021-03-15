import React, { useContext } from "react";
import UserProvider from "../context/UserContext";

const UserGender = (props) => {
  const { formik, name } = props;
  const { updateReport } = useContext(UserProvider.Context);

  const genders = [
    { value: "male", key: "1", text: "Male" },
    { value: "male", key: "2", text: "Female" },
  ];

  return (
    <>
      <select
        onChange={(e) => {
          return formik.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        value={formik.values.sex}
        className="form-control"
        name={name}
      >
        <option value="" disabled>
          Select
        </option>
        {genders.map((gender) => (
          <option key={gender.key} value={gender.value}>
            {gender.text}
          </option>
        ))}
      </select>
    </>
  );
};
export default UserGender;
