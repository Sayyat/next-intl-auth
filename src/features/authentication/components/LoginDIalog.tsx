import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {X} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useTranslations} from "next-intl";
import {Loading} from "@/shared/components/svg/Loading";
import {Checkbox} from "@/shared/components/Checkbox";
import {Button} from "@/shared/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/shared/components/ui/form";
import {createLoginSchema} from "@/features/authentication/lib/zod";

// ShadCN Dialog Components
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/shared/components/ui/dialog";
import {TAuthModal} from "@/core/types/header";
import {FloatingLabelInput} from "@/shared/components/FloatingLabelInput";
import {FloatingLabelPasswordInput} from "@/shared/components/FloatingLabelPasswordInput";
import {useAuth} from "@/features/authentication/hooks/useAuth";
import {useProfile} from "@/features/authentication";

interface ILoginDialogProps {
    open: boolean;
    setCurrentModal: (modal: TAuthModal) => void
}

export const LoginDialog: React.FC<ILoginDialogProps> = ({
                                                             open,
                                                             setCurrentModal
                                                         }) => {
    const t = useTranslations("features.authentication.components.LoginDialog");
    const {loginMutation} = useAuth()

    const [loading, setLoading] = useState(false);

    const loginSchema = createLoginSchema(useTranslations());
    type TLoginForm = z.infer<typeof loginSchema>;

    // React Hook Form
    const form = useForm<TLoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data: TLoginForm) => {
        setLoading(true);
        try {
            const res = await loginMutation.mutateAsync({
                ...data,
            });
            console.log({res})
            if (res?.ok) {
                toast.success(t("messages.success"));
                // await refetch()
                setCurrentModal(undefined); // Close modal on success
            }
        } catch (error) {
            console.log({error})
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
                    <DialogTitle className="text-xl font-bold">{t("loginTitle")}</DialogTitle>
                    <DialogClose className="cursor-pointer">
                        <X className="h-5 w-5"/>
                    </DialogClose>
                </DialogHeader>
                {/* LOGIN FORM */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                        {/* EMAIL FIELD */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    {/*<FormLabel className="px-4">{t("labels.email")}</FormLabel>*/}
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
                                    <FormControl>
                                        <FloatingLabelPasswordInput
                                            {...field}
                                            name="password"
                                            label={t("labels.password")}
                                            value={field.value}
                                            onChange={(e) => form.setValue("password", e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* REMEMBER ME & FORGOT PASSWORD */}
                        <div className="flex items-center justify-between">
                            <Checkbox
                                label={t("buttons.remember")}
                                name="checkbox"
                                className="border-2 border-muted rounded"
                            />
                            <Button
                                variant="link"
                                className="text-button text-md hover:text-button-accent font-medium"
                                onClick={() => setCurrentModal("resetPassword")}
                            >
                                {t("messages.forgotPassword")}
                            </Button>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <Button
                            type="submit"
                            variant="link"
                            disabled={loading}
                            className="w-full py-3 text-xl bg-button-accent text-primary-foreground rounded-3xl">
                            {loading ? <Loading className="w-6 h-6 mx-auto"/> : t("buttons.submit")}
                        </Button>

                        {/* REGISTER LINK */}
                        <div className="flex items-center justify-center text-muted-foreground">
                            <p>
                                {t("messages.noAccount")}{' '}
                            </p>
                            <Button
                                variant="link"
                                className="text-button text-md hover:text-button-accent font-medium"
                                onClick={() => setCurrentModal("register")}
                            >
                                {t("messages.registerLink")}
                            </Button>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
};
