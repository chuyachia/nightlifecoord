import Welcome from "./welcome/Welcome";
import Results from "./results/Results";
import Notfound from "./notfound/Notfound";


const routes = [
  {
    path: "/",
    exact:true,
    component: Welcome
  },
  {
    path: "/results",
    component: Results
  },
  {
    path:"*",
    component: Notfound
  }
];

export default routes;