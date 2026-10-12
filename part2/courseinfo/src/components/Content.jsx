import Part from './Part'

const Content = (props) => {
    return (
        <div>
            <ol>
                {props.parts.map((part, index) => (
                    <Part key={index} part={part.name} exercises={part.exercises} />
                ))}
            </ol>
        </div>
    )
}

export default Content