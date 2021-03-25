import React, { useContext, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import DreportProvider from "../../context/DreportContext";
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

const DashboardReportDaily = () => {
  const { id } = useParams();

  const { fetchReportByIdApi, report } = useContext(DreportProvider.Context);

  useEffect(() => {
    fetchReportByIdApi(id);
  }, []);

  return (
    <>
      {report.id !== undefined ? (
        <CRow>
          <CCol className="col-centered">
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
                  <b className="font-weight-bold lac-site-theme">Occupation:</b>{" "}
                  {report.occupation}
                </p>

                {/* <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">
                    State of Origin:
                  </b>{" "}
                  {report.storigin !== undefined && report.storigin.state}
                  {report.storigin == undefined && "NA"}
                </p> */}
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Granted:</b>{" "}
                  {report.granted}
                </p>

                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Case Type:</b>{" "}
                  {report.case_type}
                </p>

                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Offence:</b>{" "}
                  {report.offence == null ? "NA" : report.offence}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Complaints:</b>{" "}
                  {report.complaints == null ? "NA" : report.complaints}
                </p>

                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Location:</b>{" "}
                  {report.location !== undefined && report.location.name}
                  {report.location == undefined && "NA"}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">
                    Bail Status:
                  </b>{" "}
                  {report.bail_status}
                </p>
                <br />

                {report.user !== undefined && (
                  <>
                    <h1 className="text-center btn-site-theme">
                      Lawyer Information
                    </h1>

                    <p className="shadow p-3">
                      <b className="font-weight-bold lac-site-theme">
                        Submited By:
                      </b>{" "}
                      {report.user !== undefined && report.user.names}
                    </p>

                    <p className="shadow p-3">
                      <b className="font-weight-bold lac-site-theme">Zone:</b>{" "}
                      {report.user !== undefined &&
                        report.user.zone !== null &&
                        report.user.zone.zone}
                      {report.user !== undefined &&
                        report.user.zone === null &&
                        "N/A"}
                    </p>
                    <p className="shadow p-3">
                      <b className="font-weight-bold lac-site-theme">State:</b>{" "}
                      {report.user !== undefined &&
                        report.user.state !== null &&
                        report.user.state.state}
                      {report.user !== undefined &&
                        report.user.state === null &&
                        "N/A"}
                    </p>
                    <p className="shadow p-3">
                      <b className="font-weight-bold lac-site-theme">Centre:</b>{" "}
                      {report.user !== undefined &&
                        report.user.centre !== null &&
                        report.user.centre.centre}
                      {report.user !== undefined &&
                        report.user.centre === null &&
                        "N/A"}
                    </p>
                  </>
                )}

                {/* <a href={`/reports//update/${id}`} className="m-2">
                  <button className="btn btn-site-theme-bg px-4 ">
                    Edit Report
                  </button>
                </a> */}
                <a href="/reports/daily">
                  <button className="btn btn-site-theme-bg px-4 ">
                    Go Back
                  </button>
                </a>
              </CCardBody>
            </CCard>
          </CCol>
          <LoginModal context={DreportProvider.Context} />
        </CRow>
      ) : (
        <h3 className="mb-4">Loading..</h3>
      )}
    </>
  );
};

export default DashboardReportDaily;
