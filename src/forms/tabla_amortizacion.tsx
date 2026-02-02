type TamortizcionRow = number[]
export type TtablaAmortizacion = TamortizcionRow[]


export function TablaAmortizacion ({tabla}: {tabla: TtablaAmortizacion}) {
    return (
            <div className="flex justify-center w-full">
                <table className="table-auto border-4 border-purple-400 w-full lg:w-3/4">
                    <thead>
                        <tr>
                            <th className="text-center">Mes</th>
                            <th className="text-center">Anualidad</th>
                            <th className="text-center">Interés</th>
                            <th className="text-center">Amortización</th>
                            <th className="text-center">Capital</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tabla.map((row: TamortizcionRow) => (
                                <tr key={row[0]}>
                                    <td>{row[0]}</td>
                                    <td className="text-center">{row[1].toFixed(2)}</td>
                                    <td className="text-center">{row[2].toFixed(2)}</td>
                                    <td className="text-center">{row[3].toFixed(2)}</td>
                                    <td className="text-center">{row[4].toFixed(2)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
    )
}