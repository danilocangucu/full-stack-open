const PersonForm = ({ onSubmit, value, onChange, inputNames }) => {
  return (
    <form onSubmit={onSubmit}>
      {inputNames.map((text, i) => {
        return (
          <div key={i}>
            {text}: <input value={value[i]} onChange={onChange[i]} name="person"/>
          </div>
        );
      })}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm