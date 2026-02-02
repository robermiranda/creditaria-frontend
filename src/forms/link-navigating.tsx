import { NavLink } from "react-router";


export function AppNavigator () {

  return (
    <nav>
      <NavLink to="/main-form">Main Form</NavLink>
      <NavLink to="/second-form">Seconf Form</NavLink>
    </nav>
  );
}
