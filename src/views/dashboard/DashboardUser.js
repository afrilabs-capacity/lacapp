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
                <p>
                  <b className="font-weight-bold">Name:</b> {user.names}
                </p>
                <p>
                  <b className="font-weight-bold">Email:</b> {user.email}
                </p>
                <p>
                  <b className="font-weight-bold">Sex:</b> {user.sex}
                </p>
                <p>
                  <b className="font-weight-bold">Status:</b> {user.status}
                </p>
                <p>
                  <b className="font-weight-bold">Qualification:</b>{" "}
                  {user.qualification}
                </p>
                <p>
                  <b className="font-weight-bold">GL:</b> {user.gl}
                </p>

                <p>
                  <b className="font-weight-bold">Phone:</b> {user.phone}
                </p>
                <p>
                  <b className="font-weight-bold">Zone:</b>{" "}
                  {user.zone !== undefined &&
                    user.zone_id !== 0 &&
                    user.zone.zone}
                  {user.zone == undefined && "NA"}
                </p>
                <p>
                  <b className="font-weight-bold">State:</b>{" "}
                  {user.state !== undefined &&
                    user.state_id !== 0 &&
                    user.state.state}
                  {user.state == undefined && "NA"}
                </p>
                <p>
                  <b className="font-weight-bold">Centre:</b>{" "}
                  {user.centre !== undefined &&
                    user.centre_id !== 0 &&
                    user.centre.centre}
                  {user.centre == undefined && "NA"}
                </p>

                <p>
                  <b className="font-weight-bold">Registered:</b>{" "}
                  {user.registered}
                </p>

                <a href={`/users/update/${id}`}>
                  <button className="btn btn-site-theme-bg px-4 ">
                    Edit User
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
