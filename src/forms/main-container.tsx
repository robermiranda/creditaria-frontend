import { MainForm } from "@/forms/main-form"
import { type TtablaAmortizacion, TablaAmortizacion } from "@/forms/tabla_amortizacion"
import { useState } from "react"

function getTablaAmortizacion() {
    if (typeof window !== 'undefined') {
        const tablaAmortizacionStr: string | null = window.localStorage.getItem('tablaAmortizacion')
        if (tablaAmortizacionStr) {
            const tablaAmortizacion: TtablaAmortizacion = JSON.parse(tablaAmortizacionStr)
            return tablaAmortizacion
        }
    }
    
    return []
}

export function MainContainer () {
    const [tabla, setTabla] = useState<TtablaAmortizacion>(getTablaAmortizacion())

    return(
        <div className="flex flex-col gap-24">
            <MainForm setResponse={setTabla} />
            <TablaAmortizacion tabla={tabla}/>
        </div>
    )
}