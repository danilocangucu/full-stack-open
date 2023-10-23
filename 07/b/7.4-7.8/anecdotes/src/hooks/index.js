import { useState } from "react";

export const useField = (name, type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        name,
        type,
        value,
        onChange
    }
}

export const useEmptyOnChange = (onChange) => {
    const emptyEventValue = {
        target: {
            value: ''
        }
    }
    onChange(emptyEventValue)
}