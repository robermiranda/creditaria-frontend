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
        <div className="flex flex-col lg:w-1/3 lg:mx-auto gap-6 bg-linear-to-br from-slate-50 to-slate-100 p-8 rounded-lg border border-slate-200 shadow-lg">
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                    Identificador de Solicitud
                </label>
                <input
                    type="text"
                    value={identificador}
                    onChange={e => setIdentificador(e.target.value)}
                    placeholder="Ej: 02020939"
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-md focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-slate-900 placeholder-slate-400"
                />
            </div>
            
            <button 
                type="submit" 
                onClick={onSubmitForm}
                className="w-full bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-sm"
            >
                Recuperar Solicitud
            </button>
            
            <p className="text-xs text-slate-500 text-center mt-2">
                Ingresa el identificador para recuperar tu simulación anterior
            </p>
        </div>
    )
}