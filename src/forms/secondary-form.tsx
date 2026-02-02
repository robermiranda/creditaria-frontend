import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { type TtablaAmortizacion } from "@/forms/tabla_amortizacion"
import { type Tmonto } from "@/forms/secondary-container"

export function SecondaryForm ({setTabla, setMonto}: {
    setTabla: Dispatch<SetStateAction<TtablaAmortizacion>>,
    setMonto: Dispatch<SetStateAction<Tmonto | null>>
}) {

    const [identificador, setIdentificador] = useState<string>('')

    function onSubmitForm () {
        console.log('IDENTIFICADOR', identificador)
        setTabla(
            [
                [0,0,0,0,1965],
                [1,498.4348967742801,11.4625,486.9723967742801,1478.0276032257198],
                [2,498.4348967742801,8.621827685483366,489.81306908879674,988.214534136923],
                [3,498.4348967742801,5.764584782465384,492.67031199181474,495.5442221451083],
                [4,498.4348967742801,2.8906746291797982,495.5442221451003,7.958078640513122e-12]
            ]
        )
        setMonto({
            monto: 1965,
            tasa: 0.07,
            plazo: 4,
            identificador: "02020939"
        })
    }

    return (
        <div className="flex flex-col lg:w-1/4 lg:mx-auto gap-4 ">
            <input
                type="text"
                value={identificador}
                onChange={e => setIdentificador(e.target.value)}
                placeholder="Identificador"/>
            
            <button type="submit" onClick={onSubmitForm}>
                Recuperar
            </button>
        </div>
    )
}