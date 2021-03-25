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
import PdssProvider from "../../context/PdssContext";
import LoginModal from "../../modals/login-modal";
import PdssTable from "../../inputs/pdss-report-table";

const DashboardPdssReports = () => {
  const {
    fetchReportsApi,
    fetchZonesApi,
    reports,
    setUser,
    addUserApi,
    errors,
    deleteReportApi,
    apiAction,
    fetchingFailMsg,
    pagination,
  } = useContext(PdssProvider.Context);

  const [addUserFormActive, setAddUserFormActive] = useState(false);

  useEffect(() => {
    fetchReportsApi();
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
          <CRow>
            <CCol md="12">
              <PdssTable
                reports={reports}
                options={{ setAddUserFormActive, apiAction }}
                context={PdssProvider.Context}
              />
            </CCol>
          </CRow>

          <LoginModal context={PdssProvider.Context} />
        </CCol>
      </CRow>
    </>
  );
};

export default DashboardPdssReports;
