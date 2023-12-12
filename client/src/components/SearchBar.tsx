import styled from "styled-components";

const SearchBar = () => {
  return (
    <SearchInput
      type="text"
      //   value={searchValue}
      //   onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search..."
      autoFocus
    />
  );
};
export default SearchBar;

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
