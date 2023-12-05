import CoursePart from '../types';

const Part = (part: CoursePart) => {

    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };

    const displayCommonProperties = () => (
        <>
            <b>{part.name} {part.exerciseCount}</b><br />
        </>
    );

    const displayAdditionalProperties = () => {
        switch (part.kind) {
            case "basic":
                return <i>{part.description}</i>;
            case "group":
                return <>project exercises {part.groupProjectCount}</>;
            case "background":
                return <>
                    <i>{part.description}</i><br />
                    submit to {part.backgroundMaterial}
                </>;
            case "special":
                return <>required skills: {part.requirements.join(', ')}</>;
            default:
                return assertNever(part);
        }
    }
    return (
        <>
            {displayCommonProperties()}
            {displayAdditionalProperties()}
        </>
    )
}

export default Part;