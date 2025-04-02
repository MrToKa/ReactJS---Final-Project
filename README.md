# ReactJS - February 2025 - Final Project

## How to Install

1. Download the repository.
2. Open the **server** folder in the integrated terminal.
3. Run the command `node .\server.js` - Now you have the Backend running.
4. Open the **client** folder in the integrated terminal.
5. Install the packages with the command `npm install`.
6. Run the Frontend with the command `npm run dev` - Now you see the link for your localhost.
7. Click on the link and enjoy the functionality!

---

## Functionality of the App

### 1. Guest User

- The Guest user can see the information on the **Home** page.
- The menu bar displays the **Projects** and **Login** buttons.
- The **Projects** page shows "Project cards" with:
  - Picture of the project
  - Name
  - Location
  - Status of the projects
- The Guest user can see detailed information by clicking the **See more** button.
- If the Guest user has an account, they can log in by entering their email and password on the **Login** page.

---

### 2. Logged-in User

- By logging-in the user is redirected to the **Home** page.
- The **Home** page provides information about the user's rights across the system.

#### Projects Page

- Displays a menu with four buttons:
  1. **Create Project**: Opens an input form to fill in the required data and creates a new project.
  2. Other buttons are for quick filtration of the displayed projects.

#### Project details page

- Displays the Project information
  - Picture of the project
  - Name
  - Location
  - Status of the projects
  - Start date
  - End date
- If the user is an owner of the Project, he can see a menu buttons:
  2. **Edit** or **Delete**: The user can only edit or delete their own projects.
  3. In **Edit** form changing the project status from **Ongoing** to **Completed**:
     - Frees all employees assigned to the project.
     - Adds the project to the employees' experience table.

#### Employees Page

- Displays a table of all employees working on projects.
- Includes a menu with buttons for:
  - Creating a new employee.
  - Filtering the employees table.
- The table supports additional own filtration.
- Clicking on a row redirects the user to the **Details Page** of the employee:
  - Displays short information and a picture of the employee.
  - Includes a menu with three buttons for managing the employee:
    - Employees can only be assigned to **Ongoing** projects via the **Assign to Project** button.
  - Below the menu:
    - A tab with table shows the employee's previous projects for better knowledge of their experience.
    - Another tab displays a table with the instruments assigned to the employee.
    - Instruments can be returned to the warehouse by clicking the link in the **Action** column.

#### Instruments Page

- Accessible via the **Instruments** button on the menu.
- Displays all instruments in the company.
- Includes a menu with buttons for:
  - Creating a new instrument.
  - Quickly sorting free and occupied instruments.
- Each instrument displays:
  - Name
  - Company ID
  - Current owner
- Instrument state management:
  - **Return to Warehouse** or **Give to Worker** buttons.
  - Instrument data can be edited by any logged-in user.
  - Deleting an instrument automatically removes it from the employee's list of instruments.

#### User Management

- Every registered user can create a new account for another manager.
- The newly created user has the same rights and access to the system functionality.

#### Logout

- Clicking the **Logout** button logs out the user.
- The system functionality is then limited to the Guest user capabilities.

---

### Important Note

Please be aware that changes to the data will not be persisted. All operations are performed in memory and will be lost when the service is restarted. All the tables pagination is set to two rows for quick showing of the functionality.

**Note:** The described functionality is valid as of **02-Apr-2025 23:00 EET**.