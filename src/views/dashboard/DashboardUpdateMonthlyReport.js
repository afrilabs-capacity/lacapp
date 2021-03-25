import React, { useEffect, useContext, useState, lazy } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import TextError from "../../formik-wrappers/TextError";
import ReportGender from "../../inputs/report-gender";
import ReportAge from "../../inputs/report-age";
import ReportMaritalStatus from "../../inputs/report-marital-status";
import ReportOccupation from "../../inputs/report-occupation";
import ReportCaseType from "../../inputs/report-case-type";
import ReportOffence from "../../inputs/report-offence";
import ReportComplaints from "../../inputs/report-complaints";
import ReportState from "../../inputs/report-states";
import ReportCourt from "../../inputs/report-court";
import ReportGranted from "../../inputs/report-granted";
import ReportEligible from "../../inputs/report-eligible";
import ReportActiveCase from "../../inputs/report-active-case";
import ReportCounsel from "../../inputs/report-counsels";
import moment from "moment";

import * as Yup from "yup";
import {
  //   CBadge,
  //   CButton,
  //   CButtonGroup,
  CCard,
  CCardBody,
  //   CCardFooter,
  //   CCardHeader,
  CCol,
  //   CProgress,
  CRow,
  //   CCallout,
  //   CInputGroup,
  //   CInputGroupPrepend,
  //   CInputGroupText,
  CInput,
  CFormGroup,
  CLabel,
} from "@coreui/react";
// import CIcon from '@coreui/icons-react'
// import EditorJs from 'react-editor-js';

// import MainChartExample from '../charts/MainChartExample.js'
// import Paragraph from '../../api-classes/Paragraph'
// import RichText from '../../editor/RichText'
// import ImageUpload from '../../Uploaders/image-uploader'
//import ArticleProvider from "../../context/ArticleContext"
import MreportProvider from "../../context/MreportContext";
// import TitleInput from "../../inputs/title-input"
// import ArticleStatus from "../../inputs/article-status"
// import ArticleCategory from "../../inputs/article-category"
// import ToastMe from "../../alerts/toaster"
// import ModalMe from "../../modals/image-upload-modal"
// import Paginations from "../../pagination/pagination"
import LoginModal from "../../modals/login-modal";
// import UserRole from '../../inputs/user-role'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReportCompletedCase from "../../inputs/report-completed-case";
import ReportCaseOutcome from "../../inputs/report-case-outcome";
import ReportResolution from "../../inputs/report-resolution";
const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Styles = {
  link: {
    textDecoration: "underline",
    fontSize: "11px",
    color: "green",
  },
  Titles: {
    color: "black",
  },
  Theme: {
    background: "rgb(250, 252, 255)",
  },
  cardStyle: {
    // boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    border: "1px solid #eee",
    borderRadius: "3px",
  },
};

