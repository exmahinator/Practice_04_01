const SelectCounty = ({ handleSelect }) => {
  return (
    <select onChange={handleSelect}>
      <option>Choose</option>
      <option value={1}>1</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  );
};

export default SelectCounty;
