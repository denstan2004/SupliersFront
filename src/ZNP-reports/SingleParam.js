import { useState, useEffect } from "react";

function SingleParam({ paramName, listParams, allreportParam, onValueChange }) {
    const [selectedValue, setSelectedValue] = useState("");

    console.log(paramName); // один із параметрів звіту, наприклад, codewares з можливих одного і більше параметрів
    console.log(listParams); // дані, які містить наш умовний codewares
    console.log(allreportParam); // всі можливі варіанти параметрів
    // onValueChange призначений для зміни 

    let paramFormat;
    let Name;

    allreportParam.forEach((element) => {
        if (element[1] === paramName) {
            paramFormat = element[2];
            Name = element[3];
        }
    });

    // Використання useEffect для автоматичного встановлення першого значення списку
    useEffect(() => {
        if (paramFormat === "list" && Array.isArray(listParams.LispParam) && listParams.LispParam.length > 0) {
            const firstValue = listParams.LispParam[0][0];
            setSelectedValue(firstValue);
            onValueChange(paramName, firstValue); // Встановлюємо перше значення та передаємо його в onValueChange
        }
    }, [paramFormat, listParams, paramName, onValueChange]); // Залежності

    const handleChange = (event) => {
        const value = event.target.value; // Одне з вибраних значень codewares, наприклад lubo....
        setSelectedValue(value);
        onValueChange(paramName, value); 
    };

    return (
        <div>
            <h3>{Name}</h3>
            {paramFormat === "list" ? (
                <select value={selectedValue} onChange={handleChange}>
                    {Array.isArray(listParams.LispParam) ? (
                        listParams.LispParam.map((item, index) => (
                            <option key={index} value={item[0]}>
                                {item[1]} {/* Відображаємо другий елемент масиву */}
                            </option>
                        ))
                    ) : (
                        <option disabled>Невірний формат даних</option>
                    )}
                </select>
            ) : paramFormat === "date" ? (
                <input
                    type="date"
                    value={selectedValue}
                    onChange={handleChange}
                />
            ) : (
                <div>Невідомий формат параметра</div>
            )}
        </div>
    );
}

export default SingleParam;
