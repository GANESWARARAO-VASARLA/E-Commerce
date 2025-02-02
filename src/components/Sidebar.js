import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, TextField, useTheme } from "@mui/material";
import { fetchCategories } from "../services/apiService";

const Sidebar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Data");
  const theme = useTheme();

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category === "All Data" ? null : category);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#6a11cb",
        width: "230px",
        height: "100vh",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        paddingTop: 2,
      }}
    >
      <TextField
        label="Search Categories"
        variant="outlined"
        fullWidth
        size="small"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#555" : "white",
          borderRadius: "4px",
          marginTop: 8,
          marginLeft: 1,
          marginRight: 2,
          width: "90%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
          "& .MuiInputLabel-root": {
            color: "black",
          },
        }}
      />
      <List>
        <ListItem
          button
          onClick={() => handleCategorySelect("All Data")}
          sx={{
            cursor: "pointer",
            backgroundColor: selectedCategory === "All Data" ? "#4b0082" : "transparent",
            borderRadius: "12px",
            padding: "8px 16px",
            "&:hover": { backgroundColor: "#4b0082" },
          }}
        >
          <ListItemText primary="All Data" />
        </ListItem>
        {filteredCategories.map((category, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleCategorySelect(category)}
            sx={{
              cursor: "pointer",
              backgroundColor: selectedCategory === category ? "#4b0082" : "transparent",
              borderRadius: "12px",
              padding: "8px 16px",
              "&:hover": { backgroundColor: "#4b0082" },
            }}
          >
            <ListItemText primary={category.charAt(0).toUpperCase() + category.slice(1)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
