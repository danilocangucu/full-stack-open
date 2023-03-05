const Course = ({ course }) => {
    const sum = course.parts.reduce(
      (acc, curr) => acc + curr.exercises, 0
    )
  
    return (
      <>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={sum}/>
      </>
    )
}
  
const Header = ({ courseName }) => <h2>{courseName}</h2>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>
  
const Part = ({ part }) => 
    <p>
        {part.name} {part.exercises}
    </p>
  
const Content = ({ parts }) => 
    <>
    {parts.map(part =>
      <Part key={part.id} part={part}/>
    )}   
    </>

export default Course