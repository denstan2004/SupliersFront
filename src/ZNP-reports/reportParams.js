import { useEffect, useState } from "react";
import axios from "axios";
import SingleParam from "./SingleParam";

function ReportParams({ reportparams, allreportParam, codereport,setTable }) {
    const [paramData, setParamData] = useState({});
    const [paramValuesMap, setParamValuesMap] = useState(new Map()); // Мапа для збереження значень

    useEffect(() => {
        setParamData({});
        if (reportparams.length > 0 && reportparams[0] !== '') {
            let newParamData = {};
    
            // Виконати запити для кожного параметру
            const fetchParamData = async () => {
                for (const param of reportparams) {
                    if (param === "date_begin" || param === "date_end") {
                        newParamData[param] = "date";
                    } else {
                        try {
                            const payload = {
                                CodeData: 21,
                                ParamName: param 
                            };
                            const response = await axios.post("https://apitest.spar.uz.ua/znp", payload, {
                                withCredentials: true 
                            });
                            newParamData[param] = response.data;
                        } catch (error) {
                            console.error("Помилка при отриманні даних параметру:", error);
                        }
                    }
                }
                setParamData(newParamData);
            };
    
            fetchParamData();
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
        // перетворюємо мапу в масив масивів з двух елементів ключ- значення
        if(reportparams[0]=='')
        {
            const payload = {
                CodeData: 22,
                CodeReport: codereport,
                Parameters: [] 
            };
    
            axios.post("https://apitest.spar.uz.ua/znp", payload, {
                withCredentials: true 
            }).then(response => {
                console.log(response.data);
                setTable(response.data);
            });
        }
        else{
        const paramArray = Array.from(paramValuesMap.entries());

        const payload = {
            CodeData: 22,
            CodeReport: codereport,
            Parameters: paramArray // Use the array format
        };

        axios.post("https://apitest.spar.uz.ua/znp", payload, {
            withCredentials: true 
        }).then(response => {
            console.log(response.data);
            setTable(response.data);
        });
    }
       
        
      
    };

    useEffect(() => {
        console.log(Array.from(paramValuesMap.entries())); // Перевірка значень у мапі
    }, [paramValuesMap]); // Виводимо мапу в консоль після кожної зміни

    return (
        <div>
          {reportparams[0] !== '' ? (
            Object.keys(paramData).map((key) => (
              <SingleParam
                key={key}
                allreportParam={allreportParam}
                paramName={key}
                onValueChange={handleValueChange}
                listParams={paramData[key]}
              />
            ))
          ) : (
            <div></div>
          )}
          <button onClick={ButtonClick}>Отримати</button>
        </div>
      );
      
}

export default ReportParams;
