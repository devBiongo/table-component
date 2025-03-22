import { makeStyles } from "tss-react/mui";
import Checkbox from "@mui/material/Checkbox";
import { useCallback, useMemo, useState } from "react";
import React from "react";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      color: theme.palette.primary.main,
      width: "80vw",
      margin: "auto",
      border: "1px solid gray",
      overflowX: "auto",
    },
    table: {
      tableLayout: "auto",
      width: "100%",
      borderCollapse: "collapse",
      "& td, & th": {
        textAlign: "left",
      },
    },
    checkbox: {
      display: "flex",
      justifyContent: "center",
      position: "sticky",
      left: 0,
      background: "#fff",
      zIndex: 2,
      transform: "translate3d(0, 0, 0)",
    },
  };
});

export interface Column<RecordType> {
  key: React.Key;
  title: string | (() => React.ReactNode);
  dataIndex: keyof RecordType;
  render?: (
    text: RecordType[keyof RecordType],
    record: RecordType
  ) => React.ReactNode;
}

interface TableProps<RecordType> {
  columns: Column<RecordType>[];
  dataSource: RecordType[];
  rowSelection?: {
    selectedRowKeys: React.Key[];
    onChange: (selectedRowKeys: React.Key[]) => void;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface RecordTypeInterface extends Record<string, any> {
  key: React.Key;
}

const AppTable = <RecordType extends RecordTypeInterface>({
  columns,
  dataSource,
  rowSelection,
}: TableProps<RecordType>) => {
  const { classes } = useStyles();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
    rowSelection?.selectedRowKeys || []
  );

  const handleRowSelectionChange = useCallback(
    (key: React.Key, checked: boolean) => {
      let newSelectedRowKeys = [...selectedRowKeys];
      if (checked) {
        newSelectedRowKeys.push(key);
      } else {
        newSelectedRowKeys = newSelectedRowKeys.filter((item) => item !== key);
      }
      setSelectedRowKeys(newSelectedRowKeys);
      rowSelection?.onChange(newSelectedRowKeys);
    },
    [rowSelection, selectedRowKeys]
  );

  const handleSelectAllChange = useCallback(() => {
    const allKeys = dataSource.map((item) => item.key);
    const newSelectedKeys =
      selectedRowKeys.length === dataSource.length ? [] : allKeys;
    setSelectedRowKeys(newSelectedKeys);
    rowSelection?.onChange(newSelectedKeys);
  }, [dataSource, rowSelection, selectedRowKeys.length]);

  const isAllSelected = useMemo(() => {
    return selectedRowKeys.length === dataSource.length;
  }, [dataSource.length, selectedRowKeys.length]);

  return (
    <table className={classes.table}>
      <colgroup>
        {rowSelection && (
          <col
            style={{
              width: 60,
              minWidth: 60,
            }}
          />
        )}
        {columns.map((col) => (
          <col key={col.key} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {rowSelection && (
            <th className={classes.checkbox}>
              <Checkbox
                checked={isAllSelected}
                onChange={() => {
                  handleSelectAllChange();
                }}
              />
            </th>
          )}
          {columns.map((col) => (
            <th key={col.key}>
              {typeof col.title === "function" ? col.title() : col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((row) => (
          <tr key={row.key}>
            {rowSelection && (
              <td className={classes.checkbox}>
                <Checkbox
                  checked={selectedRowKeys.includes(row.key)}
                  onChange={(e) =>
                    handleRowSelectionChange(row.key, e.target.checked)
                  }
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key}>
                {col.render
                  ? col.render(row[col.dataIndex], row)
                  : row[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(AppTable);
