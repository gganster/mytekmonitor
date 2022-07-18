import {useState} from "react";
import PerfectScrollbar from 'react-perfect-scrollbar'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {Settings, LogOut} from "react-feather";
import { useHistory } from "react-router-dom";

import useRouterConfig from "routes";
import useAuth from "hydrogen/core/hooks/useAuth";

import Logo from "assets/img/hydrogen.png";

const Dashboard = (props) => {
  const {children} = props;
  const history = useHistory();

  const {access, routes, layouts} = useRouterConfig();
  const {logout} = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const _logout = () => {
    logout();
    history.push("/");
  }

  const renderSidebarLinks = () => {
    const links = routes.filter(r => {
                          let accessFilter = access.filter(a => a.name === r.access);
                          if (accessFilter.length === 0)
                            throw new Error(`Route ${r.name} access ${r.access} doesn't match any rule in src/route.js`);
                          return accessFilter[0].isGranted
                        })
                        .filter(r => r.hide !== true);
    
    return (
      <>
        {links.map(link => (
          <div className="mt-2" key={`${link.layout}/${link.name}`}>
            <Link className={`block text-white text-lg cursor-pointer ` + 
                             `transition-transform transform hover:translate-x-3 ` +
                             `ml-5`}
                  to={`${layouts.filter(layout => layout.name === link.layout)[0].route}/${link.route}`}>
              <FontAwesomeIcon className="mr-2 w-5" icon={link.icon ?? faChevronRight} />
              {link.name}
            </Link>
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="min-h-screen flex flex-row">
      <div className={`flex flex-col min-h-screen h-screen max-h-screen overflow-y-hidden pt-4 pb-4 w-60 ${sidebarOpen ? "ml-0" : "-ml-60"}`}
           style={{minWidth: "15rem", maxWidth: "15rem", transition: "margin 0.2s ease-out", backgroundColor: "#2F3C4E"}}>
        <PerfectScrollbar className="w-60 overflow-y-scroll p-y-2">
          <img alt="logo" src={Logo} className="w-full mb-8" />
          {renderSidebarLinks()}
        </PerfectScrollbar>
      </div>
      <div className="flex flex-col-reverse w-full h-full max-h-screen min-h-screen">
        <PerfectScrollbar className="flex-1 bg-gray-100 max-h-full p-5">
          {children}
        </PerfectScrollbar>
        {/* Header */}
        <div className={`flex items-center justify-between w-full max-h-14 h-14 shadow-md bg-white px-4`}
             style={{minHeight: "3.5rem"}}>
          {/* LEFT */}
          <div>
            <FontAwesomeIcon icon={faBars} size="2x" color="#312E81"
                            className="cursor-pointer"
                            onClick={() => setSidebarOpen(!sidebarOpen)} />
          </div>

          <div></div>

          {/* RIGHT */}
          <div className="flex text-indigo-900 mr-2" style={{gap: 10}}>
            <Link to="/dashboard/profile">
              <Settings className="cursor-pointer"/>
            </Link>
            <LogOut   className="cursor-pointer" onClick={_logout}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;