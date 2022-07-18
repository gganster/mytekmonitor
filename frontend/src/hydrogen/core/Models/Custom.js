import React, {useEffect, useState} from "react";
import useRouterConfig from "routes";
import AccessDenied from "../../../pages/401";

const CustomModel = (props) => {
  const {
    route,
    layout,
    params
  } = props;
  const {access} = useRouterConfig();
  const [isGranted, setIsGranted] = useState(null);

  useEffect(() => {
    const _getAccess = (accessName) => {
      let match = access.filter(i => i.name === accessName);
  
      if (match.length === 0) throw new Error(`access doesn't contain entry with name: ${accessName}`);
      return match[0];
    }

    let _access = route.access ? _getAccess(route.access) :
                 layout.access ? _getAccess(layout.access) :
                 null;

    if (_access === null) throw new Error(`layout ${layout.name} doesn't contain access field`);
    setIsGranted(_access.isGranted);
    if (_access.isGranted && _access.onSuccess) _access.onSuccess(params);
    if (!_access.isGranted && _access.onDenied) _access.onDenied(params);
  }, [layout.access, layout.name, params, route.access, access]);


  return <>{
    isGranted === true ?  <route.component /> :
    isGranted === false ? <AccessDenied /> :
                          <></>
  }</>
}

export default CustomModel;