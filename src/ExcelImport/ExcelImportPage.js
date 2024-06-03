import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useLocation } from 'react-router-dom';

function ExcelParser() {
    const [data, setData] = useState([]);
    const [dataMatched, setDataMatched] = useState([]);
    const [dataUnmatched, setDataUnmatched] = useState([]);
    const location = useLocation();
    const { products } = location.state || {};
    console.log(products);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const filteredData = parsedData.map(row => ({
                barcode: row[0],
                name: row[1],
                price: row[2]
            }));

            setData(filteredData);
            console.log("lox");
            CheckData();
        };

        reader.readAsBinaryString(file);
    };

    const CheckData = () => {
        // Ваша логіка для перевірки даних
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
            <table>
                <thead>
                    <tr>
                        <th>Штрихкод</th>
                        <th>Назва</th>
                        <th>Ціна</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.barcode}</td>
                            <td>{row.name}</td>
                            <td>{row.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExcelParser;
