import React, {useState} from "react";
import {toast} from "react-toastify";
import {X} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useTranslations} from "next-intl";
import {z} from "zod";

import {createRegisterSchema} from "@/features/authentication/lib/zod";
import {Checkbox} from "@/shared/components/Checkbox";
import {Button} from "@/shared/components/ui/button";

// ShadCN Form components
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/shared/components/ui/form";

// ShadCN Dialog Components
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog";
import {TAuthModal} from "@/core/types/header";
import {useCities} from "@/features/common/hooks/useCities";
import {Select} from "@/shared/components/Select";
import {FloatingLabelPasswordInput} from "@/shared/components/FloatingLabelPasswordInput";
import {FloatingLabelInput} from "@/shared/components/FloatingLabelInput";
import {FloatingLabelPhoneInput} from "@/shared/components/FloatingLabelPhoneInput";
import {Loading} from "@/shared/components/svg/Loading";
import {useAuth} from "@/features/authentication/hooks/useAuth";
import {ICity} from "@/features/common";

interface IRegisterDialogProps {
    open: boolean;
    setCurrentModal: (modal: TAuthModal) => void;
}

export const RegisterDialog: React.FC<IRegisterDialogProps> = ({open, setCurrentModal}) => {
    const t = useTranslations("features.authentication.components.RegisterDialog");
    const {data: cities} = useCities()
    const {registerMutation} = useAuth()

    const [loading, setLoading] = useState(false);

    // Build the synchronous Zod schema
    const registerSchema = createRegisterSchema(useTranslations());
    type TRegisterForm = z.infer<typeof registerSchema>;

    // Setup React Hook Form
    const form = useForm<TRegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            firstname: "",
            lastname: "",
            middle_name: "",
            birthdate: "",
            iin: "",
            phone_number: "",
            city_id: cities?.success && cities.data.items[0]?.id || undefined,
            address: "",
            password: "",
            confirm: "",
        },
    });

    // On form submit
    const onSubmit = async (data: TRegisterForm) => {
        setLoading(true);
        try {
            const res = await registerMutation.mutateAsync({
                ...data,
            });

            if (res?.ok) {
                toast.success(t("messages.success"));
                // await refetch()
                setCurrentModal(undefined); // Close modal on success
            }
        } catch (error) {
            toast.error(t("messages.unexpectedError"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={() => setCurrentModal(undefined)}>
            <DialogContent
                className="max-w-[594px] sm:max-w-[594px] p-12 gap-12 rounded-xl sm:rounded-xl shadow-lg bg-background text-primary-foreground [&>button]:hidden"
                aria-describedby={undefined}
            >
                <DialogHeader className="flex flex-row justify-between items-center">
                    <DialogTitle className="text-xl font-bold">{t("title")}</DialogTitle>
                    <DialogClose className="cursor-pointer">
                        <X className="h-5 w-5"/>
                    </DialogClose>
                </DialogHeader>

                {/* REGISTER FORM */}
                {/*<div className="h-full w-full flex flex-col overflow-y-auto">*/}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                        {/* FIRSTNAME */}
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({field}) => (
                                <FormItem>
                                    {/*<FormLabel className="px-4">{t("labels.fullname")}</FormLabel>*/}
                                    <FormControl>
                                        <FloatingLabelInput
                                            {...field}
                                            type="text"
                                            name="firstname"
                                            label={t("labels.firstname")}
                                            value={field.value}
                                            onChange={(e) => form.setValue("firstname", e.target.value)}
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
                                    {/*<FormLabel className="px-4">{t("labels.fullname")}</FormLabel>*/}
                                    <FormControl>
                                        <FloatingLabelInput
                                            {...field}
                                            type="text"
                                            name="lastname"
                                            label={t("labels.lastname")}
                                            value={field.value}
                                            onChange={(e) => form.setValue("lastname", e.target.value)}
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
                                    <FormControl>
                                        <FloatingLabelInput
                                            {...field}
                                            type="text"
                                            name="email"
                                            label={t("labels.email")}
                                            value={field.value}
                                            onChange={(e) => form.setValue("email", e.target.value)}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* PHONE */}
                        <FormField
                            control={form.control}
                            name="phone_number"
                            render={({field}) => (
                                <FormItem>
                                    {/*<FormLabel className="px-4">{t("labels.phone")}</FormLabel>*/}
                                    <FormControl>
                                        <FloatingLabelPhoneInput
                                            {...field}
                                            name="phone_number"
                                            label={t("labels.phone")}
                                            value={field.value}
                                            onChange={(value) => form.setValue("phone_number", value)}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* CITY */}
                        <FormField
                            control={form.control}
                            name="city_id"
                            render={({field}) => {
                                const options = cities?.success ? cities.data.items : []
                                return (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Select<ICity>
                                                {...field}
                                                name="city_id"
                                                options={options}
                                                label={t("labels.city")}
                                                optionValueKey="id"
                                                optionLabelKeys={["city_name"]}
                                                wrapperClassName="p-0"
                                                value={options.find(option => option.id === field.value)}
                                                onChange={(value) => form.setValue("city_id", value?.id ?? 0)}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />

                        {/* PASSWORD */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <FormControl>
                                            <FloatingLabelPasswordInput
                                                {...field}
                                                name="password"
                                                label={t("labels.password")}
                                                value={field.value}
                                                onChange={(e) => form.setValue("password", e.target.value)}
                                            />
                                        </FormControl>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* CONFIRM PASSWORD */}
                        <FormField
                            control={form.control}
                            name="confirm"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <FormControl>
                                            <FloatingLabelPasswordInput
                                                {...field}
                                                name="confirm"
                                                label={t("labels.confirmPassword")}
                                                value={field.value}
                                                onChange={(e) => form.setValue("confirm", e.target.value)}
                                            />
                                        </FormControl>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* TERMS AGREEMENT */}
                        <Checkbox
                            label={t.rich("buttons.agree", {
                                link: (chunks) => <a href="/terms_and_conditions"
                                                     className="text-button">{chunks}</a>
                            })}
                            name="checkbox"
                            className="border-2 border-muted rounded"
                        />

                        <Button
                            type="submit"
                            variant="link"
                            disabled={loading}
                            className="w-full py-3 text-xl bg-button-accent text-primary-foreground rounded-3xl">
                            {loading ? <Loading className="w-6 h-6 mx-auto"/> : t("buttons.submit")}
                        </Button>
                    </form>
                </Form>
                {/*</div>*/}
            </DialogContent>
        </Dialog>
    );
};
