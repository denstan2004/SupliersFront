import axios from "axios";
import { useEffect, useState } from "react";
import ReportParams from "./reportParams"
function Reports(){

    const [report, setReport] = useState([]); // всі звіти
    const [reportParam, setReportParam] = useState([]); // всі можливі параметри
    const [selectedReportParam, setSelectedReportParam] = useState([]); // параметри вибраного звіту
    const [selectedReport, setSelectedReport] = useState();
    const [codereport,setCodereport]=useState();
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
                    console.log(response.data)
                    setReport(response.data.Report);
                    setReportParam(response.data.ReportParam);
                })

        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleReportChange = (event) => {
        const report = event.target.value.split(",");
        setSelectedReport(report);
        setCodereport(report[0]);
        
        
        const reportParams = report.slice(2);
        setSelectedReportParam(reportParams);
        
        
    };



   
    return (
        <div className="reports-container">
             <select className="reports-select" value={selectedReport} onChange={handleReportChange}>
                        {report.map(rep => (
                            <option key={rep} value={rep}>{rep[1]}</option>
                        ))}
                    </select>

                   
             
            <ReportParams codereport={codereport} reportparams={selectedReportParam} allreportParam={reportParam} ></ReportParams>
        </div>
    )

}
export default Reports;