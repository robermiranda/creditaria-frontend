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
            <div className="flex justify-center">
                <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 shadow-md overflow-hidden w-full lg:w-1/2">
                    <table className="w-full">
                        <tbody>
                            <tr className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-700 bg-slate-100/50">Monto</td>
                                <td className="px-6 py-4 text-slate-900 font-medium">${monto?.monto.toLocaleString('es-MX', {minimumFractionDigits: 2})}</td>
                            </tr>
                            <tr className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-700 bg-slate-100/50">Tasa Anual</td>
                                <td className="px-6 py-4 text-slate-900 font-medium">{((monto?.tasa || 0) * 100).toFixed(2)}%</td>
                            </tr>
                            <tr className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-700 bg-slate-100/50">Plazo (Meses)</td>
                                <td className="px-6 py-4 text-slate-900 font-medium">{monto?.plazo}</td>
                            </tr>
                            <tr className="hover:bg-slate-100 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-700 bg-slate-100/50">Identificador</td>
                                <td className="px-6 py-4 text-slate-900 font-medium">{monto?.identificador}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}