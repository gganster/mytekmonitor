import {useEffect} from "react";
import firebase from "firebase";

import useUI from "contexts/ui";
import sleep from "hydrogen/helpers/sleep";

const auth = firebase.auth;
const firestore = firebase.firestore;

const useFirebaseAuth = (isHandler = false) => {
  const [ui, setUI] = useUI();

  useEffect(() => {
    if (!isHandler) return;
    const subscribe = auth().onAuthStateChanged(async (_user) => {
      if (_user) {//connect the user
        let counterLimit = 5; //5 attempts to connect
        let meta = await firestore().collection("users")
                                    .doc(_user.uid)
                                    .get();
        while ((!meta || !meta.exists) && counterLimit > 0) {
          await sleep(1000);
          meta = await firestore().collection("users")
                                  .doc(_user.uid)
                                  .get();
          counterLimit--;
        }
        if (meta.exists) {
          setUI({...ui, user: {...meta.data(), ..._user}, loading: false});
        } else {
          auth().signOut();
          setUI({...ui, user: null, loading: false});
        }
      } else {
        setUI({...ui, loading: false});
      }
    })
    return (subscribe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHandler]);

  const register = async (method, args) => {
    if (method === "withMail") {
      const {mail, password, data} = args;
      let res = await auth().createUserWithEmailAndPassword(mail, password);
      await firestore().collection("users").doc(res.user.uid).set({
        ...data,
        createdAt: new Date()
      });
    }
  }

  const login = async (method, args) => {
    if (method === "withMail") {
      const {mail, password} = args;
      await auth().signInWithEmailAndPassword(mail, password);
    }
  }

  const logout = () => {
    setUI({...ui, user: null, loading: false});
    firebase.auth().signOut();
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

export default useFirebaseAuth;