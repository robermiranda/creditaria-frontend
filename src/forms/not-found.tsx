import { NavLink } from "react-router";


export function NotFound () {
    return (
        <>
            <p>Página no encontrada</p>
            <NavLink to="/">Regresar</NavLink>
        </>
    )
}