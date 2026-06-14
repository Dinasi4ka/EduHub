import { useEffect, useState } from "react";

const randomTitles = [
    "Типові задачі на геометричну прогресію",
    "НМТ 2022",
    "Алгебра: рівняння та нерівності",
    "Тригонометрія: основи",
    "Тестові завдання ЗНО",
    "Логарифмічні рівняння та нерівності",
    "Математичний аналіз: похідна",
    "Імовірність і статистика",
    "Задачі на відсотки",
    "Комбінаторика: принцип множення",
    "Множини та логіка",
    "Системи рівнянь з параметрами",
    "Планіметрія: трикутники і чотирикутники",
    "Стереометрія: тіла обертання",
    "Графіки функцій та їхні перетворення",
    "Нерівності з модулем",
    "Експоненціальні рівняння",
    "Формули скороченого множення",
    "Послідовності: арифметична та геометрична",
    "Фінансова математика: кредити і депозити"
];


function getRandomTitle() {
    return randomTitles[Math.floor(Math.random() * randomTitles.length)];
}

function getRandomSize() {
    const size = (Math.random() * 4 + 0.5).toFixed(1); // 0.5 MB to 4.5 MB
    return Math.random() > 0.5 ? `${size} МБ` : `${(size * 1024).toFixed(0)} КБ`;
}

function getRandomDate() {
    const now = new Date();
    const past = new Date(now.getFullYear() - 2, 0, 1);
    const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
    const date = new Date(randomTime);
    const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function RandomItems({ data }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const generatedItems = Array.from({ length: 2 }, () => ({
            title: getRandomTitle(),
            date: getRandomDate(),
            size: getRandomSize(),
        }));
        setItems(generatedItems);
    }, []);

    return (
        <>
            {items.map((item, i) => (
                <div className="item" key={i}>
                    <div className="title">
                        <div className="book" />
                        <strong>{item.title}</strong>
                    </div>
                    <div className="details">
                        <div className="user">
                            {data.first_name ? `${data.first_name} ${data.last_name}` : data.username}
                        </div>
                        <div className="date">{item.date}</div>
                        <div className="size">{item.size}</div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default RandomItems;