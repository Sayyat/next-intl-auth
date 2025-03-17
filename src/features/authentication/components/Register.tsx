"use client"

import React, {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {toast} from "react-toastify"
import {Eye, EyeOff} from "lucide-react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {useTranslations} from "next-intl"

import {createRegisterSchema} from "@/features/authentication/lib/zod"
import {signIn} from "next-auth/react"

import {LanguageSelect} from "@/shared/components/LanguageSelect"
import {Loading} from "@/shared/components/svg/Loading"
import {Checkbox} from "@/shared/components/Checkbox"
import {Button} from "@/shared/components/ui/button"

// ShadCN Form components
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/shared/components/ui/form"

// ShadCN Input
import {Input} from "@/shared/components/ui/input"
import {z} from "zod";
import {useStatuses} from "@/core/hooks/useStatuses";
import {ThemeSelect} from "@/shared/components/ThemeSelect";

export const Register: React.FC = () => {
    const router = useRouter()

    // UI translations (page text)
    const t = useTranslations("features.authentication.components.Register")

    // Build the synchronous Zod registerSchema
    const registerSchema = createRegisterSchema(useTranslations())
    type TRegisterForm = z.infer<typeof registerSchema>

    // Setup React Hook Form
    const form = useForm<TRegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            age: 0,
            status: "",
            password: "",
            confirm: "",
        },
    })

    const {statuses, statusLoading} = useStatuses();

    // **Password visibility states**
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    useEffect(()=> {
        if(statusLoading ||  statuses.length === 0) return
        form.setValue("status", statuses[0].value)
    }, [statuses,statusLoading])
    // On form submit
    const onSubmit = async (data: TRegisterForm) => {
        try {
            // Optionally signIn user automatically
            const res = await signIn("register", {
                redirect: false,
                ...data,
            })
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
        }
    }

    return (
        <div
            className="w-full h-full flex flex-col bg-primary text-primary-foreground shadow-lg p-10 gap-2">
            <div className="flex flex-col overflow-y-auto gap-6">
                {/* Header */}
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold">
                            {t("title")}
                        </h2>
                        <p className="text-muted-foreground">
                            {t("subtitle")}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <LanguageSelect/>
                        <ThemeSelect/>
                    </div>
                </div>

                {/* ShadCN Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* FIRSTNAME */}
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel
                                        className="px-4"
                                    >{t("labels.firstname")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={t("placeholders.firstname")}
                                            className="rounded-xl bg-muted"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* LASTNAME */}
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel
                                        className="px-4"
                                    >{t("labels.lastname")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={t("placeholders.lastname")}
                                            className="rounded-xl bg-muted"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* EMAIL */}
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

                        {/* AGE */}
                        <FormField
                            control={form.control}
                            name="age"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel
                                        className="px-4"
                                    >{t("labels.age")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={0}
                                            value={field.value?.toString() ?? ""}
                                            onChange={(e) => {
                                                const val = e.target.value === "" ? undefined : Number(e.target.value)
                                                field.onChange(val)
                                            }}
                                            className="rounded-xl bg-muted"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* STATUS */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel
                                        className="px-4"
                                    >{t("labels.status")}</FormLabel>
                                    <FormControl>
                                        {statusLoading ? (
                                            <div className="flex justify-center">
                                                <Loading className="w-6 h-6"/>
                                            </div>
                                        ) : (
                                            <select
                                                {...field}
                                                className="block w-full px-4 py-3 border border-input rounded-xl bg-muted text-foreground"
                                            >
                                                {statuses.map(({value, label}) => (
                                                    <option key={value} value={value}>
                                                        {t(`status.${value}`)}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* PASSWORD (with toggle) */}
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

                        {/* CONFIRM (with toggle) */}
                        <FormField
                            control={form.control}
                            name="confirm"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel
                                        className="px-4"
                                    >{t("labels.confirmPassword")}</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={showConfirm ? "text" : "password"}
                                                placeholder={t("placeholders.confirmPassword")}
                                                className="pr-10 rounded-xl bg-muted"
                                            />
                                        </FormControl>
                                        {/* Confirm password visibility toggle */}
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-3 top-3 text-muted-foreground"
                                            aria-label="Toggle password visibility"
                                        >
                                            {showConfirm ? <EyeOff className="h-5 w-5"/> :
                                                <Eye className="h-5 w-5"/>}
                                        </button>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Checkbox
                            className="text-muted-foreground"
                            label={t.rich("buttons.agree", {
                                link: (chunks) => (
                                    <a
                                        href="/terms_and_conditions"
                                        className="text-button"
                                    >
                                        {chunks}
                                    </a>
                                )
                            })}
                            name="checkbox"/>
                        <Button
                            type="submit"
                            className="w-full py-3 text-xl bg-secondary text-secondary-foreground rounded-3xl">
                            {t("buttons.submit")}
                        </Button>
                    </form>
                </Form>
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
