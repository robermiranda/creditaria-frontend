import { SecondaryForm } from "@/forms/secondary-form";
import { useState } from "react"
import { type TtablaAmortizacion, TablaAmortizacion } from "@/forms/tabla_amortizacion"
import { AppNavigator } from "@/forms/link-navigating"

export type Tmonto = {
    monto: number,
    tasa: number,
    plazo: number,
    identificador: string
}

export function SecondaryContainer () {

    const [monto, setMonto] = useState<Tmonto | null>(null)
    const [tabla, setTabla] = useState<TtablaAmortizacion>([])

    return (
        <div className="flex flex-col gap-24 w-96 px-2 mx-auto md:w-8/12 md:px-3 pb-8 border-2 border-slate-200">
            <AppNavigator/>
            <SecondaryForm setTabla={setTabla} setMonto={setMonto}/>
            <TablaAmortizacion tabla={tabla}/>
            <div>
                <ul>
                    <li>Monto: {monto?.monto}</li>
                    <li>Tasa: {monto?.tasa}</li>
                    <li>Plazo: {monto?.plazo}</li>
                    <li>Identificador: {monto?.identificador}</li>
                </ul>
            </div>
        </div>
    )
}