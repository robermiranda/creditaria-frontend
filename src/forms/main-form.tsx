import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
//import { toast } from "sonner"
import * as z from "zod"
//import { Button } from "@/components/ui/button"
import {
  Field,
  //FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


const formSchema = z.object({
    monto: z.number()
        .min(1, 'El monto debe ser mayor o igual que $1.00 MXN'),
    tasa: z.number()
        .min(0.0001, 'La tasa anual debe ser mayor al 0.01%')
        .max(1, 'La tasa anual no debe exceder del 100%'),
    plazo: z.number()
        .min(1, 'El plazo a meses debe ser mayor o igual a 1 mes.'),
    identificador: z.string()
        .max(20, 'Un identificador corto, no más de 20 chars.'),
})


export function MainForm () {
    //const [monto, setMonto] = useState<number>(0)
    //const [tasaAnual, setTasaAnual] = useState<number>(0)
    //const [plazoMeses, setPlazoMeses] = useState<number>(0)
    
    const mainForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            monto: 0,
            tasa: 0,
            plazo: 0,
            identificador: "",
        },
    })
    
    function onSubmitForm(data: z.infer<typeof formSchema>) {
        console.log('SUBMITED DATA', data)
    }

    return (
        <div>
            <form id="main-form" onSubmit={mainForm.handleSubmit(onSubmitForm)}>
                <FieldGroup>
                    <Controller
                        name="monto"
                        control={mainForm.control}
                        render={
                            ({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="main-form">
                                        Monto
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="monto"
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
                                    <FieldLabel htmlFor="main-form">
                                        Tasa Anual
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="tasa"
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
                                    <FieldLabel htmlFor="main-form">
                                        Plazo a Meses
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="plazo"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="plazo"
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
                        name="identificador"
                        control={mainForm.control}
                        render={
                            ({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="main-form">
                                        Nombre o Identificador
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="identificador"
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
        </div>
    )
}
