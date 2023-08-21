import { DataGrid as MuiDataGrid, GridToolbar } from "@mui/x-data-grid";
import './data-grid.css';
import { Fragment, useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import SelectField from "../select-field/select-field";

const DataGrid = ({ columns, rows, processRowUpdate, searchFields, selectFields }) => {

  let data = rows;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectFieldOptions, setSelectFieldOptions] = useState({});

  useEffect(() => {
    setSelectOptions(data);
  }, [data]);

  useEffect(() => {
    if (selectFields) {
      let filtered = data;
      Object.keys(selectedOptions).forEach((key) => {
        if (selectedOptions[key].length > 0) {
          filtered = filtered.filter((dataRow) =>
            selectedOptions[key].some(
              (option) => dataRow[key].toLowerCase() === option.toLowerCase()
            )
          );
        }
      });
      setFilteredData(filtered);
    }
  }, [selectedOptions]);

  const setSelectOptions = (data) => {
    if (selectFields) {
      const selectOptions = {};
      selectFields.forEach((field) => {
        const selectOptionsSet = new Set();
        data.forEach((dataRow) => {
          selectOptionsSet.add(dataRow[field]);
        });
        selectOptions[field] = Array.from(selectOptionsSet);
      });
      setSelectFieldOptions(selectOptions);
      setSelectedOptions({});
    }
  };

  const handleSelectChange = (event, field) => {
    setSelectedOptions({ ...selectedOptions, [field]: event.target.value });
  };

  useEffect(() => {
    setFilteredData(
      data.filter(
        (dataRow) =>
          searchFields.some((searchField) =>
            dataRow[searchField].toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    );
  }, [searchQuery, searchFields]);

  return (
    <Fragment>
      <div style={{ display: 'flex', alignItems: "center" }} >
        <input
          style={{ color: "black", marginLeft: "20px", padding: "5px 10px", backgroundColor: "#d7d7f3"  }}
          type="text"
          placeholder="Search ...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {selectFields &&
          selectFields.map((field, index) => (
            <div key={index} style={{ display: "inline-block", marginLeft: "40px" }}>
              <SelectField
                label={`Select ${field == "compName" ? "Company Name" : field}`}
                options={selectFieldOptions[field] || []}
                value={selectedOptions[field] || []}
                onChange={(e) => handleSelectChange(e, field)}
              />
            </div>
          ))}
      </div>

      <div style={{ height: 400, width: "98%", margin: "0 1rem" }}>
        <MuiDataGrid
          columns={columns}
          rows={filteredData}
          getRowId={(row) => row.id}
          autoHeight
          disableSelectionOnClick
          disableColumnMenu
          hideFooterSelectedRowCount
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </Fragment>

  );
};

export default DataGrid;
