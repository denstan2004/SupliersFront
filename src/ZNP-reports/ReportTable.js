import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./ReportTable.css";

function ReportTable({ responseTable }) {
    const [header, setHeader] = useState([]);
    const [body, setBody] = useState([]);

    useEffect(() => {
        if (responseTable?.InfoColumn) {
            setHeader(responseTable.InfoColumn);
        } else {
            setHeader([]); // Set empty array if InfoColumn is missing
        }

        if (responseTable?.Data) {
            setBody(responseTable.Data);
        } else {
            setBody([]); // Set empty array if Data is missing
        }

        console.log(responseTable.InfoColumn);
        console.log(responseTable.Data);
    }, [responseTable]); // Adding [responseTable] as a dependency

    const exportToExcel = () => {
        const data = [header, ...body]; // Combine header and body

        const worksheet = XLSX.utils.aoa_to_sheet(data); // Convert array of arrays to sheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

        XLSX.writeFile(workbook, "report.xlsx"); // Generate and download Excel file
    };

    return (
        <div>
            <button onClick={exportToExcel}>Export to Excel</button>
            <div className="report-table-header">
                {header.length > 0 ? (
                    <ReportTableHeader header={header} />
                ) : (
                    <div></div>
                )}
            </div>
            <div className="report-table-body">
                {body.length > 0 ? (
                    <ReportTableBody body={body} />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}

function ReportTableHeader({ header }) {
    console.log(header);
    return (
        <div className="report-table-header">
            {header.map((element, index) => (
                <div className="report-table-header-segment" key={index}>{element}</div>
            ))}
        </div>
    );
}

function ReportTableBody({ body }) {
    return (
        <div className="report-table-body">
            {body.map((row, rowIndex) => (
                <div className="report-table-row" key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <div className="report-table-cell" key={cellIndex}>
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ReportTable;
