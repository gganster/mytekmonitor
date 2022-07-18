import {useEffect} from "react";

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import 'moment/locale/fr';

import "../styles/index.css";

import moment from "moment";
import axios from "axios";

import config from "../../config";

if (config.driver === "firebase") {
  const firebase = require("firebase");
  if (firebase.default.apps.length === 0) {
    firebase.default.initializeApp(config.firebase);
    firebase.default.firestore().settings({ignoreUndefinedProperties: true});
    firebase.default.firestore().settings({enablePersistence: config.firebase.enablePersistence});
  }
}

if (config.driver === "strapi") {
  axios.defaults.baseURL = config.strapi.apiUrl;
}

const useHydrogen = () => {
  useEffect(() => {moment.updateLocale(config.lang);})
}

export default useHydrogen;