import React, { useMemo, useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";
import XLSX from "xlsx";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useBlockLayout,
  useResizeColumns,
} from "react-table";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CFormGroup,
  CInput,
  CLabel,
  CPagination,
  CButton,
} from "@coreui/react";
import styled from "styled-components";
import { ColumnFilter } from "./table-column-filter";
import { GlobalFilter } from "./table-filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

const Styles = styled.div`
  padding: 1rem;

  .my-table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid #eee;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .tr:nth-child(odd) {
      background-color: #fefefe;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;

      ${
        "" /* In this example we use an absolutely position resizer,
       so this is required. */
      }
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        background: blue;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${"" /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;

        &.isResizing {
          background: red;
        }
      }
    }
  }
`;

const myColumns = [
  {
    Header: "Submited By",
    accessor: "user.names",
    Filter: ColumnFilter,
  },
  {
    Header: "First Name",
    accessor: "first_name",
    Filter: ColumnFilter,
  },
  {
    Header: "Last Name",
    accessor: "last_name",
    Filter: ColumnFilter,
  },
  {
    Header: "Gender",
    accessor: "gender",
    Filter: ColumnFilter,
  },
  {
    Header: "Age",
    accessor: "age",
    Filter: ColumnFilter,
  },

  {
    Header: "Occupation",
    accessor: "occupation",
    Filter: ColumnFilter,
  },

  {
    Header: "Case Type",
    accessor: "case_type",
    Filter: ColumnFilter,
  },
  {
    Header: "Offence",
    accessor: "offence",
    Filter: ColumnFilter,
  },
  {
    Header: "Complaints",
    accessor: "complaints",
    Filter: ColumnFilter,
  },
  {
    Header: "Location",
    accessor: "location.name",
    Filter: ColumnFilter,
  },
  {
    Header: "Bail Status",
    accessor: "bail_status",
    Filter: ColumnFilter,
  },
  {
    Header: "Outcome",
    accessor: "outcome",
    Filter: ColumnFilter,
  },

  {
    Header: "Submited",
    accessor: "submited",
    Filter: ColumnFilter,
  },
  {
    Header: "View",
    accessor: "",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: (cellInfo) => {
      //console.log("cell value", cellInfo);

      return (
        <a href={"/reports/daily/" + cellInfo.cell.row.original.id}>
          <span>
            <FontAwesomeIcon icon={faEye} className="btn-site-theme" />
          </span>
        </a>
      );
    },
  },
];

