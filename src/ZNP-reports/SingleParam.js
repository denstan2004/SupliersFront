import { useState, useEffect } from "react";

function SingleParam({ paramName, listParams, allreportParam, onValueChange }) {
    const [selectedValue, setSelectedValue] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // State to store search term
    const [filteredParams, setFilteredParams] = useState([]);

    useEffect(() => {
        // Set the first element as the selected value when the component loads
        if (Array.isArray(listParams?.LispParam) && listParams.LispParam.length > 0) {
            setSelectedValue(listParams.LispParam[0][0]);
            onValueChange(paramName, listParams.LispParam[0][0]);
            setFilteredParams(listParams.LispParam);
        }
    }, [listParams, paramName, onValueChange]);

    useEffect(() => {
        // Filter the list based on the search term
        if (Array.isArray(listParams?.LispParam)) {
            const filtered = listParams.LispParam.filter(item =>
                item[1].toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredParams(filtered);
        }
    }, [searchTerm, listParams]);

    let paramFormat;
    let Name;

    allreportParam.forEach(element => {
        if (element[1] === paramName) {
            paramFormat = element[2];
            Name = element[3];
        }
    });

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        onValueChange(paramName, value);
    };

    return (
        <div>
            <h3>{Name}</h3>
            {paramFormat === "list" ? (
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select value={selectedValue} onChange={handleChange}>
                        {filteredParams.map((item, index) => (
                            <option key={index} value={item[0]}>
                                {item[1]} {/* Display the second element */}
                            </option>
                        ))}
                    </select>
                </div>
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
