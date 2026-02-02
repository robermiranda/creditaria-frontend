import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import { useState, useRef, useEffect } from "react"
import * as z from "zod"
import type { Dispatch, SetStateAction } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Field,
  //FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { type TtablaAmortizacion } from "@/forms/tabla_amortizacion"

const formSchema = z.object({
    monto: z.coerce.number<number>()
        .min(1, 'El monto debe ser mayor o igual que $1.00 MXN'),    
    tasa: z.coerce.number<number>()
        .min(0.01, 'La tasa anual debe ser menor al 0.01%')
        .max(100, 'La tasa anual no debe exceder del 100%'),
    plazo:z.coerce.number<number>()
        .min(1, 'El plazo a meses debe ser mayor o igual a 1 mes.'),
    identificador: z.string()
        .max(20, 'Un identificador corto, no más de 20 chars.'),
})

export type TmainFormParams = z.infer<typeof formSchema>
export const TABLA_AMORTIZACION: string = 'tabla_amortizacion'
export const DATA_AMORTIZACION: string = 'amortizacion_input'

export function MainForm ({setResponse, valorInicial}: {
        setResponse: Dispatch<SetStateAction<TtablaAmortizacion>>
        valorInicial: TmainFormParams | null
    }) {

    const [isTablaSetted, setIsTableSetted] = useState<boolean>(true)
    const isFirstLoadRef = useRef<boolean>(true)    
    const mainForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: getDefaultValues(),
    })
    
    useEffect(() => {
        isFirstLoadRef.current = false
    })

    useWatch({
        name: 'monto',
        control: mainForm.control,
        compute: (data) => {
            console.log(data)
            if ( ! isFirstLoadRef.current && isTablaSetted) {
                setIsTableSetted(false)
                setResponse([])
                localStorage.removeItem(TABLA_AMORTIZACION)
            }
        }
    })

    function getDefaultValues (): TmainFormParams {
        if (valorInicial) {
            return {
                monto: valorInicial.monto,
                tasa: valorInicial.tasa,
                plazo: valorInicial.plazo,
                identificador: valorInicial.identificador,
            }
        }

        return {
            monto: 1000,
            tasa: 3,
            plazo: 6,
            identificador: "",
        }
    }

    async function onSubmitForm(data: z.infer<typeof formSchema>) {
        const response: Response = await fetch (
            'http://localhost:8000/simulate',
            {
                method: 'POST',
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    monto: data.monto,
                    tasa_anual: (data.tasa / 100),
                    plazo_meses: data.plazo,
                    nombre_identificador: data.identificador
                })
            }
        )

        if ( ! response.ok) {
            console.error('ERROR RESPONSE', response.statusText)
            return
        }

        const tablaAmortizacion = await response.json()

        setIsTableSetted(true)
        setResponse(tablaAmortizacion)
        localStorage.setItem(TABLA_AMORTIZACION, JSON.stringify(tablaAmortizacion))
        localStorage.setItem(DATA_AMORTIZACION, JSON.stringify({
            monto: data.monto,
            tasa: data.tasa,
            plazo: data.plazo,
            identificador: data.identificador
        }))
    }


    return (
        <div className="flex justify-center w-full">
            <div className="w-full max-w-md bg-linear-to-br from-slate-50 to-slate-100 border-2 border-slate-200 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Simulador de Crédito</h2>
                <div className="flex flex-col gap-8">
                    <form id="main-form" onSubmit={mainForm.handleSubmit(onSubmitForm)}>
                        <FieldGroup>
                            <Controller
                                name="monto"
                                control={mainForm.control}
                                render={
                                    ({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="main-form-monto">
                                                <span className="text-lg">Monto</span>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="main-form-monto"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Monto del prestamo"
                                                autoComplete="off"
                                            />
                                            {
                                                fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )
                                            }
                                        </Field>
                                    )
                                }
                            />
                            <Controller
                                name="tasa"
                                control={mainForm.control}
                                render={
                                    ({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="main-form-tasa">
                                                <span className="text-lg">Tasa Anual %</span>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="main-form-tasa"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Ejem. 3"
                                                autoComplete="off"
                                            />
                                            {
                                                fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )
                                            }
                                        </Field>
                                    )
                                }
                            />
                            <Controller
                                name="plazo"
                                control={mainForm.control}
                                render={
                                    ({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="main-form-plazo">
                                                <span className="text-lg">Plazo a Meses</span>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="main-form-plazo"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="plazo"
                                                autoComplete="off"
                                                type="number"
                                            />
                                            {
                                                fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )
                                            }
                                        </Field>
                                    )
                                }
                            />
                            <Controller
                                name="identificador"
                                control={mainForm.control}
                                render={
                                    ({field, fieldState}) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="main-form-identificador">
                                                Nombre o Identificador
                                                <span className="text-xs font-light">Opcional</span>
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="main-form-identificador"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="nombre de la solicitud"
                                                autoComplete="off"
                                            />
                                            {
                                                fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )
                                            }
                                        </Field>
                                    )
                                }
                            />
                        </FieldGroup>
                    </form>
                    <div className="flex justify-center">
                        <Button
                            variant="outline"
                            size="lg"
                            type="submit"
                            form="main-form"
                            className="px-5 shadow-purple-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition"
                        >
                            <span className="text-xl font-semibold text-purple-700">
                                CALCULAR
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
