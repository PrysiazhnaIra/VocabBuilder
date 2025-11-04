import type { Word } from "../../types/types";
import ProgressBar from "../ProgressBar/ProgressBar";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import s from "./WordsTable.module.css";
import ActionsBtn from "../ActionsBtn/ActionsBtn";
import { useMemo } from "react";
import Icon from "../Icon/Icon";

interface WordsTableProps {
  words: Word[];
  isLoading: boolean;
}

const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const columnHelper = createColumnHelper<Word>();

const columnsDefinition = [
  columnHelper.accessor("en", {
    header: () => (
      <div className={s.headBlock}>
        Word
        <Icon
          name="icon-united-kingdom"
          width={28}
          height={28}
          className={s.flagIcon}
        />
      </div>
    ),
    cell: (info) => {
      const value = info.getValue();
      return capitalizeFirstLetter(value);
    },
    id: "en",
  }),
  columnHelper.accessor("ua", {
    header: () => (
      <div className={s.headBlock}>
        Translation
        <Icon
          name="icon-ukraine"
          width={28}
          height={28}
          className={s.flagIcon}
        />
      </div>
    ),
    cell: (info) => {
      const value = info.getValue();
      return capitalizeFirstLetter(value);
    },
    id: "ua",
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => {
      const value = info.getValue();
      return capitalizeFirstLetter(value);
    },
    id: "category",
  }),
  columnHelper.display({
    id: "progress",
    header: () => "Progress",
    cell: (props) => {
      const progressValue = props.row.original.progress || 0;
      return <ProgressBar progress={progressValue} />;
    },
  }),
  columnHelper.display({
    id: "actions",
    header: () => "",
    cell: (props) => {
      const wordForEdit = props.row.original;

      // if (!wordForEdit) return null;
      return <ActionsBtn wordData={wordForEdit} />;
    },
  }),
];

export default function WordsTable({ words, isLoading }: WordsTableProps) {
  const columns = useMemo(() => columnsDefinition, []);

  const table = useReactTable({
    data: words,
    columns: columns as ColumnDef<Word>[],
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className={s.wrapper}>Завантаження таблиці...</div>;
  }

  if (words.length === 0) {
    return <div className={s.wrapper}>Слова не знайдені.</div>;
  }

  return (
    <div className={s.wrapper}>
      <table className={s.table}>
        <thead className={s.head}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={s.row}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`${s.cell} ${header.column.id === "category" ? s.categoryCell : ""}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={s.tabBody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`${s.wordCell} ${cell.column.id === "category" ? s.categoryCell : ""}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
