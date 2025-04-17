import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/shared/components/ui/table";
import React from "react";
import {useTranslations} from "next-intl";
import {format} from "date-fns";
import {Select} from "@/shared/components/Select";
import {useUserCalculationsStore} from "@/features/user-calculations/store/userCalculationsStore";
import {IItemsPerPage} from "@/features/user-calculations/types/api";
import {Button} from "@/shared/components/ui/button";

export function UserCalculationsComponent() {
    const t = useTranslations("features.user-calculations.components.UserCalculationsComponent");
    // const userCalculations = useUserCalculations()
    const store = useUserCalculationsStore()
    return (
        <div className="w-full flex flex-col items-start gap-4">
            <Table className="caption-top text-md rounded-md border border-muted">
                <TableCaption className="bg-muted text-lg font-bold p-4 rounded-t-md border-b border-muted">
                    {t("userCalculations")}
                </TableCaption>
                <TableHeader className="font-bold [&_tr]:border-b-0 border-muted bg-card-primary">
                    <TableRow className="grid grid-cols-6 border-b-0 items-center justify-center text-center">
                        <TableHead className="border border-muted flex items-center">{t("number")}</TableHead>
                        <TableHead className="border border-muted flex items-center">{t("number")}</TableHead>
                        <TableHead className="border border-muted flex items-center">{t("name")}</TableHead>
                        <TableHead
                            className="border border-muted flex items-center">{t("organization")}</TableHead>
                        <TableHead className="border border-muted flex items-center">{t("city")}</TableHead>
                        <TableHead className="border border-muted flex items-center">{t("object_name")}</TableHead>
                        <TableHead className="border border-muted flex items-center">{t("created_at")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {store.rows?.items?.map((rowData, index) => {
                        return (
                            <TableRow key={`row-${index}`} className="grid grid-cols-6 border-b-0">
                                <TableCell
                                    className="border border-muted flex items-center">{rowData.id}</TableCell>
                                <TableCell
                                    className="border border-muted flex items-center">{rowData.id}</TableCell>
                                <TableCell
                                    className="border border-muted flex items-center">{rowData.name}</TableCell>
                                <TableCell
                                    className="border border-muted flex items-center">{rowData.organization}</TableCell>
                                <TableCell
                                    className="border border-muted flex items-center">{rowData.city.city_name}</TableCell>
                                <TableCell
                                    className="border border-muted flex items-center">{rowData.object_name}</TableCell>
                                <TableCell
                                    className="border border-muted flex items-center">{
                                    format(rowData.created_at, "HH:mm dd.MM.yyyy")}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between w-full">
                <Select<IItemsPerPage>
                    name="initialDataControlCabinet"
                    label={t("rowsCount")}
                    options={store.itemsPerPageOptions}
                    optionValueKey="value"
                    optionLabelKeys={["label"]}
                    wrapperClassName="p-0 w-50"
                    value={store.itemsPerPage}
                    onChange={(value) =>
                        store.setField("itemsPerPage", value)
                    }
                />

                <div className="flex items-center justify-between gap-2">
                    <div>
                        1
                    </div>
                    <div>
                        2
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <Button
                        variant="link"
                        className="border border-card-foreground text-card-foreground rounded-xl flex items-center"
                        onClick={() => store.previousPage}
                    >
                        {t("previous")}
                    </Button>
                    <Button
                        variant="link"
                        className="border border-card-foreground text-card-foreground rounded-xl flex items-center"
                        onClick={() => store.nextPage}
                    >
                        {t("next")}
                    </Button>
                </div>
            </div>
        </div>
    )
}