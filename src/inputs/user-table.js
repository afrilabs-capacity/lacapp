import React, { useMemo } from "react";
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
    Header: "Names",
    accessor: "names",
    Filter: ColumnFilter,
  },
  {
    Header: "Email",
    accessor: "email",
    Filter: ColumnFilter,
  },
  {
    Header: "Sex",
    accessor: "sex",
    Filter: ColumnFilter,
  },
  {
    Header: "Qualification",
    accessor: "qualification",
    Filter: ColumnFilter,
  },
  {
    Header: "Grade Level",
    accessor: "gl",
    Filter: ColumnFilter,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Filter: ColumnFilter,
  },
  {
    Header: "Zone",
    accessor: "zone.zone",
    Filter: ColumnFilter,
    width: 500,
  },
  {
    Header: "State",
    accessor: "state.state",
    Filter: ColumnFilter,
  },
  {
    Header: "Centre",
    accessor: "centre.centre",
    Filter: ColumnFilter,
  },
  {
    Header: "Role",
    accessor: "role",
    Filter: ColumnFilter,
  },
  {
    Header: "Monthly Report",
    accessor: "monthly_report",
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
        <a href={"/user/profile/" + cellInfo.cell.row.original.id}>
          <span>
            <FontAwesomeIcon icon={faEye} className="btn-site-theme" />
          </span>
        </a>
      );
    },
  },
  {
    Header: "Edit",
    accessor: "",
    Filter: ColumnFilter,
    disableFilters: true,
    Cell: (cellInfo) => {
      //console.log("cell value", cellInfo);

      return (
        <a href={"/users/update/" + cellInfo.cell.row.original.id}>
          <span>
            <FontAwesomeIcon
              icon={faPenSquare}
              size={50}
              className="btn-site-theme"
            />
          </span>
        </a>
      );
    },
  },
];

const UserTable = (props) => {
  const { users } = props;
  const { setAddUserFormActive, apiAction } = props.options;
  console.log("inside UseTable", users);
  const columns = useMemo(() => myColumns, []);
  const data = useMemo(() => users, []);
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

  const tableInstance = useTable(
    {
      columns: columns,
      data: users,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useBlockLayout
    // useResizeColumns
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <CRow className="text-center mb-4 mt-1">
        <CCol>
          <h1 className="text-center btn-site-theme">Users</h1>
        </CCol>
      </CRow>
      <CRow className="p-0 mb-2  text-left">
        <CCol xl={6} style={{ paddingLeft: "2em" }}>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </CCol>
        <CCol xl={6} className="text-right">
          <button
            className="btn  px-4 btn-site-theme-bg"
            disabled={apiAction}
            onClick={() => setAddUserFormActive((prev) => (prev = !prev))}
          >
            Add User
          </button>
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

export default UserTable;
