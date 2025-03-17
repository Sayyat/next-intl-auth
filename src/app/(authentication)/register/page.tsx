'use client';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import {toast} from 'react-toastify';
import {useTranslations} from 'next-intl';
import {LanguageSelect} from "@/shared/components/LanguageSelect";
import {Loading} from "@/shared/components/svg/Loading";
import {Input} from "@/shared/components/Input";
import {Checkbox} from "@/shared/components/Checkbox";
import {Button} from "@/shared/components/ui/button";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "@/shared/hooks/useTheme";

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const t = useTranslations('app.(authentication).register');
    const [loading, setLoading] = useState(false);
    const {theme, toggleTheme} = useTheme()

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true); // Start loading animation

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirm = formData.get('confirm') as string;

        try {
            const res = await signIn('signup', {
                redirect: false,
                username,
                email,
                password,
                confirm,
            });


            if (res?.error) {
                toast.error(res.code || t('error'));
                return;
            }

            if (res?.ok) {
                toast.success(t('success'));
                router.push('/');
                return;
            }
        } catch (error) {
            toast.error(t('unexpectedError'));
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg p-10 rounded-xl border border-primaryBorderColor">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold text-center mb-8 text-primaryColor">
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
                        label={t("usernameLabel")}
                        type="username"
                        name="username"
                        id="username"
                        required
                        className="block w-full px-4 py-3 border border-inactiveBorderColor rounded-lg shadow-xs focus:ring-accentColor focus:border-accentBorderColor text-lg text-primaryColor bg-inactiveBackground"
                        placeholder={t("usernamePlaceholder")}
                    />
                    <Input
                        label={t("emailLabel")}
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="block w-full px-4 py-3 border border-primary rounded-lg shadow-xs focus:ring-accentColor focus:border-accentBorderColor text-lg text-primaryColor bg-inactiveBackground"
                        placeholder={t("emailPlaceholder")}
                    />
                    <Input
                        label={t("passwordLabel")}
                        type="password"
                        name="password"
                        id="password"
                        required
                        className="block w-full px-4 py-3 border border-inactiveBorderColor rounded-lg shadow-xs focus:ring-accentColor focus:border-accentBorderColor text-lg text-primaryColor bg-inactiveBackground"
                        placeholder={t("passwordPlaceholder")}
                    />
                    <Input
                        label={t("confirmPasswordLabel")}
                        type="password"
                        name="confirm"
                        id="confirm"
                        required
                        className="block w-full px-4 py-3 border border-inactiveBorderColor rounded-lg shadow-xs focus:ring-accentColor focus:border-accentBorderColor text-lg text-primaryColor bg-inactiveBackground"
                        placeholder={t("confirmPasswordPlaceholder")}
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
                <p className="mt-6 text-center text-lg text-secondaryColor">
                    {t('alreadyRegisteredMessage')}{' '}
                    <Link href="/login" className="text-accentBackgroundColor hover:text-primaryColor font-medium">
                        {t('loginLink')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
