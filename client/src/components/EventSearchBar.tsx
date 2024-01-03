import { useState, useEffect, useRef } from "react";
import api from "./api/posts";
import styled from "styled-components";
import { CalendarEvent } from "../interfaces/calendarInterfaces";
import useDebounce from "../hooks/useDebounce";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
  handleUpdateSearch: (selectedSearchDate: Date) => void;
}

const EventSearchBar = ({ handleUpdateSearch }: SearchProps) => {
  const searchBarRef = useRef<HTMLInputElement | null>(null);

  const [searchValue, setSearchValue] = useState<string>("");
  const [data, setData] = useState<CalendarEvent[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const debouncedSearch = useDebounce(searchValue, 500);

  // Fetch data
  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsError(false);
      setData([]);

      try {
        const response = await api.get(`api/calendar/search/${debouncedSearch}`);
        setData(response.data);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      }
    };

    debouncedSearch && fetchSearchResults();
  }, [debouncedSearch]);

  const handleClick = (dateValue: Date) => {
    handleUpdateSearch(dateValue);
  };

  const hasSearchValue: boolean = debouncedSearch.trim() !== "";

  // Clear searchValue and data when clicking outside of SearchBarInput
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        console.log("element clicked");
        setSearchValue("");
        setIsError(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SearchWrapper>
      <SearchBarInput
        ref={searchBarRef}
        type="text"
        value={searchValue}
        placeholder="Search event"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        $hasValueStyle={hasSearchValue}
      ></SearchBarInput>

      {hasSearchValue && (
        <SearchResultsContainer>
          {isError && (
            <SearchResultError>
              <FontAwesomeIcon icon={faXmark} /> <p>Event not found!</p>
            </SearchResultError>
          )}
          {data.map((event) => (
            <SearchResultButton
              type="button"
              key={event._id}
              onClick={() => handleClick(event.start)}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} /> <p>{event.title}</p>
            </SearchResultButton>
          ))}
        </SearchResultsContainer>
      )}
    </SearchWrapper>
  );
};
export default EventSearchBar;

const SearchWrapper = styled.div`
  flex: 4;
  position: relative;
`;

const SearchBarInput = styled.input<{ $hasValueStyle?: boolean }>`
  padding: 0.5rem 1.3rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 1.2rem;
  border: 1px solid black;
  border: none;
  outline: none;
  flex: 4;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  width: 100%;
  border-bottom-right-radius: ${(props) => (props.$hasValueStyle ? "0px" : "10px")};
  border-bottom-left-radius: ${(props) => (props.$hasValueStyle ? "0px" : "10px")};
  border-bottom: ${(props) => (props.$hasValueStyle ? "1px solid #aaa" : "")};

  @media (max-width: ${({ theme }) => theme.breakpoint.large}) {
    flex: 1;
  }
`;

const SearchResultsContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
  overflow: hidden;
  overflow-y: auto;
  z-index: 100;
  position: absolute;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  p {
    padding: 0.5rem 20px;
  }
`;

const SearchResultError = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  color: black;
  border: none;
  background-color: white;
  border-bottom: 1px solid #aaa;
  padding: 0 20px;
`;

const SearchResultButton = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  color: black;
  border: none;
  background-color: white;
  border-bottom: 1px solid #aaa;
  padding: 0 20px;
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-weight: 500;

  &:hover {
    background-color: #efefef;
    cursor: pointer;
  }
`;
