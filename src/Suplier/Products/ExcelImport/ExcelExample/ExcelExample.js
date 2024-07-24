import React from 'react';
import './ExcelExample.css';

function ExcelExample({ handleCloseExample }) {
    return (
        <div className="excel-example-container">
              
            <div className="excel-example-photo">
                <img src={`${process.env.PUBLIC_URL}/ExcelExampleImg.png`} alt="Excel Example" />
            </div>
            <div className="excel-example-text">
                Фото відображає принцип розміщення товарів в таблиці
            <li>
                Обов'язково потрібно зберігати, порядок: штрихкод, назва,ціна
            </li>
            <li>
                Обов'язково перевіряти правильність штрихкоду
            </li>
            <li>
                Якщо після завантаження таблиці позиція закреслена червоним, значить нема співпадіння по штрихкоду
            </li>

            </div>
            <button className="excel-example-closebutton" onClick={handleCloseExample}>Close</button>
        </div>
    );
}

export default ExcelExample;
