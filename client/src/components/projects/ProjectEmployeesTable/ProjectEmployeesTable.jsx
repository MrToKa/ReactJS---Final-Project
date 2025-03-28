import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";

import TablePagination from "../../common/TablePagination";
import EmployeeService from "../../../services/EmployeeService";

export default function ProjectEmployeesTable({ project }) { // Destructure project
  const { name: projectName, status: projectStatus } = project; // Extract name and status
  const [employees, setEmployees] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [pageSize, setPageSize] = useState(2); // Track page size

  const navigate = useNavigate(); // Initialize navigate function

  const employeeData = async () => {
    await EmployeeService.getEmployeesByProjectName(projectName).then(
      (data) => {
        const employeesWithKeys = data.map((employee) => ({
          ...employee,
          key: employee._id || employee.id, // Ensure each employee has a unique key
        }));
        setEmployees(employeesWithKeys);
        setCurrentPage(1); // Reset to the first page
        setPaginatedData(employeesWithKeys.slice(0, pageSize)); // Update paginated data for the first page
      }
    );
  };

  useEffect(() => {
    employeeData(); // Call the function to fetch data when the component mounts
  }, []);

  const handlePageChange = (newPage, newPageSize) => {
    setCurrentPage(newPage);
    setPageSize(newPageSize);
    const startIndex = (newPage - 1) * newPageSize;
    const endIndex = startIndex + newPageSize;
    setPaginatedData(employees.slice(startIndex, endIndex)); // Update paginated data
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedData(employees.slice(startIndex, endIndex)); // Update paginated data
  }, [employees, currentPage, pageSize]); // Recalculate paginated data when dependencies change

  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
      ...getColumnSearchProps("job"),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        onRow={(record) => ({
          onClick: () => navigate(`/employees/${record.key}`),
          style: { cursor: "pointer" }, // Add cursor style here
        })}
        style={{
          marginTop: 16,
          borderRadius: 8,
          overflow: "hidden",
        }}
        rowClassName="table-row"
        rowKey={(record) => record.key} // Use the unique key for each row
        footer={() =>
          projectStatus !== "completed" && projectStatus !== "future" ? (
            <div style={{ textAlign: "right", padding: "1px" }}>
              There are currently {employees.length} employees on site
            </div>
          ) : null
        }
      />

      <TablePagination
        items={employees}
        onPageChange={handlePageChange}
        tableName="Employees"
      />
    </>
  );
}
