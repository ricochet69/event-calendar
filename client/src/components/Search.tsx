import "./Search.css";
import { useState, useEffect } from "react";
import api from "./api/posts";
import styled from "styled-components";

interface SearchProps {
  handleUpdateSearch: (selectedSearchDate: Date) => void;
}

const Search = ({ handleUpdateSearch }: SearchProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  console.log(data.length);
  console.log(data);

  // Search Bar data
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await api.get(`api/calendar/search/${searchValue}`);
        setData(response.data);
        // setShowResults(true); // Show results after fetching
      } catch (error) {
        console.log(error);
      }
    };
    if (searchValue === "") {
      setData([]);
    } else {
      setData(data);
    }
    fetchSearchResults();
    // if (searchValue.trim() !== "") {
    // } else {
    //   setShowResults(false); // Hide results if search is empty
    //   setSearchResults([]); // Clear previous results
    // }
  }, [searchValue]);

  const handleClick = (dateValue: String) => {
    handleUpdateSearch(dateValue);

    console.log(new Date(dateValue));
  };

  return (
    <div className="search">
      <div className="searchInput">
        <input
          type="text"
          value={searchValue}
          placeholder="Search"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        ></input>
        {data.length != 0 && (
          <div className="dataResult">
            {data.map((value) => {
              return (
                <button
                  key={value._id}
                  onClick={(e) => e.target === e.currentTarget && handleClick(value.start)}
                  className="dataItem"
                >
                  {value.title}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;

const SearchInput = styled.input`
  padding: 0.5rem 1.3rem;
  border-radius: 50px;
  font-size: 1.2rem;
  border: 1px solid black;
  border: none;
  outline: none;
  flex: 4;
  width: 100px;

  @media (max-width: ${({ theme }) => theme.breakpoint.large}) {
    /* max-width: 100px; */
    flex: 1;
  }
`;
