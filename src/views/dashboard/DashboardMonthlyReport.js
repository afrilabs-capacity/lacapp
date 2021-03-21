import React, { useContext, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import MreportProvider from "../../context/MreportContext";
import LoginModal from "../../modals/login-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { useParams, useLocation } from "react-router-dom";

const styles = {
  noBorder: {
    border: "none",
  },
  noBorderTop: {
    borderBTop: "none",
  },
  cardStyle: {
    //boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    border: "none",
  },
};

const DashboardReportMonthly = () => {
  const { id } = useParams();

  const { fetchReportByIdApi, report } = useContext(MreportProvider.Context);

  useEffect(() => {
    fetchReportByIdApi(id);
  }, []);

  return (
    <>
      {report !== undefined ? (
        <CRow>
          <CCol className="col-centered">
            <CCard style={styles.cardStyle}>
              <CCardHeader style={styles.noBorder}>
                <CRow className="mt-4">
                  <CCol>
                    <h1 className="text-center btn-site-theme">
                      {report !== undefined ? "Reg No #" + report.regno : ""}
                    </h1>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">
                    Registration Number:
                  </b>{" "}
                  {report.regno}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">First Name:</b>{" "}
                  {report.first_name}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Last Name:</b>{" "}
                  {report.last_name}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Sex:</b>{" "}
                  {report.gender}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Age:</b>{" "}
                  {report.age}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">
                    Marital Status:
                  </b>{" "}
                  {report.marital_status}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Occupation:</b>{" "}
                  {report.qualification}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">
                    State of Origin:
                  </b>{" "}
                  {report.state_of_origin}
                </p>

                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Case Type:</b>{" "}
                  {report.case_type}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Court:</b>{" "}
                  {report.court}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">
                    Case Number:
                  </b>{" "}
                  {report.case_no}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">
                    Date Case Received:
                  </b>{" "}
                  {report.date_case_received}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">
                    Date Case Granted:
                  </b>{" "}
                  {report.date_case_granted}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Granted:</b>{" "}
                  {report.granted}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Eligible:</b>{" "}
                  {report.eligible}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">
                    Active Case:
                  </b>{" "}
                  {report.active_case}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Zone:</b>{" "}
                  {report.zone !== undefined &&
                    report.zone_id !== 0 &&
                    report.zone.zone}
                  {report.zone == undefined && "NA"}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">State:</b>{" "}
                  {report.state !== undefined &&
                    report.state_id !== 0 &&
                    report.state.state}
                  {report.state == undefined && "NA"}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Centre:</b>{" "}
                  {report.centre !== undefined &&
                    report.centre_id !== 0 &&
                    report.centre.centre}
                  {report.centre == undefined && "NA"}
                </p>

                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">
                    Counsel Assigned:
                  </b>{" "}
                  {report.counsel_assigned}
                </p>

                <a href={`/reports/update/${id}`} className="m-2">
                  <button className="btn btn-site-theme-bg px-4 ">
                    Edit Report
                  </button>
                </a>
                <a href="/reports/monthly">
                  <button className="btn btn-site-theme-bg px-4 ">
                    Go Back
                  </button>
                </a>
              </CCardBody>
            </CCard>
          </CCol>
          <LoginModal context={MreportProvider.Context} />
        </CRow>
      ) : (
        <h3 className="mb-4">Loading..</h3>
      )}
    </>
  );
};

export default DashboardReportMonthly;
