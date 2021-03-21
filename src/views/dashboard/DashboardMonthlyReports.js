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
import MreportProvider from "../../context/MreportContext";
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
import ReportTable from "../../inputs/report-table";

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

const DashboardMonthlyReports = () => {
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
  } = useContext(MreportProvider.Context);

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
              <ReportTable
                reports={reports}
                options={{ setAddUserFormActive, apiAction }}
                context={MreportProvider.Context}
              />
            </CCol>
          </CRow>

          <LoginModal context={MreportProvider.Context} />
        </CCol>
      </CRow>
    </>
  );
};

export default DashboardMonthlyReports;
