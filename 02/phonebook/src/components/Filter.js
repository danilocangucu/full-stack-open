const Filter = (handleFilter) => {
  return (
    <>
      filter shown with: <input onChange={handleFilter.handleFilter} name="filter"/>
    </>
  );
};

export default Filter