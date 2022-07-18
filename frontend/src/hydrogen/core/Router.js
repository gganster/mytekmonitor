import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";

import useUI from "../../contexts/ui";
import useAuth from "./hooks/useAuth";
import useRouterConfig from "../../routes";

import Loading from "../../pages/Loading";
import NotFound from "../../pages/404";

import CustomModel from "./Models/Custom";
import Crud from "./Models/Crud";

const Router = () => {
  const {layouts, routes} = useRouterConfig();
  const [ui] = useUI();
  useAuth(true);

  if (ui.loading) return <Loading />;

  return (
    <Switch>
      {layouts.map(layout => (
        <Route key={`layout_${layout.name}`} path={layout.route ?? ""} children={({match}) => (
          <layout.component>
            <Switch>
              {/*--------------- custom--------------- */}
              {routes.filter(i => i.layout === layout.name).filter(i => !i.model || i.model === "custom").map(route => 
                <Route key={`route_${route.name}`} exact path={`${match.url}/${route.route}`.replace("//", "/")} children={p => (
                  <CustomModel params={p} route={route} layout={layout} />
                )} />
              )}
              {/*--------------- crud --------------- */}
              {/* crud create */}
              {routes.filter(i => i.layout === layout.name).filter(i => i.model === "crud" && i.vue.Create).map(route =>
                <Route key={`route_${route.name}`} exact path={`${match.url}/${route.route}/create`.replace("//", "/")} children={p => (
                  <Crud.Create params={p} route={route} layout={layout} />
                )} />)
              }
              {/* crud getAll */}
              {routes.filter(i => i.layout === layout.name).filter(i => i.model === "crud" && i.vue.GetAll).map(route =>
                <Route key={`route_${route.name}`} exact path={`${match.url}/${route.route}`.replace("//", "/")} children={p => (
                  <Crud.GetAll params={p} route={route} layout={layout} />
                )} />)
              }
              {/* crud getOne */}
              {routes.filter(i => i.layout === layout.name).filter(i => i.model === "crud" && i.vue.GetOne).map(route =>
                <Route key={`route_${route.name}`} exact path={`${match.url}/${route.route}/:id`.replace("//", "/")} children={p => (
                  <Crud.GetOne params={p} route={route} layout={layout} />
                )} />)
              }
              {/* crud update */}
              {routes.filter(i => i.layout === layout.name).filter(i => i.model === "crud" && i.vue.Update).map(route =>
                <Route key={`route_${route.name}`} exact path={`${match.url}/${route.route}/:id/update`.replace("//", "/")} children={p => (
                  <Crud.Update params={p} route={route} layout={layout} />
                )} />)
              }
              {/* crud delete */}
                {routes.filter(i => i.layout === layout.name).filter(i => i.model === "crud" && i.vue.Delete).map(route =>
                <Route key={`route_${route.name}`} exact path={`${match.url}/${route.route}/:id/delete`.replace("//", "/")} children={p => (
                  <Crud.Delete params={p} route={route} layout={layout} />
                )} />)
              }
              <Route path="*"><NotFound /></Route>
            </Switch>
          </layout.component>
        )} />
      ))}
      <Route path="*"><NotFound /></Route>
    </Switch>
  )
}

const GlobalRouter = () => <BrowserRouter><Router /></BrowserRouter>
export default GlobalRouter;
