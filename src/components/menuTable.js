import React, { useState } from "react";
import { useTable, useExpanded } from "react-table";

const MenuTable = ({ data = [] }) => {
  console.log("datais============ ", data);
  // Aggregate data by categories
  const aggregatedData = React.useMemo(() => {
    const categoriesMap = new Map();
    data.forEach((category) => {
      category.categories.forEach((item) => {
        if (categoriesMap.has(item.category)) {
          categoriesMap.get(item.category).push(item);
        } else {
          categoriesMap.set(item.category, [item]);
          console.log("datais============ ", data);
        }
      });
    });

    const aggregatedCategories = [];
    for (const [category, items] of categoriesMap.entries()) {
      aggregatedCategories.push({ category, items });
    }

    return aggregatedCategories;
  }, [data]);

  const handleSave = (row) => {
    // Handle save action for the row data
    console.log("Save", row.original);
  };

  const handleReset = (row) => {
    // Handle reset action for the row data
    console.log("Reset", row.original);
  };

  const columns = React.useMemo(
    () => [
      { Header: "Category", accessor: "category" },
      { Header: "Name", accessor: "items[0].name" },
      {
        Header: "Image",
        accessor: "items[0].image",
        Cell: ({ value }) => (
          <img src={value} alt="Item" style={{ width: "50px" }} />
        ),
      },
      { Header: "Label", accessor: "items[0].label" },
      { Header: "Price", accessor: "items[0].price" },
      { Header: "Description", accessor: "items[0].description" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => handleSave(row)}>Save</button>
            <button onClick={() => handleReset(row)}>Reset</button>
          </div>
        ),
      },
    ],
    []
  );

  const [expandedCategories, setExpandedCategories] = useState([]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable({ columns, data: aggregatedData }, useExpanded);

  const toggleCategoryExpansion = (category) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  return (
    <table
      className="menu-table"
      {...getTableProps()}
      style={{ borderCollapse: "collapse" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  padding: "8px",
                  border: "1px solid white",
                  background: "black",
                  color: "white",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <React.Fragment key={row.id}>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    cursor: "pointer",
                    border: "1px solid grey",
                  }}
                  onClick={() => toggleCategoryExpansion(row.original.category)}
                >
                  {expandedCategories.includes(row.original.category)
                    ? "-"
                    : "+"}
                  {row.original.category}
                </td>
                {row.cells.slice(1).map((cell) => (
                  <td
                    key={cell.column.id}
                    {...cell.getCellProps()}
                    style={{ padding: "8px", border: "1px solid grey" }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
              {expandedCategories.includes(row.original.category) &&
                row.original.items.map((item) => (
                  <tr
                    key={item._id}
                    {...row.getRowProps()}
                    style={{ background: "whitesmoke" }}
                  >
                    {row.cells.map((cell) => (
                      <td
                        key={cell.column.id}
                        {...cell.getCellProps()}
                        style={{ padding: "8px", border: "1px solid grey" }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default MenuTable;
