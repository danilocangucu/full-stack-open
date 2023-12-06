const Total = (props: TotalProps) => {
    return <p>Number of exercises {props.totalExercises}</p>
}

interface TotalProps {
    totalExercises: number
}

export default Total;