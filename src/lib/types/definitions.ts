import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Jméno musí mít aspoň 2 znaky.' })
    .trim(),
  email: z.string().email({ message: 'Zadejte validní email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Heslo musí mít aspoň 8 znaků.' })
    .regex(/[a-zA-Z]/, { message: 'Heslo musí obsahovat alespoň jedno písmeno.' })
    .regex(/[0-9]/, { message: 'Heslo musí obsahovat alespoň jedno číslo.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Heslo musí obsahovat alespoň jeden speciální znak.',
    // })
    .trim(),
})

export type SignUpFormSchema = z.infer<typeof SignupFormSchema>
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined