import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
//import { toast } from "sonner"
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
        .min(0.01, 'La tasa anual debe ser mayor al 0.01%')
        .max(1, 'La tasa anual no debe exceder del 100%'),
    plazo:z.coerce.number<number>()
        .min(1, 'El plazo a meses debe ser mayor o igual a 1 mes.'),
    identificador: z.string()
        .max(20, 'Un identificador corto, no más de 20 chars.'),
})


export function MainForm ({setResponse}: {setResponse: Dispatch<SetStateAction<TtablaAmortizacion>>}) {
    
    const mainForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            monto: 1,
            tasa: 0.01,
            plazo: 1,
            identificador: "",
        },
    })

    useWatch({
        name: 'monto',
        control: mainForm.control,
        compute: (data: number) => {
            console.log('MONTO VALUE CHANGED ???', data)
        }
    })

    async function onSubmitForm(data: z.infer<typeof formSchema>) {
        console.log('SUBMITED DATA', data)
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
                    tasa_anual: data.tasa,
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

        console.log('TABLA AMORTIZACION', tablaAmortizacion)

        setResponse(tablaAmortizacion)
    }


    return (
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
                                        Monto
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
                                        Tasa Anual
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="main-form-tasa"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="tasa anual"
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
                                        Plazo a Meses
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
            <Button
                variant="outline"
                type="submit"
                form="main-form">
                
                Calcular
            </Button>
        </div>
    )
}
