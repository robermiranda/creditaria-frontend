import { SecondaryForm } from "@/forms/secondary-form";
import { useState } from "react"
import { type TtablaAmortizacion, TablaAmortizacion } from "@/forms/tabla_amortizacion"

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
        <div>
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