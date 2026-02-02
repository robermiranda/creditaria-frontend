import { MainForm } from "@/forms/main-form"
import { type TtablaAmortizacion, TablaAmortizacion } from "@/forms/tabla_amortizacion"
import { useState } from "react"
import type { TmainFormParams } from '@/forms/main-form'
import { DATA_AMORTIZACION, TABLA_AMORTIZACION } from '@/forms/main-form'
import { AppNavigator } from "@/forms/link-navigating"


function getTablaAmortizacionFromStorage() {
    if (typeof window !== 'undefined') {
        const tablaAmortizacionStr: string | null = window.localStorage.getItem(TABLA_AMORTIZACION)
        if (tablaAmortizacionStr) {
            const tablaAmortizacion: TtablaAmortizacion = JSON.parse(tablaAmortizacionStr)
            return tablaAmortizacion
        }
    }

    return []
}


function getMontoFromStorage (): TmainFormParams | null {
    if (typeof window !== 'undefined') {
        const inputStr: string | null = window.localStorage.getItem(DATA_AMORTIZACION)
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
        <div className="flex flex-col gap-24 w-96 px-2 mx-auto md:w-8/12 md:px-3 pb-8 border-2 border-slate-200">
            <AppNavigator />
            <MainForm valorInicial={tabla.length > 0 ? monto : null} setResponse={setTabla} />
            <TablaAmortizacion tabla={tabla}/>
        </div>
    )
}