import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

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
import LoginModal from "../../modals/login-modal";

const DashboardCheckpointReport = () => {
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

  const [addUserFormActive, setAddUserFormActive] = useState(false);

  const history = useHistory();

  useEffect(() => {
    // fetchUsersApi();
    // fetchZonesApi();
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

  return (
    <>
      <CRow>
        <CCol md="12" className="pt-2 bg-white">
          {!addUserFormActive ? (
            <CRow>
              <CCol xl={5} className="col-centered">
                <CRow className="text-center mb-4 mt-1">
                  <CCol>
                    <h1 className="text-center btn-site-theme">
                      Report Options
                    </h1>
                  </CCol>
                </CRow>
                <CCard>
                  {/* <CCardHeader></CCardHeader> */}

                  <CCardBody className="d-flex flex-column flex align-content-betwen">
                    <button
                      className="btn  px-4 btn-site-theme-bg w-60 m-2 shadow"
                      disabled={apiAction}
                      onClick={() => history.push("/reports/monthly")}
                    >
                      Monthly Report
                    </button>

                    <button
                      className="btn  px-4 btn-site-theme-bg w-60 m-2 shadow"
                      disabled={apiAction}
                      onClick={() => history.push("/reports/daily")}
                    >
                      Daily Report
                    </button>

                    <button
                      className="btn  px-4 btn-site-theme-bg w-60 m-2 shadow"
                      disabled={apiAction}
                      onClick={() => history.push("/reports/pdss")}
                    >
                      PDSS Report
                    </button>
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

export default DashboardCheckpointReport;
