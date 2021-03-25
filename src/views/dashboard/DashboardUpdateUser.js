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
import UserTable from "../../inputs/user-table";
import { useParams, useLocation } from "react-router-dom";

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

const DashboardUpdateUser = () => {
  const {
    fetchZonesApi,
    errors,
    apiAction,
    fetchingFailMsg,
    fetchUserByIdApi,
    fetchStatesApi,
    fetchCentresApi,
    updateUserApi,
    user,
  } = useContext(UserProvider.Context);

  const { id } = useParams();

  const [addUserFormActive, setAddUserFormActive] = useState(true);

  useEffect(() => {
    //fetchUsersApi();
    fetchUserByIdApi(id);
    //fetchStatesApi(user);
    fetchZonesApi();
  }, []);

  useEffect(() => {
    user.zone_id > 0 && fetchStatesApi(user.zone_id);
    user.state_id > 0 && fetchCentresApi(user.state_id);
  }, [user]);

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
    enableReinitialize: true,
    initialValues: user,
    validationSchema: Yup.object({
      names: Yup.string()
        //.max(15, "Must be 7 characters or less")
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
      updateUserApi(values);
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
                      Update User Form
                    </h1>
                  </CCol>
                </CRow>
                <CCard>
                  {/* <CCardHeader>
                    <CRow>
                      <CCol xl={6}>Add User</CCol>
                    </CRow>
                  </CCardHeader> */}

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
                              Update
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

          <LoginModal context={UserProvider.Context} />
        </CCol>
      </CRow>
    </>
  );
};

export default DashboardUpdateUser;
