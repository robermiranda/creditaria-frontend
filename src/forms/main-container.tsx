import { MainForm } from "@/forms/main-form"
import { type TtablaAmortizacion, TablaAmortizacion } from "@/forms/tabla_amortizacion"
import { useState } from "react"


export function MainContainer () {
    const [tabla, setTabla] = useState<TtablaAmortizacion>([])

    return(
        <div className="flex flex-col gap-20">
            <MainForm setResponse={setTabla} />
            <TablaAmortizacion tabla={tabla}/>
        </div>
    )
}