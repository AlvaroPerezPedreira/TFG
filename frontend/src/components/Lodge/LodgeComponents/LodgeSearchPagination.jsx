import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LodgeSearchPagination({ pageN, setPageN }) {
  const [t] = useTranslation(["searchBar"]);

  return (
    <>
      {pageN > 1 && (
        <Button
          size="sm"
          variant="bordered"
          radius="sm"
          color="warning"
          onPress={() => {
            setPageN((prev) => (prev > 1 ? prev - 1 : prev));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {t("previous")}
        </Button>
      )}
      <Pagination
        total={10}
        variant="light"
        color="warning"
        page={pageN}
        onChange={(newPage) => {
          setPageN(newPage);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      {pageN < 10 && (
        <Button
          size="sm"
          variant="bordered"
          radius="sm"
          color="warning"
          onPress={() => {
            setPageN((prev) => (prev < 10 ? prev + 1 : prev));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {t("next")}
        </Button>
      )}
    </>
  );
}
