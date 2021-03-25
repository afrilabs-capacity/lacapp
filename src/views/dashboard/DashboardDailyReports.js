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
import DreportProvider from "../../context/DreportContext";
import LoginModal from "../../modals/login-modal";
import DreportTable from "../../inputs/d-report-table";

const DashboardDailyReports = () => {
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
  } = useContext(DreportProvider.Context);

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
              <DreportTable
                reports={reports}
                options={{ setAddUserFormActive, apiAction }}
                context={DreportProvider.Context}
              />
            </CCol>
          </CRow>

          <LoginModal context={DreportProvider.Context} />
        </CCol>
      </CRow>
    </>
  );
};

export default DashboardDailyReports;