const DashboardUpdateMonthlyReport = (props) => {
  const { id } = useParams();
  const location = useLocation();
  const {
    counsels,
    myState,
    resetReport,
    setEditMode,
    setArticle,
    setCurrentReport,
    editMode,
    modal,
    setModal,
    report,
    updateReportApi,
    apiAction,
    fetchMonthlyConfigApi,
    caseType,
    monthlyReportCanReport,
    updateMonthlyReportApi,
    fetchReportByIdApi,
  } = useContext(MreportProvider.Context);

  const [dateCaseReceived, setDateCaseReceived] = useState("");
  const [dateCaseGranted, setDateCaseGranted] = useState("");
  const [dateCaseCompleted, setDateCaseCompleted] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: report !== null ? report : {},
    validationSchema: Yup.object({
      regno: Yup.string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits"),
      first_name: Yup.string().required("Field required"),
      last_name: Yup.string().required("Field required"),
      gender: Yup.string().required("Field required"),
      age: Yup.string().required("Field required"),
      marital_status: Yup.string().required("Field required"),
      occupation: Yup.string().required("Field required"),
      // state_of_origin: Yup.string()
      // .required('State of Origin field required'),
      case_type: Yup.string().required("Field required"),
      offence: Yup.string().when("case_type", {
        is: (val) => val == "Criminal",
        then: Yup.string().required("Field required"),
        is: (val) => val == "Civil",
        then: Yup.string().nullable(),
      }),
      complaints: Yup.string().when("case_type", {
        is: (val) => val == "Civil",
        then: Yup.string().required("Field required"),
        is: (val) => val == "Criminal",
        then: Yup.string().nullable(),
      }),
      state_of_origin: Yup.string().required("Field required"),
      court: Yup.string().required("Field required"),
      case_no: Yup.string().required("Field required"),
      granted: Yup.string().required('Granted? "Yes" or "No"?'),
      eligible: Yup.string().required('Eligible? "Yes" or "No"?'),
      active_case: Yup.string().required('Active Case? "Yes" or "No"?'),
      //date_case_received: Yup.date().default(null),
      date_case_received: Yup.date().required("Field required"),
      date_case_granted: Yup.date()
        .required("Field required")
        .when(
          "date_case_received",
          (date_case_received, yup) =>
            date_case_received &&
            yup
              .min(
                date_case_received,
                "Case granted date cannot be earlier than case received date"
              )
              .required("Case Received date field required")
        ),
      counsel_assigned: Yup.string().required("Field required"),
      date_case_completed: Yup.date().required("Field required"),
      completed_case: Yup.string().required('Completed Case"Yes" or "No"?'),
      case_outcome: Yup.string().required("Field required"),
      resolution: Yup.string().required("Field required"),
      //   role: Yup.string().required('Email address required'),
    }),

    onSubmit: (values) => {
      values.date_case_received = moment(dateCaseReceived).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      values.date_case_granted = moment(dateCaseGranted).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      values.date_case_completed = moment(dateCaseCompleted).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      updateReportApi(values);
      console.log("values", values);
    },
    // onChange:values=>{
    //     console.log("hi man")
    // }
  });

  //   console.log("Form Values",formik)
  useEffect(() => {
    fetchMonthlyConfigApi();
  }, []);

  useEffect(() => {
    // report.date_case_Received &&
    report.date_case_received !== undefined &&
      setDateCaseReceived(new Date(report.date_case_received));
  }, [report]);

  useEffect(() => {
    // report.date_case_Received &&
    report.date_case_granted !== undefined &&
      setDateCaseGranted(new Date(report.date_case_granted));
  }, [report]);

  useEffect(() => {
    // report.date_case_Received &&
    report.date_case_completed !== undefined &&
      setDateCaseCompleted(new Date(report.date_case_completed));
  }, [report]);

  useEffect(() => {
    fetchReportByIdApi(id);
  }, []);

  useEffect(() => {
    console.log("formik values", formik.errors);
  }, [formik.values]);

  useEffect(() => {
    const x = new Date("2013-05-23");
    const y = new Date("2013-05-23");
  }, [dateCaseReceived, dateCaseGranted]);

  return (
    <>
      {apiAction && <h1>Initializing..</h1>}

      {monthlyReportCanReport ? (
        <CRow>
          <CCol md="12" className="col-centered bg-white">
            <CRow className="text-center mb-4 mt-5">
              <CCol>
                <h1 className="text-center btn-site-theme">
                  Monthly Report Form
                </h1>
              </CCol>
            </CRow>
            <CCol md="8" className="col-centered pt-4">
              <CCard style={Styles.cardStyle}>
                <CCardBody>
                  <form onSubmit={formik.handleSubmit}>
                    <CRow>
                      <CCol xs="12">
                        <CFormGroup>
                          <CLabel htmlFor="name" className="font-weight-bold">
                            Reg No.
                          </CLabel>
                          <CInput
                            name="regno"
                            placeholder="Enter your name"
                            onChange={(e) => {
                              return formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.regno}
                          />
                        </CFormGroup>
                        {formik.touched.regno && formik.errors.regno && (
                          <TextError>{formik.errors.regno}</TextError>
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
                            First Name
                          </CLabel>
                          <CInput
                            name="first_name"
                            type="text"
                            placeholder="Enter first name here.."
                            onChange={(e) => {
                              return formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.first_name}
                          />
                        </CFormGroup>
                        {formik.touched.first_name &&
                          formik.errors.first_name && (
                            <TextError>{formik.errors.first_name}</TextError>
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
                            Last Name
                          </CLabel>
                          <CInput
                            name="last_name"
                            placeholder="Enter last name here.."
                            onChange={(e) => {
                              return formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.last_name}
                          />
                        </CFormGroup>
                        {formik.touched.last_name &&
                          formik.errors.last_name && (
                            <TextError>{formik.errors.last_name}</TextError>
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
                            Gender
                          </CLabel>
                          <ReportGender formik={formik} name="gender" />
                        </CFormGroup>
                        {formik.touched.gender && formik.errors.gender && (
                          <TextError>{formik.errors.gender}</TextError>
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
                            Age
                          </CLabel>
                          <ReportAge formik={formik} name="age" />
                        </CFormGroup>
                        {formik.touched.age && formik.errors.age && (
                          <TextError>{formik.errors.age}</TextError>
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
                            Marital Status
                          </CLabel>
                          <ReportMaritalStatus
                            formik={formik}
                            name="marital_status"
                          />
                        </CFormGroup>
                        {formik.touched.marital_status &&
                          formik.errors.marital_status && (
                            <TextError>
                              {formik.errors.marital_status}
                            </TextError>
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
                            Occupation
                          </CLabel>
                          <ReportOccupation formik={formik} name="occupation" />
                        </CFormGroup>
                        {formik.touched.occupation &&
                          formik.errors.occupation && (
                            <TextError>{formik.errors.occupation}</TextError>
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
                            Case Type
                          </CLabel>
                          <ReportCaseType formik={formik} name="case_type" />
                        </CFormGroup>
                        {formik.touched.case_type &&
                          formik.errors.case_type && (
                            <TextError>{formik.errors.case_type}</TextError>
                          )}
                      </CCol>
                    </CRow>

                    {caseType !== "" ? (
                      caseType == "Criminal" ? (
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel
                                htmlFor="ccnumber"
                                className="font-weight-bold"
                              >
                                Offence
                              </CLabel>
                              <ReportOffence formik={formik} name="offence" />
                            </CFormGroup>
                            {formik.touched.offence &&
                              formik.errors.offence && (
                                <TextError>{formik.errors.offence}</TextError>
                              )}
                          </CCol>
                        </CRow>
                      ) : (
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel
                                htmlFor="ccnumber"
                                className="font-weight-bold"
                              >
                                Complaints
                              </CLabel>
                              <ReportComplaints
                                formik={formik}
                                name="complaints"
                              />
                            </CFormGroup>
                            {formik.touched.complaints &&
                              formik.errors.complaints && (
                                <TextError>
                                  {formik.errors.complaints}
                                </TextError>
                              )}
                          </CCol>
                        </CRow>
                      )
                    ) : (
                      <></>
                    )}

                    {myState.length ? (
                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel
                              htmlFor="ccnumber"
                              className="font-weight-bold"
                            >
                              State of Origin
                            </CLabel>
                            <ReportState
                              formik={formik}
                              name="state_of_origin"
                            />
                          </CFormGroup>
                          {formik.touched.state_of_origin &&
                            formik.errors.state_of_origin && (
                              <TextError>
                                {formik.errors.state_of_origin}
                              </TextError>
                            )}
                        </CCol>
                      </CRow>
                    ) : (
                      <></>
                    )}

                    <CRow>
                      <CCol xs="12">
                        <CFormGroup>
                          <CLabel
                            htmlFor="ccnumber"
                            className="font-weight-bold"
                          >
                            Court
                          </CLabel>
                          <ReportCourt formik={formik} name="court" />
                        </CFormGroup>
                        {formik.touched.court && formik.errors.court && (
                          <TextError>{formik.errors.court}</TextError>
                        )}
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol xs="12">
                        <CFormGroup>
                          <CLabel htmlFor="name" className="font-weight-bold">
                            Case No.
                          </CLabel>
                          <CInput
                            name="case_no"
                            placeholder="Enter case number"
                            onChange={(e) => {
                              return formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.case_no}
                          />
                        </CFormGroup>
                        {formik.touched.case_no && formik.errors.case_no && (
                          <TextError>{formik.errors.case_no}</TextError>
                        )}
                      </CCol>
                    </CRow>

                    <CRow className="mt-4">
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel
                            htmlFor="ccnumber"
                            className="font-weight-bold"
                          >
                            Date Case Received
                          </CLabel>
                          <DatePicker
                            className="form-control"
                            name="date_case_received"
                            onBlur={formik.handleBlur}
                            placeholderText="dd/MM/yyyy"
                            dateFormat="dd/MM/yyyy"
                            value={dateCaseReceived}
                            selected={dateCaseReceived}
                            maxDate={new Date()}
                            autoComplete="off"
                            onChange={(date, e) => {
                              console.log("inside date", date);

                              setDateCaseReceived(date);
                              formik.setFieldValue("date_case_received", date);
                              formik.handleChange(e);
                            }}
                          />
                        </CFormGroup>
                        {formik.touched.date_case_received &&
                          formik.errors.date_case_received && (
                            <TextError>
                              {formik.errors.date_case_received}
                            </TextError>
                          )}
                      </CCol>

                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel
                            htmlFor="ccnumber"
                            className="font-weight-bold"
                          >
                            Date Case Granted
                          </CLabel>
                          <DatePicker
                            className="form-control"
                            name="date_case_granted"
                            onBlur={formik.handleBlur}
                            placeholderText="dd/MM/yyyy"
                            dateFormat="dd/MM/yyyy"
                            value={dateCaseGranted}
                            selected={dateCaseGranted}
                            disabled={dateCaseReceived ? false : true}
                            autoComplete="off"
                            onChange={(date, e) => {
                              console.log("inside date", date);

                              setDateCaseGranted(date);
                              formik.setFieldValue("date_case_granted", date);
                              formik.handleChange(e);
                            }}
                          />
                        </CFormGroup>
                        {formik.touched.date_case_granted &&
                          formik.errors.date_case_granted && (
                            <TextError>
                              {formik.errors.date_case_granted}
                            </TextError>
                          )}
                      </CCol>
                    </CRow>

                    <CRow className="mt-4">
                      <CCol xs="4 text-center">
                        <CFormGroup>
                          <CLabel
                            htmlFor="ccnumber"
                            className="font-weight-bold"
                          >
                            Granted
                          </CLabel>
                          <br />
                          <ReportGranted formik={formik} name="granted" />
                          {formik.touched.granted && formik.errors.granted && (
                            <TextError>{formik.errors.granted}</TextError>
                          )}
                        </CFormGroup>
                      </CCol>

                      <CCol xs="4 text-center">
                        <CFormGroup>
                          <CLabel
                            htmlFor="ccnumber"
                            className="font-weight-bold"
                          >
                            Eligible
                          </CLabel>
                          <br />
                          <ReportEligible formik={formik} name="eligible" />
                          {formik.touched.eligible &&
                            formik.errors.eligible && (
                              <TextError>{formik.errors.eligible}</TextError>
                            )}
                        </CFormGroup>
                      </CCol>

                      <CCol xs="4 text-center">
                        <CFormGroup>
                          <CLabel
                            htmlFor="ccnumber"
                            className="font-weight-bold"
                          >
                            Active Case
                          </CLabel>
                          <br />
                          <ReportActiveCase
                            formik={formik}
                            name="active_case"
                          />
                          {formik.touched.active_case &&
                            formik.errors.active_case && (
                              <TextError>{formik.errors.active_case}</TextError>
                            )}
                        </CFormGroup>
                      </CCol>
                    </CRow>

                    {counsels.length ? (
                      <CRow>
                        <CCol xs="12">
                          <CFormGroup>
                            <CLabel
                              htmlFor="ccnumber"
                              className="font-weight-bold"
                            >
                              Counsel Assigned
                            </CLabel>
                            <ReportCounsel
                              formik={formik}
                              name="counsel_assigned"
                            />
                          </CFormGroup>
                          {formik.touched.counsel_assigned &&
                            formik.errors.counsel_assigned && (
                              <TextError>
                                {formik.errors.counsel_assigned}
                              </TextError>
                            )}
                        </CCol>
                      </CRow>
                    ) : (
                      <></>
                    )}

                    <CRow>
                      <CCol xs="12">
                        <CFormGroup>
                          <CLabel htmlFor="name" className="font-weight-bold">
                            Case No.
                          </CLabel>
                          <CInput
                            name="case_no"
                            placeholder="Enter case number"
                            onChange={(e) => {
                              return formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.case_no}
                          />
                        </CFormGroup>
                        {formik.touched.case_no && formik.errors.case_no && (
                          <TextError>{formik.errors.case_no}</TextError>
                        )}
                      </CCol>
                    </CRow>

                    <CRow className="mt-4">
                      <CCol xs="6">
                        <CFormGroup>
                          <CLabel
                            htmlFor="ccnumber"
                            className="font-weight-bold"
                          >
                            Date Case Completed
                          </CLabel>
                          <DatePicker
                            className="form-control"
                            name="date_case_completed"
                            onBlur={formik.handleBlur}
                            placeholderText="dd/MM/yyyy"
                            dateFormat="dd/MM/yyyy"
                            value={dateCaseCompleted}
                            selected={dateCaseCompleted}
                            maxDate={new Date()}
                            autoComplete="off"
                            onChange={(date, e) => {
                              console.log("inside date", date);

                              setDateCaseCompleted(date);
                              formik.setFieldValue("date_case_completed", date);
                              formik.handleChange(e);
                            }}
                          />
                        </CFormGroup>
                        {formik.touched.date_case_completed &&
                          formik.errors.date_case_completed && (
                            <TextError>
                              {formik.errors.date_case_completed}
                            </TextError>
                          )}
                      </CCol>

                      <CCol xs="6 text-center">
                        <CFormGroup>
                          <CLabel
                            htmlFor="ccnumber"
                            className="font-weight-bold"
                          >
                            Completed Case
                          </CLabel>
                          <br />
                          <ReportCompletedCase
                            formik={formik}
                            name="completed_case"
                          />
                          {formik.touched.completed_case &&
                            formik.errors.completed_case && (
                              <TextError>
                                {formik.errors.completed_case}
                              </TextError>
                            )}
                        </CFormGroup>
                      </CCol>
                    </CRow>

                    <CRow className="mt-4">
                      <CCol xs="6 text-center">
                        <CFormGroup>
                          <CLabel
                            htmlFor="ccnumber"
                            className="font-weight-bold"
                          >
                            Case Outcome
                          </CLabel>
                          <br />
                          <ReportCaseOutcome
                            formik={formik}
                            name="case_outcome"
                          />
                          {formik.touched.case_outcome &&
                            formik.errors.case_outcome && (
                              <TextError>
                                {formik.errors.case_outcome}
                              </TextError>
                            )}
                        </CFormGroup>
                      </CCol>

                      <CCol xs="6 text-center">
                        <CFormGroup>
                          <CLabel
                            htmlFor="ccnumber"
                            className="font-weight-bold"
                          >
                            Resolution
                          </CLabel>
                          <br />
                          <ReportResolution formik={formik} name="resolution" />
                          {formik.touched.resolution &&
                            formik.errors.resolution && (
                              <TextError>{formik.errors.resolution}</TextError>
                            )}
                        </CFormGroup>
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
                            type="submit"
                            disabled={apiAction}
                          >
                            Update
                          </button>
                        )}
                        <div style={{ color: "red" }} className="mt-2">
                          {/* {errors.length ? <h3>Submission contains errors</h3>:""}
                      {errors.length ?errors.map( (error,i)=><p key={i} className="text-left">{error}</p>):""} */}
                        </div>
                      </CCol>
                      {/* {apiAction ? 
                    <button className="btn btn-primary px-4 w-100"   disabled={apiAction}>
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      &nbsp;Loading...
                    </button> : 
                    <CButton onClick={()=>{validateArticle()}} color="primary" size="md" block md="12">{editMode==="new" ?"Publish":"Update"}</CButton>} */}

                      {/* <ToastMe showToast={toast} context={ArticleProvider.Context} />
          <ModalMe showToast={modal} /> */}

                      {/* <a href="" style={Styles.link} id="acpb_upload_button_fr">Set featured image (FR) </a> */}
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
            </CCol>
          </CCol>
        </CRow>
      ) : (
        !apiAction && <h1> This account is not enabled for monthly reports </h1>
      )}

      <CRow>
        {/* <CCol md="3">
        <CCard>
        <CCardBody>
        
        </CCardBody>
          </CCard>
        </CCol> */}
        <LoginModal context={MreportProvider.Context} />
      </CRow>
    </>
  );
};

export default DashboardUpdateMonthlyReport;
