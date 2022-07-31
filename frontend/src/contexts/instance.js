/*

  Hydrogen required file

  do not delete this file

*/

import {createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";
const Context = createContext();

const Default = {
  instances: [],
  current: null
};

const Provider = ({children}) => {
  const [ctx, setCtx] = useState({...Default});

  useEffect(() => {
    (async () => {
      let res = await axios.get("/api/instances");
      console.log(res);
      setCtx({instances: res.data, current: res.data[0]});
    })()
  }, [])

  return (
    <Context.Provider value={[ctx, setCtx]}>
      {children}
    </Context.Provider>
  )
}

const useInstance = () => useContext(Context);

export default useInstance;
export {Provider};