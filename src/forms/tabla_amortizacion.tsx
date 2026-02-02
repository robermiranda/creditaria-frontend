type TamortizcionRow = number[]
export type TtablaAmortizacion = TamortizcionRow[]


export function TablaAmortizacion ({tabla}: {tabla: TtablaAmortizacion}) {
    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th>Mes</th>
                    <th>Anualidad</th>
                    <th>Interés</th>
                    <th>Amortización</th>
                    <th>Capital</th>
                </tr>
            </thead>
            <tbody>
                {
                    tabla.map((row: TamortizcionRow) => (
                        <tr key={row[0]}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                            <td>{row[3]}</td>
                            <td>{row[4]}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}