import React, { useCallback, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import Button from "components/buttons";

const Example = ({ handleSave, handleReset, data = [] }) => {
  const [editPriceItemId, setEditPriceItemId] = useState(null);
  const inputRef = useRef();

  const handlePriceCellClick = (itemId) => {
    setEditPriceItemId(itemId);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const callSaveReset = useCallback(
    (type, row, value) => {
      type === "save" ? handleSave(row, value) : handleReset(row, value);
      setEditPriceItemId(null);
    },
    [handleSave, handleReset]
  );

  const columns = useMemo(
    () => [
      {
        header: "Category",
        accessorKey: "category",
        enableGrouping: false,
        Cell: ({ cell }) => <b>{cell.row.original.category}</b>,
        size: 120, // Set the width of the column
        enableSorting: false,
      },
      {
        header: "Name",
        accessorKey: "name",
        size: 120, // Set the width of the column
        enableSorting: false,
      },
      {
        header: "Label",
        accessorKey: "label",
        size: 120, // Set the width of the column
        enableSorting: false,
      },
      {
        header: "Price",
        accessorKey: "price",
        Cell: ({ cell }) => {
          const cellVal = cell.getValue();
          if (cell.row.original._id === editPriceItemId) {
            return (
              <input ref={inputRef} type="text" style={{ width: "90%" }} />
            );
          }
          return (
            <div>
              <td
                onClick={() =>
                  handlePriceCellClick(cell.row.original._id, cellVal)
                }
              >
                {cellVal}
              </td>
            </div>
          );
        },
        size: 100, // Set the width of the column
      },
      {
        header: "Description",
        accessorKey: "description",
        Cell: ({ cell }) => (
          <div
            style={{
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              width: 200, // Set the width of the column
            }}
          >
            {cell.getValue()}
          </div>
        ),
        enableSorting: false,
      },
      {
        header: "Image",
        accessorKey: "image",
        Cell: ({ cell }) => (
          <img src={cell.getValue()} alt="Item" style={{ width: "50px" }} />
        ),
        size: 100, // Set the width of the column
        enableSorting: false,
      },
      {
        Header: "Actions",
        accessorKey: "_id",
        Cell: ({ row }) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              label="Save"
              type="SAVE"
              onClick={() => {
                callSaveReset("save", row, inputRef.current?.value);
              }}
            />
            <Button
              label="Reset"
              type="RESET"
              onClick={() =>
                callSaveReset("reset", row, inputRef.current?.value)
              }
            />
          </div>
        ),
        size: 120, // Set the width of the column
        enableSorting: false,
        enableGrouping: false,
        enableColumnFilters: false,
        enableHiding: false,
      },
    ],
    [editPriceItemId, callSaveReset]
  );

  return (
    <Box sx={{ width: "100%", height: "100vh", overflowY: "auto" }}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnResizing
        enableStickyHeader
        enableStickyFooter
        enablePagination={false}
        enableColumnOrdering={false}
        enableColumnDragging={false}
        initialState={{
          density: "compact",
          expanded: true,
          grouping: ["category"],
          pagination: { pageIndex: 0, pageSize: 20 },
          sorting: [{ id: "category", desc: false }],
        }}
        enableHiding={false}
        enableFilters={false}
        enableGrouping={true}
        muiToolbarAlertBannerChipProps={{ color: "primary" }}
        muiTableContainerProps={{ sx: { maxHeight: 700 } }}
      />
    </Box>
  );
};

export default Example;
