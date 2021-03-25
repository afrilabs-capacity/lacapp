import React, { createContext, useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useAlert } from "react-alert";
import authHeader from "../services/auth-header";
import urlService from "../services/url-service";

const API_URL = urlService().baseUrl;

const Context = createContext({});

const initialLoginAction = { func: null, params: null };

const Provider = (props) => {
  // Initial values are obtained from the props
  const history = useHistory();

  const { id } = useParams();

  const location = useLocation();

  const alert = useAlert();

  let errorCount;

  const {
    // report:initialreport,
    children,
  } = props;

  // Use State to keep the values
  const [report, setReport] = useState({});
  const [reports, setReports] = useState([]);
  const [modal, setModal] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [fetchingFailMsg, setFetchingFailMsg] = useState(null);
  const [loginAction, setLoginAction] = useState(initialLoginAction);
  const [apiAction, setApiAction] = useState(false);

  const KeysToErrorArray = (errors) => {
    Object.keys(errors).map((key, index) =>
      setErrors((prevError) => [...prevError, errors[key]])
    );
  };

  const fetchReportByIdApi = (id) => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);
    setReport({});

    authHeader() !== "" &&
      axios
        .get(API_URL + "report/fetch-report-daily/" + id, {
          headers: authHeader(),
        })
        .then((response) => {
          setReport((prevreport) => {
            return { ...prevreport, ...response.data.report };
          });
          //console.log("all reports", reports);
          setApiAction(false);
        })
        .catch((error) => {
          setErrors([]);
          setApiAction(false);
          if (error.response) {
            if (error.response.status) {
              switch (error.response.status) {
                case 500:
                  alert.show(error.response.statusText, { type: "error" });
                  break;
                case 401:
                  //alert.show("Token error",{type:'notice'})
                  error.response.data.code == "402" &&
                    alert.show(error.response.data.status);
                  if (!error.response.data.code) {
                    setAuthModal(true);
                    setLoginAction((prevreport) => {
                      return {
                        ...prevreport,
                        func: fetchReportByIdApi,
                        params: id,
                      };
                    });
                  }

                  break;
                default:
                  !error.response
                    ? alert.show("Server currently down", { type: "error" })
                    : alert.show(error.response.statusText, { type: "error" });
              }
            } else {
              alert.show("Server currently down", { type: "error" });
            }
          } else {
            alert.show("Invalid response", { type: "error" });
          }
          // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
          // setErrors(prevError=>[...prevError,apiStatus])
        });
  };

  const deleteReportApi = (id) => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);
    //setUsers([])

    axios
      .get(API_URL + "post/delete/" + id, { headers: authHeader() })
      .then((response) => {
        // setUsers(prevreport=>{
        //   return {...prevreport,...response.data.data.data}
        // })

        // setPagination(prevreport=>{
        //   return {...prevreport,...response.data.data.data}
        // })
        alert.show("report Deleted", { type: "success" });
        const newList = reports.filter((item) => item.id !== id);
        setReports(newList);

        //
        console.log("post response", response.data.data.data);
        setApiAction(false);
      })
      .catch((error) => {
        setErrors([]);
        setApiAction(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                error.response.data.code == "402" &&
                  alert.show(error.response.data.status);
                if (!error.response.data.code) {
                  setAuthModal(true);
                  setLoginAction((prevreport) => {
                    return { ...prevreport, func: deleteReportApi, params: id };
                  });
                }

                break;
              default:
                !error.response
                  ? alert.show("Server currently down", { type: "error" })
                  : alert.show(error.response.statusText, { type: "error" });
            }
          } else {
            alert.show("Server currently down", { type: "error" });
          }
        } else {
          //alert.show("Invalid response",{type: 'error'})
        }
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const fetchReportsApi = () => {
    setReports([]);
    setFetchingFailMsg(null);
    setAuthModal(false);
    setLoginAction(initialLoginAction);
    setApiAction(true);

    //alert("Hi there man")

    axios
      .get(API_URL + "report/fetch-daily-report-all-or-user", {
        headers: authHeader(),
      })
      .then((response) => {
        setReports((prevreport) => {
          return [...prevreport, ...response.data.reports];
        });

        // setPagination((prevreport) => {
        //   return { ...prevreport, ...response.data.data.data };
        // });

        !response.data.reports.length && setFetchingFailMsg("No reports found");

        console.log("post response all reports", response.data.reports);
        setApiAction(false);
      })
      .catch((error) => {
        setErrors([]);
        setApiAction(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 401:
                //alert.show("Token errorsetToastType", { type: "notice" });
                setAuthModal(true);
                setFetchingFailMsg("Waiting for authorization...");
                setLoginAction((prevreport) => {
                  return { ...prevreport, func: fetchReportsApi };
                });
                break;
              default:
                !error.response
                  ? alert.show("Server currently down", { type: "error" })
                  : alert.show(error.response.statusText, { type: "error" });
            }
          } else {
            alert.show("Server currently down", { type: "error" });
          }
        } else {
          alert.show("Invalid response", { type: "error" });
        }
        // error.response!==undefined ? setFetchingFailMsg("No reports found") : setFetchingFailMsg("Unknown error")
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const reportContext = {
    report,
    reports,
    modal,
    errors,
    setModal,
    authModal,
    setReport,
    fetchReportsApi,
    fetchReportByIdApi,
    fetchReportsApi,
    setAuthModal,
    loginAction,
    apiAction,
    setApiAction,
    deleteReportApi,
    initialLoginAction,
    setLoginAction,
  };

  // pass the value in provider and return
  return (
    <Context.Provider value={reportContext} {...props}>
      {children}
    </Context.Provider>
  );
};

const DreportProvider = {
  Provider,
  Context,
};

Provider.propTypes = {
  report: PropTypes.object,
};

export default DreportProvider;
