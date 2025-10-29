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

interface WordsTableProps {
  words: Word[];
  isLoading: boolean;
}

const columnHelper = createColumnHelper<Word>();

const columnsDefinition = [
  columnHelper.accessor("en", {
    header: () => "Word",
    cell: (info) => info.getValue(),
    id: "en",
  }),
  columnHelper.accessor("ua", {
    header: () => "Translation",
    cell: (info) => info.getValue(),
    id: "ua",
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue(),
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
    header: () => "Actions",
    cell: (props) => {
      const wordId = props.row.original._id;
      if (!wordId) return null;
      return <ActionsBtn wordId={wordId} />;
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
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
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
