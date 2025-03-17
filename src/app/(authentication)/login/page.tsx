'use client';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import {toast} from 'react-toastify';
import {useTranslations} from "next-intl";
import {LanguageSelect} from '@/shared/components/LanguageSelect';
import {Loading} from "@/shared/components/svg/Loading";
import {Input} from "@/shared/components/Input";
import {Checkbox} from "@/shared/components/Checkbox";
import {Button} from "@/shared/components/ui/button";
import {useTheme} from "@/shared/hooks/useTheme";
import {Moon, Sun} from "lucide-react";


const LoginPage: React.FC = () => {
    const router = useRouter();
    const t = useTranslations("app.(authentication).login");
    const [loading, setLoading] = useState(false);
    const {theme, toggleTheme} = useTheme()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true); // Start loading animation

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const res = await signIn('login', {
                redirect: false,
                email,
                password,
            });

            console.log({res});

            if (res?.error) {
                toast.error(res.code || t("error"));
                return;
            }

            if (res?.ok) {
                toast.success(t("success"));
                router.push('/'); // Redirect to the homepage
                return;
            }
        } catch (error) {
            toast.error(t("unexpectedError"));
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg p-10 rounded-xl border">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        {t("title")}
                    </h2>
                    <div className="flex items-center">
                        <LanguageSelect/>
                        <button onClick={toggleTheme} aria-label={t("toggleTheme")}>
                            {theme === "light" ? (
                                <Moon className="w-6 h-6 text-gray-600"/>
                            ) : (
                                <Sun className="w-6 h-6 text-gray-300"/>
                            )}
                        </button>
                    </div>
                </div>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={onSubmit}>
                    <Input
                        label={t("emailLabel")}
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="block w-full px-4 py-3 border rounded-lg shadow-xs focus:ring-accentColor focus:border-accentBorderColor text-lg text-primaryColor bg-primaryBackgroundColor"
                        placeholder={t("emailPlaceholder")}
                    />
                    <Input
                        label={t("passwordLabel")}
                        type="password"
                        name="password"
                        id="password"
                        required
                        className="block w-full px-4 py-3 border rounded-lg shadow-xs focus:ring-accentColor focus:border-accentBorderColor text-lg text-primaryColor bg-primaryBackgroundColor"
                        placeholder={t("passwordPlaceholder")}
                    />
                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 ${
                            loading ? "bg-inactiveBackgroundColor cursor-not-allowed" : "bg-accentBackgroundColor hover:bg-inactiveBackgroundColor"
                        } text-accentColor font-semibold rounded-lg text-lg`}
                    >
                        {loading ? <Loading className="w-6 h-6 mx-auto"/> : t("submitButton")}
                    </Button>

                    <Checkbox
                        label={t("remember")}
                        name={"checkbox"}
                    />
                </form>
                <p className="mt-6 text-center text-lg">
                    {t("noAccountMessage")}{' '}
                    <Link href="/register" className="text-accentBackgroundColor hover:text-primaryColor dark:hover:text-secondaryColor font-medium">
                        {t("registerLink")}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
