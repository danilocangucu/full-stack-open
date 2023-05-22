const Persons = ({ newFilter, regexFilter, persons, deletePerson }) => {
  let isFilterNow = newFilter.length > 0;
  return (
    <>
      {isFilterNow
        ? persons.map((person, i) => {
            if (person.name.match(regexFilter)) {
              return (
                <div key={i}>
                  {person.name} {person.number}
                </div>
              );
            }
          })
        : persons.map((person, i) => (
            <div key={i}>
              {person.name} {person.number}
              <button onClick={() => deletePerson(person)}>delete</button>
            </div>
          ))}
    </>
  );
};

export default Persons;
