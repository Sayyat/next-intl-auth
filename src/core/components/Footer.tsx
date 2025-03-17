import {useTranslations} from "next-intl";

export function Footer() {
    const t = useTranslations("app.(ui)._components.Footer");

    return (
        <div className="flex items-center justify-center gap-2 h-full border-t">
            <span>{t("createdBy")}</span>
            <span>{new Date().getFullYear()}</span>
        </div>
    )
}
