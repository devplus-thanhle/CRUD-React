import React, { useRef, useState } from "react";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

function SearchForm({ onSubmit, handleClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        value: value,
      };
      onSubmit(formValues);
    }, 400);
  };

  const onHandleClose = () => {
    const formValues = {
      value: "",
    };
    handleClose(formValues);
    setSearchTerm("");
  };
  return (
    <div className="topnav__search">
      <input
        onChange={handleSearchTermChange}
        value={searchTerm}
        type="text"
        placeholder="Search here..."
      />
      {searchTerm ? (
        <HighlightOffOutlinedIcon
          onClick={onHandleClose}
          className="topnav__search-icon close"
        />
      ) : (
        <SearchOutlinedIcon className="topnav__search-icon" />
      )}
    </div>
  );
}

export default SearchForm;
