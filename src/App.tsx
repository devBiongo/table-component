import { makeStyles } from "tss-react/mui";

import AppTable from "./components/AppTable";
import { useState } from "react";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      color: theme.palette.primary.main,
      width: "80vw",
      margin: "auto",
      border: "1px solid gray",
      overflowX: "auto",
    },
  };
});

function App() {
  const { classes } = useStyles();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([1, 2]);

  return (
    <div className={classes.root}>
      <AppTable
        columns={[
          {
            key: "name",
            title: () => <div>Name123213</div>,
            dataIndex: "name",
            render: (_, { name }) => <>{`${name.p}`}</>,
          },
          { key: "age", title: "Age", dataIndex: "age" },
          { key: "address", title: "Address", dataIndex: "address" },
        ]}
        dataSource={[
          {
            key: 1,
            name: { p: "Jane Smith", s: "xxxxx" },
            age: 22,
            address: "London",
          },
          {
            key: 2,
            name: { p: "Jane Smith", s: "xxxxx" },
            age: 32,
            address: "Sydney",
          },
          {
            key: 3,
            name: { p: "Jane Smith", s: "xxxxx" },
            age: 24,
            address: "Berlin",
          },
          {
            key: 4,
            name: { p: "Jane Smith", s: "xxxxx" },
            age: 30,
            address: "Paris",
          },
        ]}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
            console.log("Selected Row Keys:", newSelectedRowKeys);
          },
        }}
      />
    </div>
  );
}

export default App;
