const Content = (props: ContentProps) => {
    return <p>{props.name} {props.exerciseCount}</p>
}

interface ContentProps {
    name: string,
    exerciseCount: number
}

export default Content;