const DreportTable = (props) => {
  const { reports } = props;
  const { setAddUserFormActive, apiAction } = props.options;
  console.log("inside UseTable", reports);
  const columns = useMemo(() => myColumns, []);
  const data = useMemo(() => reports, []);
  const [dataToDownload, setDataToDownload] = useState([]);
  const [csvLink, setCsvLink] = useState();
  const [tableRef, setTableRef] = useState();

  useEffect(() => console.log("date to download", dataToDownload), [
    dataToDownload,
  ]);

  //   const defaultColumn = useMemo(() => {
  //     return { Filter: ColumnFilter };
  //   }, []);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 250,
      maxWidth: 300,
    }),
    []
  );

  function getExportFileBlob({ columns, data, fileType, fileName }) {
    if (fileType === "csv") {
      // CSV example
      const headerNames = columns.map((col) => col.exportValue);
      const csvString = Papa.unparse({ fields: headerNames, data });
      return new Blob([csvString], { type: "text/csv" });
    } else if (fileType === "xlsx") {
      // XLSX example

      const header = columns.map((c) => c.exportValue);
      const compatibleData = data.map((row) => {
        const obj = {};
        header.forEach((col, index) => {
          obj[col] = row[index];
        });
        return obj;
      });

      let wb = XLSX.utils.book_new();
      let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
        header,
      });
      XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
      XLSX.writeFile(wb, `${fileName}.xlsx`);

      // Returning false as downloading of file is already taken care of
      return false;
    }
    //PDF example
    // if (fileType === "pdf") {
    //   const headerNames = columns.map((column) => column.exportValue);
    //   const doc = new JsPDF();
    //   doc.autoTable({
    //     head: [headerNames],
    //     body: data,
    //     margin: { top: 20 },
    //     styles: {
    //       minCellHeight: 9,
    //       halign: "left",
    //       valign: "center",
    //       fontSize: 11,
    //     },
    //   });
    //   doc.save(`${fileName}.pdf`);

    //   return false;
    // }

    // Other formats goes here
    return false;
  }

  //   const tableInstance = useTable(
  //     {
  //       columns: columns,
  //       data: reports,
  //       reactTableInstance,
  //       defaultColumn,
  //       getExportFileBlob,
  //     },
  //     useFilters,
  //     useGlobalFilter,
  //     useSortBy,
  //     usePagination,
  //     useBlockLayout,
  //     useExportData

  //     // useResizeColumns
  //   );

  //   const {
  //     getTableProps,
  //     getTableBodyProps,
  //     headerGroups,
  //     page,
  //     nextPage,
  //     previousPage,
  //     canNextPage,
  //     canPreviousPage,
  //     prepareRow,
  //     exportData,
  //     pageOptions,
  //     gotoPage,
  //     pageCount,
  //     setPageSize,
  //     state,
  //     setGlobalFilter,
  //   } = tableInstance;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    pageOptions,
    setGlobalFilter,
    exportData,
  } = useTable(
    {
      columns: columns,
      data: reports,
      defaultColumn,
      getExportFileBlob,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useExportData,
    useBlockLayout

    //     // useResizeColumns
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      {console.log(getTableProps.instance)}
      <CRow className="text-center mb-4 mt-1">
        <CCol>
          <h1 className="text-center btn-site-theme">Daily Reports</h1>
          {/* <p className="btn-site-theme">Reports By You</p> */}
        </CCol>
      </CRow>
      <CRow className="">
        <CCol xl={5} style={{ paddingLeft: "2em" }}>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </CCol>
        <CCol xl={7} className="text-right">
          <button
            className="btn  px-4 btn-site-theme-bg"
            disabled={apiAction}
            onClick={() => {
              exportData("xlsx", false);
            }}
          >
            Export Excel (XLS)
          </button>{" "}
          <button
            className="btn  px-4 btn-site-theme-bg"
            onClick={() => {
              exportData("csv", false);
            }}
          >
            Export Excel (CSV)
          </button>{" "}
        </CCol>
      </CRow>

      <div style={{ overflowX: "scroll" }}>
        <div style={{ height: "400px" }}>
          <Styles>
            <div {...getTableProps()} className="my-table">
              <div>
                {headerGroups.map((headerGroup) => (
                  <div {...headerGroup.getHeaderGroupProps()} className="tr">
                    {headerGroup.headers.map((column) => (
                      <div {...column.getHeaderProps()} className="th">
                        {column.render("Header")}
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                        {/* Use column.getResizerProps to hook up the events correctly */}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <div {...row.getRowProps()} className="tr">
                      {row.cells.map((cell) => {
                        return (
                          <div {...cell.getCellProps()} className="td">
                            {cell.render("Cell")}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <span>
                page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length} Pages
                </strong>
              </span>

              <select
                className="form-control inline"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[10, 25, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}{" "}
              </select>
              <button
                className="btn btn-default"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {" "}
                {"<<"}{" "}
              </button>
              <button
                className="btn btn-danger"
                disabled={!canPreviousPage}
                onClick={() => previousPage()}
              >
                Previous
              </button>
              <button
                className="btn btn-danger m-2"
                disabled={!canNextPage}
                onClick={() => nextPage()}
              >
                Next
              </button>
              <button
                className="btn btn-default "
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {" "}
                {">>"}{" "}
              </button>
            </div>
          </Styles>
        </div>
      </div>
    </>
  );
};

export default DreportTable;
