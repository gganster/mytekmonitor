/*

  Hydrogen required file

  do not delete this file

*/

import {createContext, useState, useContext} from 'react';
import config from 'config';

const Context = createContext();

const Default = config.glancesInstance[0];

const Provider = ({children}) => {
  const [ctx, setCtx] = useState({...Default});

  return (
    <Context.Provider value={[ctx, setCtx]}>
      {children}
    </Context.Provider>
  )
}

const useInstance = () => useContext(Context);

export default useInstance;
export {Provider};