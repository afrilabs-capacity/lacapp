import React, { useContext, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import UserProvider from "../../context/UserContext";
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

const DashboardUser = () => {
  const { id } = useParams();

  const { fetchUserByIdApi, user } = useContext(UserProvider.Context);

  useEffect(() => {
    fetchUserByIdApi(id);
  }, []);

  return (
    <>
      {user !== undefined ? (
        <CRow>
          <CCol>
            <CCard style={styles.cardStyle}>
              <CCardHeader style={styles.noBorder}>
                <CRow className="mt-4">
                  <CCol>
                    <h1 className="text-center btn-site-theme">
                      {user !== undefined ? user.names : ""}
                    </h1>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Name:</b>{" "}
                  {user.names}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Email:</b>{" "}
                  {user.email}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Sex:</b>{" "}
                  {user.sex}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Status:</b>{" "}
                  {user.status}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">
                    Qualification:
                  </b>{" "}
                  {user.qualification}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">GL:</b>{" "}
                  {user.gl}
                </p>

                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Phone:</b>{" "}
                  {user.phone}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Zone:</b>{" "}
                  {user.zone !== undefined &&
                    user.zone_id !== 0 &&
                    user.zone.zone}
                  {user.zone == undefined && "NA"}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">State:</b>{" "}
                  {user.state !== undefined &&
                    user.state_id !== 0 &&
                    user.state.state}
                  {user.state == undefined && "NA"}
                </p>
                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Centre:</b>{" "}
                  {user.centre !== undefined &&
                    user.centre_id !== 0 &&
                    user.centre.centre}
                  {user.centre == undefined && "NA"}
                </p>

                <p className="shadow p-3">
                  <b className="font-weight-bold lac-site-theme">Registered:</b>{" "}
                  {user.registered}
                </p>

                <a href={`/users/update/${id}`} className="m-2">
                  <button className="btn btn-site-theme-bg px-4 ">
                    Edit User
                  </button>
                </a>

                <a href="/users/add">
                  <button className="btn btn-site-theme-bg px-4 ">
                    Go Back
                  </button>
                </a>
              </CCardBody>
            </CCard>
          </CCol>
          <LoginModal context={UserProvider.Context} />
        </CRow>
      ) : (
        <h3 className="mb-4">Loading..</h3>
      )}
    </>
  );
};

export default DashboardUser;
