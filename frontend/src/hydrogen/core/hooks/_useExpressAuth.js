import {useEffect} from "react";
import axios from "axios";
import useUI from "contexts/ui";
import {toast} from "react-toastify";

const useStrapiAuth = (isHandler = false) => {
  const [ui, setUI] = useUI();

  useEffect(() => {
    (async () => {
      if (!isHandler) return;
      let jwt = localStorage.getItem('jwt')
      if (jwt) {
        axios.defaults.headers.common["Authorization"] = jwt
        let user = await axios.get("/api/auth/verify");

        if (user !== null) {
          localStorage.setItem('jwt', jwt);
          setUI({...ui, user: user.data, loading: false});
        } else {
          localStorage.removeItem('jwt');
          axios.defaults.headers.common["Authorization"] = "";
          setUI({...ui, user: null, loading: false});
        }
      } else {
        localStorage.removeItem('jwt');
        axios.defaults.headers.common["Authorization"] = "";
        setUI({...ui, user: null, loading: false});
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHandler]);

  const register = async (method, args) => {

  }

  const login = async (method, args) => {
    if (method === "withMail") {
      try {
        const {mail, password} = args;
        let res = await axios.post("/api/auth/login", {mail, password});
        res = res.data;
        console.log(res);
        if (res.token) {
          axios.defaults.headers.common["Authorization"] = res.token;
          localStorage.setItem('jwt', res.token);
          let user = await axios.get("/api/auth/verify");
          user = user.data;
          if (user !== null) {
            setUI({...ui, user, loading: false});
          } else {
            throw "User not found";
          }
        } else throw "No JWT in login authentification";
      } catch (e) {
        console.error(e);
        toast.error("Email ou mot de passe incorrect");
        axios.defaults.headers.common["Authorization"] = "";
        setUI({...ui, user: null, loading: false});
        localStorage.removeItem('jwt')
      }
    }
  }

  const logout = () => {
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem('jwt')
    setUI({...ui, user: null, loading: false});
  }

  const changePassword = async (oldPassword, newPassword) => {
    console.log(oldPassword, newPassword);
  }

  const forgotPassword = async (email) => {
    console.log(email);
  }

  return {register, login, logout, changePassword, forgotPassword}
}

export default useStrapiAuth;