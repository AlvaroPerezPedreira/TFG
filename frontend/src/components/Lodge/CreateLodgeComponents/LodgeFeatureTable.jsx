import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";
import { useTranslation } from "react-i18next";
import useFeatures from "../../../hooks/useFeatures";

export default function LodgeFeatureTable({
  selectedFeatures,
  setSelectedFeatures,
}) {
  const { getAllFeatures } = useFeatures();
  const [t, i18n] = useTranslation(["createLodge"]);

  const [page, setPage] = useState(1);
  const [features, setFeatures] = useState([]);

  const rowsPerPage = 8;
  const pages = Math.ceil(features.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return features.slice(start, end);
  }, [page, features]);

  useEffect(() => {
    const currentLanguage = i18n.language;
    getAllFeatures({ setFeatures });
  }, [i18n.language]);

  const columns = [
    { key: "name", label: t("feature") },
    { key: "category", label: t("category") },
  ];

  const getFeatureName = (feature, currentLanguage) => {
    switch (currentLanguage) {
      case "en":
        return feature.feature_nameEN;
      case "es":
        return feature.feature_nameES;
      case "fr":
        return feature.feature_nameFR;
      default:
        return feature.feature_nameEN;
    }
  };

  return (
    <>
      <span
        className="createLodge-featureTitle"
        style={{ color: "var(--AppMainColor)" }}
      >
        {t("featureTitle")}
      </span>
      <Table
        aria-label="Feature table"
        selectionMode="multiple"
        removeWrapper
        color="warning"
        selectedKeys={selectedFeatures}
        onSelectionChange={setSelectedFeatures}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="warning"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "name"
                    ? getFeatureName(item, i18n.language)
                    : item[column.key]}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
