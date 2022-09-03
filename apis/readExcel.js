const fs = require("fs");
const xlsx = require("xlsx");

const dataPathExcel = "database/MOCK_DATA.xlsx";
const wb = xlsx.readFile(dataPathExcel);

const sheetName = wb.SheetNames[0];
const sheetValue = wb.Sheets[sheetName];

const data = xlsx.utils.sheet_to_json(sheetValue);

const users = data.map(
  ({ id, first_name, last_name, email, gender, race }) => ({
    id,
    first_name,
    last_name,
    email,
    gender,
    race,
  })
);

fs.writeFileSync("database/users.json", JSON.stringify({ users }));
