import React, { useState } from "react";

export type TForm = {
    [name in string]: string;
};

export function useForm(inputValues: TForm) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}
