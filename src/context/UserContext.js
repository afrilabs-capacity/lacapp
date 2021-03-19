import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import authHeader from "../services/auth-header";
import AuthProvider from "../context/AuthContext";
import AuthService from "../services/auth.service";
import urlService from "../services/url-service";

const API_URL = urlService().baseUrl;

const Context = createContext({});

const initialLoginAction = { func: null, params: null };

const Provider = (props) => {
  // Initial values are obtained from the props

  const history = useHistory();

  const alert = useAlert();

  const { modal, setModal } = useContext(AuthProvider.Context);

  //   alert.show(modal)

  const initialUser = {
    names: "",
    status: "",
    qualification: "",
    state_id: "",
    zone_id: "",
    centre_id: "",
    gl: "",
    sex: "",
    phone: "",
    email: "",
    role: "editor",
  };

  const {
    // article:initialArticle,
    childrens,
  } = props;

  // Use State to keep the values
  const [user, setUser] = useState({});
  const [authModal, setAuthModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [myZones, setMyZones] = useState([]);
  const [myStates, setMyStates] = useState([]);
  const [myCentres, setMyCentres] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [errors, setErrors] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetchingFailMsg, setFetchingFailMsg] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastType, setToastType] = useState("error");
  const [loginAction, setLoginAction] = useState(initialLoginAction);
  const [apiAction, setApiAction] = useState(false);

  // const [featuredFor,setFeaturedFor]=useState("")
  useEffect(() => {
    //alert.show(typeof user.zone == "object" ? user.zone.zone : "initializing");
    //console.log("user in useefect", user.zone.created_at);
  }, [user.zone]);

  const showLoginModal = () => "hi";

  const KeysToErrorArray = (errors) => {
    Object.keys(errors).map((key, index) =>
      setErrors((prevError) => [...prevError, errors[key]])
    );
  };

  const updateUser = (dataKey, data) => {
    //console.log("data key", dataKey)
    return setUser((prevState) => {
      let newState = { ...prevState, [dataKey]: data };
      return newState;
    });
  };

  const addUserApi = (userdata) => {
    setErrors([]);
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);
    setFetchingFailMsg(null);
    // setErrors(prevErrors=>[...prevErrors,"ready to add user"])

    axios
      .request({
        method: "post",
        headers: authHeader(),
        url: API_URL + "user/register",
        data: userdata,
      })
      .then((response) => {
        alert.show("New user created!", { type: "success" });

        console.log("user created", response.data.user.id);
        history.replace({
          pathname: "/user/profile/" + response.data.user.id,
          //search: '?query=abc',
          id: response.data.user.id,
          state: {
            id: response.data.user.id,
            navType: "post_save",
            data: response.data.user.id,
          },
        });
        //fetchUsersApi();
        setApiAction(false);
        //   console.log("post response",response.data.data.data.id)
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
                error.response.data.code == "402" &&
                  alert.show(error.response.data.status);
                if (!error.response.data.code) {
                  setAuthModal(true);
                  setLoginAction((prevArticle) => {
                    return {
                      ...prevArticle,
                      func: addUserApi,
                      params: userdata,
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
      });
  };

  const updateUserApi = (userdata) => {
    setErrors([]);
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);
    setFetchingFailMsg(null);
    // setErrors(prevErrors=>[...prevErrors,"ready to add user"])

    axios
      .request({
        method: "post",
        headers: authHeader(),
        url: API_URL + "user/update",
        data: userdata,
      })
      .then((response) => {
        alert.show("Updated!", { type: "success" });

        console.log("user created", response.data.user.id);
        history.replace({
          pathname: "/user/profile/" + response.data.user.id,
          //search: '?query=abc',
          id: response.data.user.id,
          state: {
            id: response.data.user.id,
            navType: "post_save",
            data: response.data.user.id,
          },
        });
        //fetchUsersApi();
        setApiAction(false);
        //   console.log("post response",response.data.data.data.id)
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
                error.response.data.code == "402" &&
                  alert.show(error.response.data.status);
                if (!error.response.data.code) {
                  setAuthModal(true);
                  setLoginAction((prevArticle) => {
                    return {
                      ...prevArticle,
                      func: updateUserApi,
                      params: userdata,
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
      });
  };

  const deleteUserApi = (id) => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);
    setFetchingFailMsg(null);
    //setUsers([])

    axios
      .get(API_URL + "user/delete/" + id, { headers: authHeader() })
      .then((response) => {
        // setUsers(prevArticle=>{
        //   return {...prevArticle,...response.data.data.data}
        // })

        // setPagination(prevArticle=>{
        //   return {...prevArticle,...response.data.data.data}
        // })

        fetchUsersApi();
        alert.show("User Deleted", { type: "success" });
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
                  setLoginAction((prevArticle) => {
                    return { ...prevArticle, func: deleteUserApi, params: id };
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

  const updatePasswordUserApi = (values) => {
    setLoginAction(initialLoginAction);
    setAuthModal(false);
    setApiAction(true);

    axios
      .request({
        method: "post",
        headers: authHeader(),
        url: API_URL + "user/update",
        data: values,
      })
      .then((response) => {
        alert.show("Password Updated", { type: "success" });
        // console.log("update user response",response.data.data)
        AuthService.logout();
        // history.replace('/')
        setApiAction(false);
        setAuthModal(true);
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
                setLoginAction((prevArticle) => {
                  return {
                    ...prevArticle,
                    func: updatePasswordUserApi,
                    params: values,
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
      });
  };

  const fetchUserByIdApi = (id) => {
    setUsers([]);
    setFetching(true);
    setAuthModal(false);
    setApiAction(true);
    setFetchingFailMsg(null);
    //alert("Hi there man")
    axios
      .get(API_URL + "user/user/" + id, { headers: authHeader() })
      .then((response) => {
        console.log("fetch  user", typeof response.data.user.zone);
        setUser((prevArticle) => {
          return { ...prevArticle, ...response.data.user };
        });

        setFetching(false);
        // console.log("post response all articles", response.data.data.data);
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
              case 422:
                KeysToErrorArray(error.response.data.errors);
                break;
              case 409:
                KeysToErrorArray(error.response.data.errors);
                break;

              case 401:
                //error falls in the category of unauthorized but has to do with other route constraints such as (user not admin)
                error.response.data.code == "402" &&
                  alert.show(error.response.data.status);

                //error falls in the category of expired token
                if (!error.response.data.code) {
                  setAuthModal(true);
                  setFetchingFailMsg("Waiting for authorization...");
                  setLoginAction((prevstate) => {
                    return {
                      ...prevstate,
                      func: fetchUserByIdApi,
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
      });
  };

  const fetchUsersApi = () => {
    setUsers([]);
    setFetching(true);
    setAuthModal(false);
    setApiAction(true);
    setFetchingFailMsg(null);
    //alert("Hi there man")
    axios
      .get(API_URL + "user/users", { headers: authHeader() })
      .then((response) => {
        console.log("fetch articles user", response.data);
        setUsers((prevArticle) => {
          return [...prevArticle, ...response.data.data.data];
        });
        setFetching(false);
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
              case 422:
                KeysToErrorArray(error.response.data.errors);
                break;
              case 409:
                KeysToErrorArray(error.response.data.errors);
                break;
              case 401:
                //error falls in the category of unauthorized but has to do with other route constraints such as (user not admin)
                error.response.data.code == "402" &&
                  alert.show(error.response.data.status);

                //error falls in the category of expired token
                if (!error.response.data.code) {
                  setAuthModal(true);
                  setFetchingFailMsg("Waiting for authorization...");
                  setLoginAction((prevArticle) => {
                    return { ...prevArticle, func: fetchUsersApi };
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

        //   error.response!==undefined ? setFetchingFailMsg("No programmes found") : setFetchingFailMsg("Unknown error")
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const goToPageApi = (page) => {
    setUsers([]);
    setCurrentPage(page);
    setApiAction(true);

    axios
      .get(pagination.path + "?page=" + page, { headers: authHeader() })
      .then((response) => {
        setUsers((prevArticle) => {
          return [...prevArticle, ...response.data.data.data.data];
        });

        setPagination((prevArticle) => {
          return { ...prevArticle, ...response.data.data.data };
        });

        console.log("post response all articles", response.data.data.data);
        setApiAction(false);
      })
      .catch((error) => {
        setErrors([]);
        setApiAction(false);
        switch (error.response) {
          case error.response == 500:
            alert.show(error.response.data.statusText, { type: "error" });
            break;
          case error.response == 422:
            KeysToErrorArray(error.response.data.errors);
            break;
          case error.response == 409:
            KeysToErrorArray(error.response.data.errors);
            break;
          default:
            !error.response
              ? alert.show("Server currently down", { type: "error" })
              : alert.show(error.response.statusText, { type: "error" });
        }
        //   let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        //   setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const searchByPhraseApi = () => {
    setUsers([]);
    setFetching(true);
    setFetchingFailMsg(null);
    setApiAction(true);

    axios
      .get(API_URL + "programmes/search/" + searchPhrase)
      .then((response) => {
        setUsers((prevArticle) => {
          return [...prevArticle, ...response.data.data.data.data];
        });

        setPagination((prevArticle) => {
          return { ...prevArticle, ...response.data.data.data };
        });

        setFetching(false);
        !response.data.data.data.length &&
          setFetchingFailMsg("No results found...");
        console.log("get response", response.data.data.data);
        setApiAction(false);
        //console.log("all articles",articles)
      })
      .catch((error) => {
        setErrors([]);
        setFetching(false);
        setApiAction(false);

        error.response !== undefined
          ? setFetchingFailMsg("No articles found")
          : setFetchingFailMsg("Unknown error");
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const fetchZonesApi = () => {
    setMyZones([]);
    setMyStates([]);
    setMyCentres([]);
    setFetching(true);
    setFetchingFailMsg(null);
    setAuthModal(false);
    setLoginAction(initialLoginAction);
    setApiAction(true);

    axios
      .get(API_URL + "user/fetch-zones", { headers: authHeader() })
      .then((response) => {
        setMyZones((prevstate) => {
          return [...prevstate, ...response.data.zones];
        });

        //console.log("zones api", response.data[0].zone);
        !response.data && setFetchingFailMsg("No reports found");

        // console.log("post response all reports", response.data);
        setFetching(false);
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
                // setLoginAction(prevreport=>{
                //   return {...prevreport,func:fetchreportsApi}
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
        // error.response!==undefined ? setFetchingFailMsg("No reports found") : setFetchingFailMsg("Unknown error")
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const fetchStatesApi = (zoneid) => {
    //setMyZones([]);
    setMyStates([]);
    //setMyCentres([]);
    setFetching(true);
    setFetchingFailMsg(null);
    setAuthModal(false);
    setLoginAction(initialLoginAction);
    setApiAction(true);

    axios
      .get(API_URL + `user/fetch-states-zone-id/${zoneid}`, {
        headers: authHeader(),
      })
      .then((response) => {
        setMyStates((prevreport) => {
          return [...prevreport, ...response.data.states];
        });
        !response.data && setFetchingFailMsg("No reports found");

        // console.log("post response all reports", response.data);
        setFetching(false);
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
                // setLoginAction(prevreport=>{
                //   return {...prevreport,func:fetchreportsApi}
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
        // error.response!==undefined ? setFetchingFailMsg("No reports found") : setFetchingFailMsg("Unknown error")
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const fetchCentresApi = (stateid) => {
    //setMyZones([]);
    //setMyStates([]);
    setMyCentres([]);
    setFetching(true);
    setFetchingFailMsg(null);
    setAuthModal(false);
    setLoginAction(initialLoginAction);
    setApiAction(true);

    axios
      .get(API_URL + `user/fetch-centres-state-id/${stateid}`, {
        headers: authHeader(),
      })
      .then((response) => {
        setMyCentres((prevreport) => {
          return [...prevreport, ...response.data.centres];
        });
        !response.data && setFetchingFailMsg("No reports found");

        console.log("centres API", response.data);
        setFetching(false);
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
                // setLoginAction(prevreport=>{
                //   return {...prevreport,func:fetchreportsApi}
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
        // error.response!==undefined ? setFetchingFailMsg("No reports found") : setFetchingFailMsg("Unknown error")
        // let apiStatus=error.response!==undefined ? error.response.statusText : "Unknown error"
        // setErrors(prevError=>[...prevError,apiStatus])
      });
  };

  const userContext = {
    user,
    errors,
    users,
    myZones,
    myStates,
    myCentres,
    selectedZone,
    selectedState,
    setUser,
    fetchUsersApi,
    pagination,
    goToPageApi,
    currentPage,
    searchPhrase,
    setSearchPhrase,
    searchByPhraseApi,
    fetching,
    fetchingFailMsg,
    updateUser,
    addUserApi,
    toast,
    setToast,
    toastType,
    authModal,
    setAuthModal,
    loginAction,
    setLoginAction,
    deleteUserApi,
    apiAction,
    setApiAction,
    updatePasswordUserApi,
    fetchZonesApi,
    fetchStatesApi,
    fetchCentresApi,
    fetchUserByIdApi,
    updateUserApi,
  };

  // pass the value in provider and return
  return <Context.Provider value={userContext} {...props}></Context.Provider>;
};

const UserProvider = {
  Provider,
  Context,
};

export default UserProvider;
