import React, { useState} from "react";

function Search({setSearch}) {
  // Function to handle search input change
  const [search, setSearchState] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={handleSearchChange}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
