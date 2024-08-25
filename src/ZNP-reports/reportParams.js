import { useEffect, useState } from "react";
import axios from "axios";
import SingleParam from "./SingleParam";

function ReportParams({ reportparams, allreportParam, codereport }) {
    const [paramName, setParamData] = useState({});
    const [paramValuesMap, setParamValuesMap] = useState(new Map()); // Мапа для збереження значень

    useEffect(() => {
        setParamValuesMap(new Map());
        if (reportparams !== null && reportparams !== undefined) {
            let newParamData = {};  // Копіюємо попередні значення
            const jsonValue = {
                "State": 0,
                "LispParam": [
                    [166, "Lubo FoodToGo"],
                    [169, "Lubo М'ясний Цех"],
                    [167, "Lubo Пекарський Цех"],
                    [168, "Lubo Піцерія"],
                    [
                        74,
                        "Берегово Піцерія"
                    ]
                ]
            };

            reportparams.forEach(param => {
                if (param !== "") {
                    if (param === "date_begin" || param === "date_end") {
                        newParamData[param] = "date";
                    } else {
                        newParamData[param] = jsonValue;
                    }
                }
            });
            setParamData(newParamData);
        }
    }, [reportparams]);

    const handleValueChange = (name, paramCode) => {
        setParamValuesMap(prevMap => {
            const newMap = new Map(prevMap);
            newMap.set(name, paramCode); // Оновлюємо мапу
            return newMap;
        });
        console.log(name + paramCode);
    };

    const ButtonClick = () => {
        // Convert the Map to an array of arrays
        const paramArray = Array.from(paramValuesMap.entries());

        const payload = {
            CodeData: 22,
            CodeReport: codereport,
            Parameters: paramArray // Use the array format
        };

        axios.post("http://api.spar.uz.ua/znp", payload, {
            withCredentials: true 
        }).then(response => {
            console.log(response.data);
        });
        
        console.log(payload);
    };

    useEffect(() => {
        console.log(Array.from(paramValuesMap.entries())); // Перевірка значень у мапі
    }, [paramValuesMap]); // Виводимо мапу в консоль після кожної зміни

    return (
        <div>
            {Object.keys(paramName).map((key) => (
                <SingleParam
                    key={key}
                    allreportParam={allreportParam}
                    paramName={key}
                    onValueChange={handleValueChange}
                    listParams={paramName[key]} // Передаємо масив значень у компонент DropdownList
                />
            ))}
            <button onClick={ButtonClick}>Отримати</button>
        </div>
    );
}

export default ReportParams;
