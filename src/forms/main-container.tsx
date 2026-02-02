import { MainForm } from "@/forms/main-form"
import { type TtablaAmortizacion, TablaAmortizacion } from "@/forms/tabla_amortizacion"
import { useState } from "react"
import type { TmainFormParams } from '@/forms/main-form'


function getTablaAmortizacionFromStorage() {
    if (typeof window !== 'undefined') {
        const tablaAmortizacionStr: string | null = window.localStorage.getItem('tabla_amortizacion')
        if (tablaAmortizacionStr) {
            const tablaAmortizacion: TtablaAmortizacion = JSON.parse(tablaAmortizacionStr)
            return tablaAmortizacion
        }
    }

    return []
}


function getMontoFromStorage (): TmainFormParams | null {
    if (typeof window !== 'undefined') {
        const inputStr: string | null = window.localStorage.getItem('amortizacion_input')
        if (inputStr) {
            const inputValue: TmainFormParams = JSON.parse(inputStr)
            return inputValue
        }
    }

    return null
}


export function MainContainer () {

    const [tabla, setTabla] = useState<TtablaAmortizacion>(getTablaAmortizacionFromStorage())
    const [monto] = useState<TmainFormParams | null>(getMontoFromStorage())

    return(
        <div className="flex flex-col gap-24">
            <MainForm valorInicial={tabla.length > 0 ? monto : null} setResponse={setTabla} />
            <TablaAmortizacion tabla={tabla}/>
        </div>
    )
}