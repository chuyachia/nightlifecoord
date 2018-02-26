import Welcome from "./welcome/Welcome";
import Results from "./results/Results";


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
    component: Welcome
  }
];

export default routes;