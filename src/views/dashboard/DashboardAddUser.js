import React, { useEffect, useContext, useState } from "react";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
  CPagination,
  CButton,
} from "@coreui/react";
import UserProvider from "../../context/UserContext";
import UserRole from "../../inputs/user-role";
import { useFormik } from "formik";
import * as Yup from "yup";
import usersData from "../../views/users/UsersData";
import Paginations from "../../pagination/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "../../modals/login-modal";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import UserZone from "../../inputs/user-zones";
import UserState from "../../inputs/user-states-id";
import TextError from "../../formik-wrappers/TextError";
import UserCentre from "../../inputs/user-centres-id";
import UserMonthly from "../../inputs/user-for-monthly";
import UserGender from "../../inputs/user-gender";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const DashboardAddUser = () => {
  const {
    toast,
    fetchUsersApi,
    fetchZonesApi,
    users,
    setUser,
    addUserApi,
    errors,
    deleteUserApi,
    apiAction,
    fetchingFailMsg,
    pagination,
  } = useContext(UserProvider.Context);

  const [addUserFormActive, setAddUserFormActive] = useState(true);

  useEffect(() => {
    fetchUsersApi();
    fetchZonesApi();
  }, []);

  const Styles = {
    errorColor: {
      color: "red",
    },
  };

  const styles = {
    noBorder: {
      border: "none",
    },
    noBorderTop: {
      borderBTop: "none",
    },
    cardStyle: {
      boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
      transition: "0.3s",
      border: "none",
    },
  };

  const formik = useFormik({
    initialValues: {
      names: "",
      email: "",
      status: "",
      qualification: "",
      state_id: "",
      zone_id: "",
      centre_id: "",
      gl: "",
      sex: "",
      phone: "",
      role: "lawyer",
      monthly_report: "No",
    },
    validationSchema: Yup.object({
      names: Yup.string()
        .max(15, "Must be 7 characters or less")
        .required("Name field required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      status: Yup.string().required("Required"),
      qualification: Yup.string().required("Required"),
      state_id: Yup.number().integer().required("Required"),
      zone_id: Yup.number().integer().required("Required"),
      centre_id: Yup.number().integer(),
      gl: Yup.number()
        .integer()
        .typeError("you must specify a number")
        .required("Required"),
      sex: Yup.string().required("Required"),
      phone: Yup.number()
        .integer()
        .typeError("you must specify numbers only")
        .required("Required"),
      monthly_report: Yup.string().required("Required"),
      role: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      //setUser(values)
      addUserApi(values);
      //alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    // currentPage !== page && setPage(currentPage)
    console.log("user formik values", formik.values);
  }, [formik.values]);

  return (
    <>
      <CRow>
        <CCol md="12" className="pt-2 bg-white">
          {addUserFormActive ? (
            <CRow>
              <CCol xl={5} className="col-centered">
                <CRow className="text-center mb-4 mt-1">
                  <CCol>
                    <h1 className="text-center btn-site-theme">
                      New User Form
                    </h1>
                  </CCol>
                </CRow>
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol xl={6}>Add User</CCol>

                      <CCol xl={6} className="text-right">
                        <button
                          className="btn  px-4 btn-site-theme-bg"
                          disabled={apiAction}
                          onClick={() =>
                            setAddUserFormActive((prev) => (prev = !prev))
                          }
                        >
                          Users
                        </button>
                      </CCol>
                    </CRow>
                  </CCardHeader>

                  <CCardBody>
                    <form onSubmit={formik.handleSubmit}>
                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="name">Names</CLabel>
                            <CInput
                              name="names"
                              placeholder="Enter names here"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.names}
                            />
                          </CFormGroup>
                          {formik.touched.names && formik.errors.names ? (
                            <>
                              <div style={Styles.errorColor}>
                                {formik.errors.names}
                              </div>
                              <br />
                            </>
                          ) : (
                            <></>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="ccnumber">Email</CLabel>
                            <CInput
                              type="email"
                              name="email"
                              placeholder="Enter email here.."
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                            />
                          </CFormGroup>
                          {formik.touched.email && formik.errors.email ? (
                            <div style={Styles.errorColor}>
                              {formik.errors.email}
                            </div>
                          ) : (
                            <></>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="name">Status</CLabel>
                            <CInput
                              name="status"
                              placeholder="Enter status here"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.status}
                            />
                          </CFormGroup>
                          {formik.touched.status && formik.errors.status ? (
                            <>
                              <div style={Styles.errorColor}>
                                {formik.errors.status}
                              </div>
                              <br />
                            </>
                          ) : (
                            <></>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="name">Qualification</CLabel>
                            <CInput
                              name="qualification"
                              placeholder="Enter qualification here"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.qualification}
                            />
                          </CFormGroup>
                          {formik.touched.qualification &&
                          formik.errors.qualification ? (
                            <>
                              <div style={Styles.errorColor}>
                                {formik.errors.qualification}
                              </div>
                              <br />
                            </>
                          ) : (
                            <></>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="name">GL</CLabel>
                            <CInput
                              name="gl"
                              placeholder="Enter GL here"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.gl}
                            />
                          </CFormGroup>
                          {formik.touched.gl && formik.errors.gl ? (
                            <>
                              <div style={Styles.errorColor}>
                                {formik.errors.gl}
                              </div>
                              <br />
                            </>
                          ) : (
                            <></>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel
                              htmlFor="ccnumber"
                              className="font-weight-bold"
                            >
                              Sex
                            </CLabel>
                            <UserGender formik={formik} name="sex" />
                          </CFormGroup>
                          {formik.touched.sex && formik.errors.sex && (
                            <TextError>{formik.errors.sex}</TextError>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel htmlFor="name">Phone</CLabel>
                            <CInput
                              name="phone"
                              placeholder="Enter phone here"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.phone}
                            />
                          </CFormGroup>
                          {formik.touched.phone && formik.errors.phone ? (
                            <>
                              <div style={Styles.errorColor}>
                                {formik.errors.phone}
                              </div>
                              <br />
                            </>
                          ) : (
                            <></>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel
                              htmlFor="ccnumber"
                              className="font-weight-bold"
                            >
                              Zone
                            </CLabel>
                            <UserZone formik={formik} name="zone_id" />
                          </CFormGroup>
                          {formik.touched.zone_id && formik.errors.zone_id && (
                            <TextError>{formik.errors.zone_id}</TextError>
                          )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel
                              htmlFor="ccnumber"
                              className="font-weight-bold"
                            >
                              State
                            </CLabel>
                            <UserState formik={formik} name="state_id" />
                          </CFormGroup>
                          {formik.touched.state_id &&
                            formik.errors.state_id && (
                              <TextError>{formik.errors.state_id}</TextError>
                            )}
                        </CCol>
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel
                              htmlFor="ccnumber"
                              className="font-weight-bold"
                            >
                              Centre
                            </CLabel>
                            <UserCentre formik={formik} name="centre_id" />
                          </CFormGroup>
                          {formik.touched.centre_id &&
                            formik.errors.centre_id && (
                              <TextError>{formik.errors.centre_id}</TextError>
                            )}
                        </CCol>
                      </CRow>

                      <CRow className="text-center">
                        <CCol xs="12">
                          <UserRole formik={formik} name="role" />
                        </CCol>
                      </CRow>

                      <CRow className="text-center mt-2">
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel
                              htmlFor="ccnumber"
                              className="font-weight-bold"
                            >
                              Enable user for monthly report
                            </CLabel>
                            <UserMonthly
                              formik={formik}
                              name="monthly_report"
                            />
                          </CFormGroup>
                          {formik.touched.monthly_report &&
                            formik.errors.monthly_report && (
                              <TextError>
                                {formik.errors.monthly_report}
                              </TextError>
                            )}
                        </CCol>
                      </CRow>

                      <CRow className="text-center">
                        <CCol xs="12">
                          {apiAction ? (
                            <button
                              className="btn btn-site-theme-bg px-4 w-100"
                              disabled={apiAction}
                            >
                              <span
                                className="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              &nbsp;Loading...
                            </button>
                          ) : (
                            <button
                              className="btn btn-site-theme-bg px-4 w-100"
                              disabled={apiAction}
                            >
                              Add
                            </button>
                          )}
                          <div style={{ color: "red" }} className="mt-2">
                            {errors.length ? (
                              <h3>Submission contains errors</h3>
                            ) : (
                              ""
                            )}
                            {errors.length
                              ? errors.map((error, i) => (
                                  <p key={i} className="text-left">
                                    {error}
                                  </p>
                                ))
                              : ""}
                          </div>
                        </CCol>
                      </CRow>
                    </form>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            <></>
          )}

          {!addUserFormActive ? (
            <CRow>
              <CCol xl={12}>
                <CCard>
                  <CCardHeader style={styles.noBorder}>
                    <CRow className="mt-4">
                      <CCol md="8">
                        Attendees | Showing Page{" "}
                        <b>{users.length ? pagination.from : ""}</b>-
                        <b>{users.length ? pagination.to : ""}</b> of{" "}
                        <b>{users.length ? pagination.total : ""}</b> Results
                      </CCol>

                      <CCol md="4 text-right ">
                        <button
                          className="btn  px-4 btn-site-theme-bg"
                          disabled={apiAction}
                          onClick={() =>
                            setAddUserFormActive((prev) => (prev = !prev))
                          }
                        >
                          Add User
                        </button>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <table
                      className="table table-hover  mb-2 d-none d-sm-table w-100"
                      style={{ border: "none" }}
                    >
                      <thead>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Registered</th>
                        <th>Role</th>
                        <th>Trash</th>
                        <th>View</th>
                      </thead>
                      <tbody>
                        {users.length
                          ? users.map((user) => (
                              <tr>
                                <td className="pd-2">{user.names}</td>
                                <td className="pd-2">{user.email}</td>
                                <td className="pd-2">{user.registered}</td>
                                <td className="pd-2">{user.role}</td>
                                <td className="pd-2">
                                  {
                                    <FontAwesomeIcon
                                      style={{
                                        color: "red",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => deleteUserApi(user.id)}
                                      icon={faTrash}
                                    />
                                  }
                                </td>
                                <td>
                                  <div className="clearfix">
                                    <div className="float-left">
                                      <a href={"/user/" + user.id}>
                                        <span>
                                          <FontAwesomeIcon icon={faEye} />
                                        </span>
                                      </a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          : ""}
                      </tbody>
                    </table>
                    {!users.length && apiAction && (
                      <h3 className="mb-4">Loading..</h3>
                    )}

                    {!users.length && fetchingFailMsg !== null && (
                      <h3 className="mb-4">{fetchingFailMsg}</h3>
                    )}

                    {users.length ? (
                      <Paginations context={UserProvider.Context} />
                    ) : (
                      ""
                    )}
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            <></>
          )}
          <LoginModal context={UserProvider.Context} />
        </CCol>
      </CRow>
    </>
  );
};

export default DashboardAddUser;
