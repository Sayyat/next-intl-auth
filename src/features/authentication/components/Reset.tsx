"use client"

import React, {useState} from "react"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {toast} from "react-toastify"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {useTranslations} from "next-intl"

import {LanguageSelect} from "@/shared/components/LanguageSelect"
import {Loading} from "@/shared/components/svg/Loading"
import {Button} from "@/shared/components/ui/button"
import {Input} from "@/shared/components/ui/input"


// ShadCN Form components
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/shared/components/ui/form"
import {createResetSchema} from "@/features/authentication/lib/zod";
import {ThemeSelect} from "@/shared/components/ThemeSelect";
import {Logo} from "@/shared/components/svg/Logo";
import {resetPassword} from "@/features/authentication/services/client";


export const Reset: React.FC = () => {
    const router = useRouter()
    const t = useTranslations("features.authentication.components.Reset")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const resetSchema = createResetSchema(useTranslations())
    type TResetForm = z.infer<typeof resetSchema>

    // 2. Initialize React Hook Form
    const form = useForm<TResetForm>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: "",
        },
    })

    // 3. On form submit
    const onSubmit = async (data: TResetForm) => {
        setLoading(true)
        try {
            const res = await resetPassword({
                ...data,
            })
            if (res.success) {
                toast.success(res.data.message)
                return
            }
            toast.error(res.error)
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
                        <h2 className="text-3xl font-bold text-starts text-card-foreground">
                            {t("resetTitle")}
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
                <p className="text-center text-muted-foreground">
                    {t("messages.alreadyRegistered")}{" "}
                    <Link href="/login" className="text-button hover:text-muted-foreground font-medium">
                        {t("messages.loginLink")}
                    </Link>
                </p>
            </div>
        </div>
    )
}
