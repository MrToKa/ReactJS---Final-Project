import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Link, useNavigate } from "react-router";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";

import TablePagination from "../common/TablePagination";
import EmployeesMenu from "./EmployeesMenu/EmployeesMenu"; // Import EmployeesMenu
import EmployeeService from "../../services/EmployeeService";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isShowingFree, setIsShowingFree] = useState(false); // Track free employees state
  const [isShowingOnProjects, setIsShowingOnProjects] = useState(false); // Track employees on projects state
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [pageSize, setPageSize] = useState(2); // Track page size

  const navigate = useNavigate(); // Initialize navigate function

  const processAndSetEmployees = (data) => {
    const employeesWithKeys = data.map((employee) => ({
      ...employee,
      key: employee._id || employee.id, // Ensure each employee has a unique key
    }));
    setEmployees(employeesWithKeys);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setPaginatedData(employeesWithKeys.slice(startIndex, endIndex)); // Update paginated data
  };

  const reloadEmployees = async () => {
    await EmployeeService.getAll().then(processAndSetEmployees); // Use helper function
  };

  const loadFreeEmployees = async () => {
    await EmployeeService.getFreeEmployees().then(processAndSetEmployees); // Use helper function
  };

  const loadEmployeesOnProjects = async () => {
    await EmployeeService.getEmployeesOnProjects().then(processAndSetEmployees); // Use helper function
  };

  const toggleFreeEmployees = () => {
    if (isShowingFree) {
      reloadEmployees(); // Load all employees
    } else {
      loadFreeEmployees(); // Load free employees
    }
    setIsShowingFree(!isShowingFree); // Toggle state
  };

  const toggleEmployeesOnProjects = () => {
    if (isShowingOnProjects) {
      reloadEmployees(); // Load all employees
    } else {
      loadEmployeesOnProjects(); // Load employees on projects
    }
    setIsShowingOnProjects(!isShowingOnProjects); // Toggle state
  };

  
  const tableHeader = () => {
    if (isShowingFree) {
      return "Free Employees";
    } else if (isShowingOnProjects) {
      return "Employees on Projects";
    } else {
      return "All Employees";
    }
  }

  useEffect(() => {
    reloadEmployees(); // Fetch all employees on initial load
  }, []);

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
      width: "25%",
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "25%",
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
      width: "25%",
      ...getColumnSearchProps("job"),
    },
    {
      title: "Current Project",
      dataIndex: "currentProject",
      key: "currentProject",
      width: "25%",
      ...getColumnSearchProps("currentProject"),
    },
  ];

  const handlePageChange = (newPage, newPageSize) => {
    setCurrentPage(newPage);
    setPageSize(newPageSize);
    const startIndex = (newPage - 1) * newPageSize;
    const endIndex = startIndex + newPageSize;
    setPaginatedData(employees.slice(startIndex, endIndex)); // Update paginated data
  };

  return (
    <>
      <EmployeesMenu
        reloadEmployees={reloadEmployees}
        toggleFreeEmployees={toggleFreeEmployees}
        toggleEmployeesOnProjects={toggleEmployeesOnProjects}
        isShowingFree={isShowingFree}
        isShowingOnProjects={isShowingOnProjects}
        setEmployees={setEmployees}
      />
      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        title={() => (
          <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "3rem" }}>
            {tableHeader()}
          </div>
        )} 
        onRow={(record) => ({
          onClick: () => navigate(`/employees/${record.key}`),
          style: { cursor: "pointer" }, // Add cursor style here
        })}        
      />
      <TablePagination
        items={employees}
        onPageChange={handlePageChange}
        tableName="Employees"
      />
    </>
  );
}
