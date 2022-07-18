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
        axios.defaults.headers.common["Authorization"] = "Bearer " + jwt
        let user = await axios.get("/api/users/me?populate=*");
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
    if (method === "withMail") {
      try {
        //TODO
        console.log(args);
      } catch (e) {
        console.error("Error while registering", e);
        toast.error("Une erreur s'est prduite, vérifiez les champs du formulaire d'inscription puis réessayez.");
      }
    }
  }

  const login = async (method, args) => {
    if (method === "withMail") {
      try {
        const {mail, password} = args;
        let res = await axios.post("/api/auth/local", {identifier: mail, password});
        res = res.data;
        if (res.jwt) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.jwt}`;
          localStorage.setItem('jwt', res.jwt);
          let user = await axios.get("/api/users/me?populate=*");
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
    //TODO
    console.log(oldPassword, newPassword);
  }

  const forgotPassword = async (email) => {
    //TODO
    console.log(email);
  }

  return {register, login, logout, changePassword, forgotPassword}
}

export default useStrapiAuth;