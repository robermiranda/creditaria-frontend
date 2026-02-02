type TamortizcionRow = number[]
export type TtablaAmortizacion = TamortizcionRow[]


export function TablaAmortizacion ({tabla}: {tabla: TtablaAmortizacion}) {
    return (
            <div className="flex justify-center w-full">
                <table className="table-auto border-4 border-purple-400 w-full lg:w-3/4">
                    <thead>
                        <tr className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                            <th className="text-center py-6">Mes</th>
                            <th className="text-center py-6">Anualidad</th>
                            <th className="text-center py-6">Interés</th>
                            <th className="text-center py-6">Amortización</th>
                            <th className="text-center py-6">Capital</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tabla.map((row: TamortizcionRow) => (
                                <tr key={row[0]} className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                                    <td>{row[0]}</td>
                                    <td className="text-center py-4 text-slate-900 font-medium">{row[1].toFixed(2)}</td>
                                    <td className="text-center py-4 text-slate-900 font-medium">{row[2].toFixed(2)}</td>
                                    <td className="text-center py-4 text-slate-900 font-medium">{row[3].toFixed(2)}</td>
                                    <td className="text-center py-4 text-slate-900 font-medium">{row[4].toFixed(2)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
    )
}