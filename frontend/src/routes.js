
import BlankLayout from "layouts/Blank";
import DashboardLayout from "layouts/Dashboard";

import { faHome } from "@fortawesome/free-solid-svg-icons";

import Login from "pages/blank/login";
import Register from "pages/blank/register";
import Forgot from "pages/blank/forgotPassword";

import Overview from "pages/dashboard/Overview";
import ProfilePage from "pages/dashboard/Profile";

import useUI from "contexts/ui";

const useRouterConfig = () => {
  const [ui] = useUI();

  /*
    required:
      name:string
      isGranted:bool
    optional:
      onSuccess:func (default none)
      onDenied:func (default none)
  */
  const access = [
    {name: "public",    isGranted: true},
    {name: "connected", isGranted: ui.user !== null},
    {name: "admin",     isGranted: ui.user !== null && ui.user.role === "admin"}
  ];

  /*
    required:
      name:string
      route:string
      component:JSX
      access:string
  */
  const layouts = [
    {name: "dashboard", route: "/dashboard", component: DashboardLayout, access: "connected"},
    {name: "blank",     route: "",           component: BlankLayout,     access: "public"},
  ];

  /*
    required:
      name:string
      route:string
      layout:string
      component:JSX
    optional:
      access:string (default: herited from layout)
      type:string (default: "custom")
      hide (default: false)
      icon:fontAwesomeIcon (default: null)
  */
  const routes = [
    {name: "login",    route: "",         layout: "blank",     access: "public",    component: Login,       hide: true},
    {name: "register", route: "register", layout: "blank",     access: "public",    component: Register,    hide: true},
    {name: "forgot",   route: "forgot",   layout: "blank",     access: "public",    component: Forgot,      hide: true},
    {name: "profile",  route: "profile",  layout: "dashboard", access: "connected", component: ProfilePage, hide: true},
    
    //-------------------------- user -------------------------------//
    {name: "overview", route: "",         layout: "dashboard", access: "connected", component: Overview, icon: faHome},

    //-------------------------- admin -------------------------------//
  ];

  return {access, layouts, routes};
}

export default useRouterConfig;