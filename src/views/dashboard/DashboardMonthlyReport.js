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
          <CCol>
            <CCard style={styles.cardStyle}>
              <CCardHeader style={styles.noBorder}>
                <CRow className="mt-4">
                  <CCol>
                    <h1 className="text-center btn-site-theme">
                      {report !== undefined
                        ? report.first_name + " " + report.last_name
                        : ""}
                    </h1>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <p>
                  <b className="font-weight-bold">Registration Number:</b>{" "}
                  {report.reg_no}
                </p>
                <p>
                  <b className="font-weight-bold">First Name:</b>{" "}
                  {report.first_name}
                </p>
                <p>
                  <b className="font-weight-bold">Last Name:</b>{" "}
                  {report.last_name}
                </p>
                <p>
                  <b className="font-weight-bold">Sex:</b> {report.gender}
                </p>
                <p>
                  <b className="font-weight-bold">Age:</b> {report.age}
                </p>
                <p>
                  <b className="font-weight-bold">Marital Status:</b>{" "}
                  {report.marital_status}
                </p>
                <p>
                  <b className="font-weight-bold">Occupation:</b>{" "}
                  {report.qualification}
                </p>
                <p>
                  <b className="font-weight-bold">State of Origin:</b>{" "}
                  {report.state_of_origin}
                </p>

                <p>
                  <b className="font-weight-bold">Case Type:</b>{" "}
                  {report.case_type}
                </p>
                <p>
                  <b className="font-weight-bold">Court:</b> {report.court}
                </p>
                <p>
                  <b className="font-weight-bold">Case Number:</b>{" "}
                  {report.case_no}
                </p>
                <p>
                  <b className="font-weight-bold">Date Case Received:</b>{" "}
                  {report.date_case_received}
                </p>
                <p>
                  <b className="font-weight-bold">Date Case Granted:</b>{" "}
                  {report.date_case_granted}
                </p>
                <p>
                  <b className="font-weight-bold">Granted:</b> {report.granted}
                </p>
                <p>
                  <b className="font-weight-bold">Eligible:</b>{" "}
                  {report.eligible}
                </p>
                <p>
                  <b className="font-weight-bold">Active Case:</b>{" "}
                  {report.active_case}
                </p>
                <p>
                  <b className="font-weight-bold">Zone:</b>{" "}
                  {report.zone !== undefined &&
                    report.zone_id !== 0 &&
                    report.zone.zone}
                  {report.zone == undefined && "NA"}
                </p>
                <p>
                  <b className="font-weight-bold">State:</b>{" "}
                  {report.state !== undefined &&
                    report.state_id !== 0 &&
                    report.state.state}
                  {report.state == undefined && "NA"}
                </p>
                <p>
                  <b className="font-weight-bold">Centre:</b>{" "}
                  {report.centre !== undefined &&
                    report.centre_id !== 0 &&
                    report.centre.centre}
                  {report.centre == undefined && "NA"}
                </p>

                <p>
                  <b className="font-weight-bold">Counsel Assigned:</b>{" "}
                  {report.counsel_assigned}
                </p>

                <a href={`/reports/update/${id}`}>
                  <button className="btn btn-site-theme-bg px-4 ">
                    Edit Report
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
