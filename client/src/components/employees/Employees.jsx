import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";

import TablePagination from "../common/TablePagination";
import EmployeesMenu from "./EmployeesMenu/EmployeesMenu"; // Import EmployeesMenu
import FOUCShield from "../common/FOUCShield";

import { useEmployees, useEmployeesOnProjects, useFreeEmployees } from "../api/employeesApi";
import { useProject } from "../api/projectApi"; // Import useProjects hook

export default function Employees() {
  const [isShowingFree, setIsShowingFree] = useState(false); // Track free employees state
  const [isShowingOnProjects, setIsShowingOnProjects] = useState(false); // Track employees on projects state
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [paginatedData, setPaginatedData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [pageSize, setPageSize] = useState(2); // Track page size
  const [loading, setLoading] = useState(true); // Track loading state
  
  const { employees: employeesData } = useEmployees(); // Fetch employees data and loading state from API
  const { project: projectData } = useProject(); // Fetch project data from API
  const { freeEmployees } = useFreeEmployees // Fetch free employees data from API
  const { employeesOnProjects } = useEmployeesOnProjects // Fetch employees on projects data from API

  const navigate = useNavigate(); // Initialize navigate function

  const processAndSetEmployees = async (data) => {
    const employeesWithKeys = await Promise.all(
      data.map(async (employee) => {
        let projectName = "Currently free"; // Default value if no project
        if (employee.currentProject) {
          const project = await projectData(employee.currentProject);
          projectName = project?.name; 
        }
        return {
          ...employee,
          key: employee._id,
          currentProject: projectName, // Replace project ID with project name
        };
      })
    );
    setEmployees(employeesWithKeys);
    setCurrentPage(1); // Reset to the first page
    setPaginatedData(employeesWithKeys.slice(0, pageSize)); // Update paginated data for the first page
  };

  const processAndSetPaginatedEmployees = (data) => {
    data.forEach((employee) => {
        employee.key = employee._id; // Assign unique key to each employee
    });
    setEmployees(data); // Set employees data
    setCurrentPage(1); // Reset to the first page
    setPaginatedData(data.slice(0, pageSize)); // Update paginated data for the first page
  };

  const reloadEmployees = async () => {   
    setLoading(true); // Start loading
    const data = await employeesData();
    processAndSetPaginatedEmployees(data); // Use helper function
    setLoading(false); // Stop loading
  };

  const loadFreeEmployees = async () => {
    setLoading(true); // Start loading
    const data = await freeEmployees(); // Fetch free employees
    processAndSetPaginatedEmployees(data); // Use helper function
    setLoading(false); // Stop loading
  };

  const loadEmployeesOnProjects = async () => {
    setLoading(true); // Start loading
    const data = await employeesOnProjects(); // Fetch employees on projects
    processAndSetPaginatedEmployees(data); // Use helper function
    setLoading(false); // Stop loading
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
      {loading ? (
        <FOUCShield message="Loading employees..." />
      ) : (
        <>
          <EmployeesMenu
            reloadEmployees={reloadEmployees}
            toggleFreeEmployees={toggleFreeEmployees}
            toggleEmployeesOnProjects={toggleEmployeesOnProjects}
            isShowingFree={isShowingFree}
            isShowingOnProjects={isShowingOnProjects}
            setEmployees={setEmployees}
            processAndSetEmployees={processAndSetEmployees} // Pass processAndSetEmployees
          />
          {employees.length === 0 ? (
            <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem", marginTop: "2rem" }}>
              {isShowingOnProjects
                ? "Nobody is on site"
                : isShowingFree
                ? "Everybody is working"
                : "Nobody is working for us... :("}
            </div>
          ) : (
            <>
              <Table
                bordered
                loading={!employees.length} // Show loading state if data is being fetched
                columns={columns}
                dataSource={paginatedData}
                pagination={false}
                title={() => (
                  <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "3rem" }}>
                    Employees
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
          )}
        </>
      )}
    </>
  );
}
