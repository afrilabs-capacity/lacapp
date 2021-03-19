import React, { createContext, useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useAlert } from "react-alert";
import authHeader from "../services/auth-header";
import urlService from "../services/url-service";

const API_URL = urlService().baseUrl;

const Context = createContext({});

const initialreport = {
  id: null,
  regno: "",
  first_name: "",
  last_name: "",
  gender: "",
  age: "",
  marital_status: "",
  occupation: "",
  state_of_origin: "",
  case_type: "",
  offence: "",
  complaints: "",
  court: "",
  case_no: "",
  date_case_received: "",
  date_case_granted: "",
  granted: "",
  eligible: "",
  active_case: "",
  counsel_assigned: "",
  date_case_completed: "",
  completed_case: "",
  case_outcome: "",
  resolution: "",
  role: "lawyer",
};

const initialEditReport = {
  id: null,
  title_en: "",
  body_en: null,
  featured_en: null,
  title_fr: "",
  body_fr: null,
  featured_fr: null,
  status: "draft",
  category: "",
  created_at: null,
  updated_at: null,
};

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
  const [report, setReport] = useState(initialreport);
  const [caseType, setCaseType] = useState("");
  const [reports, setReports] = useState([]);
  const [counsels, setCounsels] = useState([]);
  const [myState, setMyState] = useState([]);
  const [pagination, setPagination] = useState({});
  const [toast, setToast] = useState(false);
  const [toastType, setToastType] = useState("error");
  const [modal, setModal] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [editMode, setEditMode] = useState("new");
  const [currentReport, setCurrentReport] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchingFailMsg, setFetchingFailMsg] = useState(null);
  const [loginAction, setLoginAction] = useState(initialLoginAction);
  const [apiAction, setApiAction] = useState(false);
  const [monthlyReportCanReport, setMonthlyReportCanReport] = useState(false);

  // const [featuredFor,setFeaturedFor]=useState("")

  useEffect(() => {
    //console.log("id",id)
    // updateFeatured()
    // console.log("reports rebuilt",reports[0])
    // console.log("pagination rebuilt",pagination)
    console.log("report rebuilt", report);
    //if(report.case_type!=="")console.log("caseType",caseType)
    if (report.case_type !== "") {
      report.case_type == "Civil"
        ? setCaseType("Civil")
        : setCaseType("Criminal");
    }
  }, [report, reports, pagination]);

  // useEffect(() => {
  //   console.log("caseType", caseType);
  // }, [caseType]);

  const KeysToErrorArray = (errors) => {
    Object.keys(errors).map((key, index) =>
      setErrors((prevError) => [...prevError, errors[key]])
    );
  };

  const updateReport = (dataKey, data) => {
    //console.log("data key", dataKey)
    return setReport((prevState) => {
      let newState = { ...prevState, [dataKey]: data };
      return newState;
    });
  };

  const resetReport = () => {
    setReport(initialreport);
    setToast(false);
  };

  const resetEditReport = () => {
    setReport(initialEditReport);
  };

  const publishReportApi = (data) => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);

    axios
      .request({
        method: "post",
        headers: authHeader(),
        url: API_URL + "report/monthly-report-new",
        data: data,
      })
      .then((response) => {
        // updateGallery([])
        //   updateGallery(prevGallery=>[
        //     ...prevGallery,...response.data.data.data.data
        //   ])
        //setEditMode("update");
        //alert.show("New report created", { type: "success" });
        history.replace({
          pathname: "/reports/monthly/" + response.data.report.id,
          //search: '?query=abc',
          id: response.data.report.id,
          state: {
            id: response.data.report.id,
            navType: "post_save",
            data: response.data.report.id,
          },
        });
        //console.log("post response", response.data.data.data.id);
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
              case 422:
                KeysToErrorArray(error.response.data.errors);
                break;
              case 409:
                KeysToErrorArray(error.response.data.errors);
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                setAuthModal(true);
                setLoginAction((prevreport) => {
                  //return {...prevreport,func:validatereport}
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
      });
  };

  const updateReportApi = () => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);

    axios
      .request({
        method: "post",
        headers: authHeader(),
        url: API_URL + "post/update",
        data: report,
      })
      .then((response) => {
        setEditMode("update");
        alert.show("report Updated", { type: "success" });
        console.log("post response", response.data.data.data.id);
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
              case 422:
                KeysToErrorArray(error.response.data.errors);
                break;
              case 409:
                KeysToErrorArray(error.response.data.errors);
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                setAuthModal(true);
                // setLoginAction(prevreport=>{
                //   return {...prevreport,func:validatereport}
                // })
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
      });
  };

  const fetchReportByIdApi = (id) => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);

    authHeader() !== "" &&
      axios
        .get(API_URL + "report/fetch-report-monthly/" + id, {
          headers: authHeader(),
        })
        .then((response) => {
          setReport((prevreport) => {
            return { ...prevreport, ...response.data.report };
          });
          console.log("all reports", reports);
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
                  setAuthModal(true);
                  setLoginAction((prevreport) => {
                    return {
                      ...prevreport,
                      func: fetchReportByIdApi,
                      params: id,
                    };
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
    setFetching(true);
    setFetchingFailMsg(null);
    setAuthModal(false);
    setLoginAction(initialLoginAction);
    setApiAction(true);

    //alert("Hi there man")

    axios
      .get(API_URL + "posts", { headers: authHeader() })
      .then((response) => {
        setReports((prevreport) => {
          return [...prevreport, ...response.data.data.data.data];
        });

        setPagination((prevreport) => {
          return { ...prevreport, ...response.data.data.data };
        });

        !response.data.data.data.data.length &&
          setFetchingFailMsg("No reports found");

        setFetching(false);
        console.log("post response all reports", response.data.data.data);
        setApiAction(false);
      })
      .catch((error) => {
        setErrors([]);
        setFetching(false);
        setApiAction(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
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

  const goToPageApi = (page) => {
    setReports([]);
    setCurrentPage(page);
    setAuthModal(false);
    setLoginAction(initialLoginAction);
    setApiAction(true);
    setFetchingFailMsg(null);

    axios
      .get(pagination.path + "?page=" + page, { headers: authHeader() })
      .then((response) => {
        setReports((prevreport) => {
          return [...prevreport, ...response.data.data.data.data];
        });

        setPagination((prevreport) => {
          return { ...prevreport, ...response.data.data.data };
        });

        console.log("post response all reports", response.data.data.data);
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
                setFetchingFailMsg("No reports found");
                setAuthModal(true);
                setLoginAction((prevreport) => {
                  return { ...prevreport, func: goToPageApi };
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
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const searchByPhraseApi = () => {
    setReports([]);
    setFetching(true);
    setFetchingFailMsg(null);
    setAuthModal(false);
    setLoginAction(initialLoginAction);
    setApiAction(true);

    axios
      .get(API_URL + "post/search/" + searchPhrase, { headers: authHeader() })
      .then((response) => {
        setReports((prevreport) => {
          return [...prevreport, ...response.data.data.data.data];
        });

        setPagination((prevreport) => {
          return { ...prevreport, ...response.data.data.data };
        });

        setFetching(false);
        !response.data.data.data.length &&
          setFetchingFailMsg("No results found...");
        // alert(JSON.stringify(response.data) )
        console.log("get response", response.data.data.data);
        setApiAction(false);
        //console.log("all reports",reports)
      })
      .catch((error) => {
        setErrors([]);
        setFetching(false);
        setApiAction(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                setAuthModal(true);
                setLoginAction((prevreport) => {
                  return { ...prevreport, func: searchByPhraseApi };
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
        //alert(JSON.stringify(error.response))
        // error.response!==undefined ? setFetchingFailMsg("No reports found") : setFetchingFailMsg("Unknown error")
      });
  };

  const fetchMonthlyConfigApi = () => {
    setMyState([]);
    setCounsels([]);
    setFetching(true);
    setFetchingFailMsg(null);
    setAuthModal(false);
    setLoginAction(initialLoginAction);
    setApiAction(true);
    setMonthlyReportCanReport(false);

    axios
      .get(API_URL + "report/fetch-monthly-config", { headers: authHeader() })
      .then((response) => {
        setMyState((prevreport) => {
          return [...prevreport, ...response.data.states];
        });

        setCounsels((prevreport) => {
          return [...prevreport, ...response.data.counsels];
        });

        //check if user is enabled for monthly report
        response.data.monthly_report &&
          response.data.can_report &&
          setMonthlyReportCanReport(true);

        console.log("data config api", response.data);
        !response.data && setFetchingFailMsg("No reports found");

        setFetching(false);
        console.log("post response all reports", response.data);
        setApiAction(false);
      })
      .catch((error) => {
        setErrors([]);
        setFetching(false);
        setApiAction(false);
        if (error.response) {
          if (error.response.status) {
            switch (error.response.status) {
              case 500:
                alert.show(error.response.statusText, { type: "error" });
                break;
              case 401:
                //alert.show("Token error",{type:'notice'})
                setAuthModal(true);
                setFetchingFailMsg("Waiting for authorization...");
                setLoginAction((prevreport) => {
                  return { ...prevreport, func: fetchMonthlyConfigApi };
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
    updateReport,
    updateReportApi,
    toast,
    setToast,
    modal,
    setModal,
    errors,
    editMode,
    setCurrentReport,
    setReport,
    setEditMode,
    resetReport,
    resetEditReport,
    initialEditReport,
    toastType,
    setToastType,
    fetchReportsApi,
    fetchReportByIdApi,
    fetchReportsApi,
    pagination,
    goToPageApi,
    currentPage,
    searchPhrase,
    setSearchPhrase,
    searchByPhraseApi,
    setCurrentPage,
    fetching,
    fetchingFailMsg,
    authModal,
    setAuthModal,
    loginAction,
    apiAction,
    setApiAction,
    deleteReportApi,
    initialLoginAction,
    setLoginAction,
    fetchMonthlyConfigApi,
    publishReportApi,
    caseType,
    myState,
    counsels,
    monthlyReportCanReport,
  };

  // pass the value in provider and return
  return (
    <Context.Provider value={reportContext} {...props}>
      {children}
    </Context.Provider>
  );
};

const MreportProvider = {
  Provider,
  Context,
};

Provider.propTypes = {
  report: PropTypes.object,
};

// Provider.defaultProps = {
//   report: {
//     title_en: "",
//     body_en: null,
//     featured_en:null,
//     title_fr: "",
//     body_fr: null,
//     featured_fr:null,
//     status:"draft"
//   },

// };

export default MreportProvider;
