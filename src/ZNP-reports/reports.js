import axios from "axios";
import { useEffect, useState } from "react";

function Reports(){

    const [report, setReport] = useState([]); // всі звіти
    const [reportParam, setReportParam] = useState([]); // всі можливі параметри
    const [selectedReportParam, setSelectedReportParam] = useState([]); // параметри вибраного звіту
    const [selectedReport, setSelectedReport] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [paramData, setParamData] = useState({}); // об'єкт для зберігання даних параметрів

    useEffect(() => {
        try {
            const payload = {
                CodeData: 20,
                Login: "Dstanislav",
                PassWord: "d15012004"
            }
            axios.post("https://apitest.spar.uz.ua/znp", payload, {
                withCredentials: true 
            })
                .then(response => {
                    setReport(response.data.Report);
                    setReportParam(response.data.ReportParam);
                    console.log(response);
                })

        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleReportChange = (event) => {
        const report = event.target.value.split(",");
        setSelectedReport(report);
        console.log(report)
        const reportParams = report.slice(2);
        setSelectedReportParam(reportParams);
        const data = {};
        console.log(reportParams)
        reportParams.forEach(param => {
            console.log(param);
            if(param!='')
            {

             const payload = {
                   CodeData: 21,
                   ParamName:param
             }
                axios.post("https://apitest.spar.uz.ua/znp", payload, {
                    
                       
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'text/plain; charset=utf-8',
                    }
                    
              })
                   .then(response => {
                      data[param] = response.data;
                       console.log(response.data);
                       setParamData(prevData => ({ ...prevData, ...data }));
                    })
                   .catch(error => console.error(`Error fetching data for ${param}:`, error));
            }
        });
        
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredReports = report.filter(rep =>
        rep[1].toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="reports-container">
             <select className="reports-select" value={selectedReport} onChange={handleReportChange}>
                        {report.map(rep => (
                            <option key={rep} value={rep}>{rep[1]}</option>
                        ))}
                    </select>

                   
             <input type="text"
                placeholder="Пошук..."
                value={searchTerm}
                onChange={handleSearchChange}>
             </input>
            <select className="reports-select" value={selectedReportParam}>
                {selectedReportParam.map((repparams, index) => (
                    <option key={index} value={repparams}>{repparams}</option>
                ))}
            </select>
        </div>
    )

}
export default Reports;