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
import {useDisplaySettingsMock} from "@/features/display-settings/hooks/useDisplaySettingsMock";
import {Switch} from "@/shared/components/ui/switch";
import {useDisplaySettings} from "@/features/display-settings/hooks/useDisplaySettings";

export function DisplaySettingsComponent() {
    const t = useTranslations("features.display-settings.components.DisplaySettingsComponent");
    const {postRowSettingsMutation} = useDisplaySettings()
    const {displaySettings, isLoading} = useDisplaySettingsMock()
    const tableData = displaySettings?.success ? displaySettings?.data.items : []
    return (
        <div className="w-full flex flex-col items-start gap-4">
            <Table className="caption-top text-md rounded-md border border-muted">
                <TableCaption className="bg-muted text-lg font-bold p-4 rounded-t-md border-b border-muted">
                    {t("displaySettings")}
                </TableCaption>
                <TableHeader className="font-bold [&_tr]:border-b-0 border-muted bg-card-primary">
                    <TableRow className="grid grid-cols-6 border-b-0 items-center justify-center text-center">
                        <TableHead className="border border-muted flex items-center">{t("number")}</TableHead>
                        <TableHead className="border border-muted flex items-center">{t("name")}</TableHead>
                        <TableHead
                            className="border border-muted flex items-center">{t("householdGoods")}</TableHead>
                        <TableHead className="border border-muted flex items-center">{t("kns")}</TableHead>
                        <TableHead className="border border-muted flex items-center">{t("stormDrain")}</TableHead>
                        <TableHead className="border border-muted flex items-center">{t("calculations")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((rowData, index) => {
                        return (
                            <TableRow key={`row-${index}`} className="grid grid-cols-6 border-b-0">
                                <TableCell
                                    className="border border-muted flex items-center">{rowData.id}</TableCell>
                                <TableCell
                                    className="border border-muted flex items-center">{rowData.name}</TableCell>
                                <TableCell className="border border-muted flex items-center">
                                    <Switch
                                        checked={rowData.householdGoods}
                                        onCheckedChange={(checked) =>
                                            postRowSettingsMutation.mutate({
                                                ...rowData,
                                                householdGoods: checked
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell className="border border-muted flex items-center">
                                    <Switch
                                        checked={rowData.kns}
                                        onCheckedChange={(checked) =>
                                            postRowSettingsMutation.mutate({
                                                ...rowData,
                                                kns: checked
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell className="border border-muted flex items-center">
                                    <Switch
                                        checked={rowData.stormDrain}
                                        onCheckedChange={(checked) =>
                                            postRowSettingsMutation.mutate({
                                                ...rowData,
                                                stormDrain: checked
                                            })
                                        }
                                    />
                                </TableCell>
                                <TableCell className="border border-muted flex items-center">
                                    <Switch
                                        checked={rowData.calculations}
                                        onCheckedChange={(checked) =>
                                            postRowSettingsMutation.mutate({
                                                ...rowData,
                                                calculations: checked
                                            })
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    )
}