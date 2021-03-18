import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
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

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      color:#000000 :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

const myColumns = [
  {
    Header: "Names",
    accessor: "names",
    Filter: ColumnFilter,
    width: 200,
  },
  {
    Header: "Email",
    accessor: "email",
    Filter: ColumnFilter,
    width: 200,
  },
  {
    Header: "Sex",
    accessor: "sex",
    Filter: ColumnFilter,
    width: 200,
  },
  {
    Header: "Qualification",
    accessor: "qualification",
    Filter: ColumnFilter,
    width: 200,
  },
  {
    Header: "Grade Level",
    accessor: "gl",
    Filter: ColumnFilter,
    width: 200,
  },
  {
    Header: "Phone",
    accessor: "phone",
    Filter: ColumnFilter,
    width: 200,
  },
  {
    Header: "Zone",
    accessor: "zone.zone",
    Filter: ColumnFilter,
    width: 200,
  },
  {
    Header: "State",
    accessor: "state.state",
    Filter: ColumnFilter,
    width: 200,
  },
  {
    Header: "Centre",
    accessor: "centre.centre",
    Filter: ColumnFilter,
    width: 200,
  },
  {
    Header: "Role",
    accessor: "role",
    Filter: ColumnFilter,
    width: 200,
  },
  {
    Header: "Monthly Report",
    accessor: "monthly_report",
    Filter: ColumnFilter,
    width: 200,
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
            <FontAwesomeIcon icon={faEye} />
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
            <FontAwesomeIcon icon={faPenSquare} size={50} />
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
  const defaultColumn = useMemo(() => {
    return { Filter: ColumnFilter };
  }, []);

  const tableInstance = useTable(
    {
      columns: columns,
      data: users,
      // defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
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
        <CCol xl={6}>
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
        <div style={{ minWidth: "100%", height: "400px" }}>
          <table
            {...getTableProps()}
            className="table table-striped table-bordered shadow"
            style={{ borderTop: "#Fff" }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                      <span>
                        {/* {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""} */}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td className="my-table-user" {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
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
        </div>
      </div>
    </>
  );
};

export default UserTable;
