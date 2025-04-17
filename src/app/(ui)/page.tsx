"use client"
import {useTranslations} from "next-intl";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useProfile} from "@/features/authentication";

export default function Home() {
    const {data} = useProfile()
    const t = useTranslations("app.(ui).page");
    const router = useRouter()
    useEffect(() => {
        router.push("/calculators/household-goods")
    }, []);
    return (
        <div
            className=""
        > {t("welcomeMessage", {username: data?.firstname})}
        </div>
    );
}
