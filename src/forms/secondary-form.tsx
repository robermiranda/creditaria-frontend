import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { type TtablaAmortizacion } from "@/forms/tabla_amortizacion"
import { type Tmonto } from "@/forms/secondary-container"

export function SecondaryForm ({setTabla, setMonto}: {
    setTabla: Dispatch<SetStateAction<TtablaAmortizacion>>,
    setMonto: Dispatch<SetStateAction<Tmonto | null>>
}) {

    const [identificador, setIdentificador] = useState<string>('')

    async function onSubmitForm () {

        const response: Response = await fetch (
            `http://localhost:8000/identificador/${identificador}`,
            {
                method: 'GET',
                headers: {
                    "accept": "application/json",
                },
            }
        )

        if ( ! response.ok) {
            console.error('GET ERROR /identificador', response.statusText)
            return
        }

        const datos: unknown = await response.json()

        if ( ! datos || typeof datos !== 'object') {
            return null
        }
        
        if (
            'amortizaciones' in datos &&
            Array.isArray(datos.amortizaciones) &&
            'anualidad' in datos &&
            typeof datos.anualidad === 'object' &&
            datos.anualidad !== null &&
            'auditoria' in datos &&
            typeof datos.auditoria === 'object' &&
            datos.auditoria !== null) {

            const datosAnualidad = (datos.anualidad as Record<string, unknown>).anualidad as number

            const amortizaciones: TtablaAmortizacion = datos.amortizaciones.map(amor => {
                return [
                    amor.periodo,
                    datosAnualidad,
                    amor.interes,
                    amor.amortizacion,
                    amor.capital
                ]
            })

            setTabla(amortizaciones)

            const anualidad = datos.anualidad as {
                monto: number,
                tasa_anual: number,
                plazo_meses: number,
                nombre_identificador: string
            }

            const auditoria = datos.auditoria as { valida: boolean }

            const datosMonto: Tmonto = {
                monto: anualidad.monto,
                tasa: anualidad.tasa_anual,
                plazo: anualidad.plazo_meses,
                identificador: anualidad.nombre_identificador,
                aprobado: auditoria.valida ? 'SI' : 'NO'
            }

            setMonto(datosMonto)
        }
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
                    placeholder="Ej: 02012318"
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
                Ingresa el identificador para recuperar tu simulación anterior. Ejemplo: 02012318
            </p>
        </div>
    )
}