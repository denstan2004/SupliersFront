import { useEffect, useState } from "react";
import axios from "axios";
import SingleParam from "./SingleParam";

function ReportParams({ reportparams, allreportParam, codereport,setTable }) {
    const [paramData, setParamData] = useState({});
    const [paramValuesMap, setParamValuesMap] = useState(new Map()); // Мапа для збереження значень

    useEffect(() => {
        console.log(reportparams);
        setParamValuesMap(new Map());
        if (reportparams[0] !== '' && reportparams !== undefined) {
            let newParamData = {};  
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
                        const payload = {
                            CodeData: 21,
                            ParamName: param 
                        };
                       /* axios.post("https://apitest.spar.uz.ua/znp", payload, {
                            withCredentials: true 
                             }).then(response => {
                                       console.log(response.data);
                                       newParamData[param] =response.data;
                             });*/
                             newParamData[param]=jsonValue

                        
                            
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
