"use client"

import React, {useState} from "react"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {toast} from "react-toastify"
import {Eye, EyeOff} from "lucide-react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {signIn} from "next-auth/react"
import {useTranslations} from "next-intl"

import {LanguageSelect} from "@/shared/components/LanguageSelect"
import {Loading} from "@/shared/components/svg/Loading"
import {Checkbox} from "@/shared/components/Checkbox"
import {Button} from "@/shared/components/ui/button"
import {Input} from "@/shared/components/ui/input"


// ShadCN Form components
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/shared/components/ui/form"
import {createLoginSchema} from "@/features/authentication/lib/zod";
import {ThemeSelect} from "@/shared/components/ThemeSelect";
import {Logo} from "@/shared/components/svg/Logo";


export const Login: React.FC = () => {
    const router = useRouter()
    const t = useTranslations("features.authentication.components.Login")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const loginSchema = createLoginSchema(useTranslations())
    type TLoginForm = z.infer<typeof loginSchema>

    // 2. Initialize React Hook Form
    const form = useForm<TLoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 3. On form submit
    const onSubmit = async (data: TLoginForm) => {
        setLoading(true)
        try {
            const res = await signIn("login", {
                redirect: false,
                ...data,
            })

            // console.log({res})

            if (res?.error) {
                toast.error(res.code || t("messages.error"))
                return
            }

            if (res?.ok) {
                toast.success(t("messages.success"))
                router.replace("/")
            }
        } catch (error) {
            toast.error(t("messages.unexpectedError"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-full w-full flex flex-col justify-end gap-4">

            <div className="flex flex-col gap-4 p-6 text-secondary-foreground">
                <div className="flex items-center">
                    <Logo/>
                </div>
                <p className="">
                    {t("subtitle")}
                </p>
            </div>
            <div
                className="w-full h-[65%] flex flex-col justify-between bg-primary text-primary-foreground shadow-lg rounded-t-3xl p-10 gap-2">
                {/* Header */}
                <div className="flex flex-col overflow-y-auto gap-6">
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-bold text-center text-card-foreground">
                            {t("loginTitle")}
                        </h2>
                        <div className="flex items-start">
                            <LanguageSelect/>
                            <ThemeSelect/>
                        </div>
                    </div>

                    {/* ShadCN Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            {/* EMAIL FIELD */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="px-4"
                                        >{t("labels.email")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={t("placeholders.email")}
                                                className="rounded-xl bg-muted"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {/* PASSWORD FIELD */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="px-4"
                                        >{t("labels.password")}</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder={t("placeholders.password")}
                                                    className="pr-10 rounded-xl bg-muted"
                                                />
                                            </FormControl>
                                            {/* Password visibility toggle */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-3 text-muted-foreground"
                                                aria-label="Toggle password visibility"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5"/> :
                                                    <Eye className="h-5 w-5"/>}
                                            </button>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center justify-between">
                                <Checkbox label={t("buttons.remember")} name="checkbox"/>
                                <Link href="/reset" className="text-button hover:text-secondary font-medium">
                                    {t("messages.forgotPassword")}
                                </Link>
                            </div>
                            {/* SUBMIT BUTTON */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 text-xl bg-secondary text-secondary-foreground rounded-3xl"
                            >
                                {loading ? <Loading className="w-6 h-6 mx-auto"/> : t("buttons.submit")}
                            </Button>
                        </form>
                    </Form>
                </div>
                {/* Already have an account? */}
                <p className="text-center text-muted-foreground">
                    {t("messages.noAccount")}{' '}
                    <Link href="/register" className="text-button hover:text-muted-foreground font-medium">
                        {t("messages.registerLink")}
                    </Link>
                </p>
            </div>
        </div>
    )
}
