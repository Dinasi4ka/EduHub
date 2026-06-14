import {useState} from "react";

const FILTERS = {
    topic: ["math_beginners", "algebra", "geometry", "advanced_math"],
    grade: ["grade_1_4", "grade_5_9", "grade_9_11", "university_1_5"],
    goal: ["deep_study", "math_thinking", "nmt_prep"],
    difficulty: ["easy", "medium", "hard"],
    experience: ["year_1", "year_5", "year_10"],
};

const CATEGORY_LABELS = {
    topic: "Тема",
    grade: "Клас",
    goal: "Мета",
    difficulty: "Складність",
    experience: "Досвід викладання",
};

const OPTION_LABELS = {
    math_beginners: "Математика для початківців",
    algebra: "Алгебра",
    geometry: "Геометрія",
    advanced_math: "Вища математика",

    grade_1_4: "1-4 класи",
    grade_5_9: "5-9 класи",
    grade_9_11: "9-11 класи",
    university_1_5: "1-5 курс",

    deep_study: "Поглиблене вивчення",
    math_thinking: "Розвиток математичного мислення",
    nmt_prep: "Підготовка до НМТ",

    easy: "Легкий рівень",
    medium: "Середній рівень",
    hard: "Високий рівень",

    year_1: "Від 1 року",
    year_5: "Від 5 років",
    year_10: "Більше 10 років",
};

function Filters({ selectedFilters, setSelectedFilters }) {
    const [minValue, setMinValue] = useState(150);
    const [maxValue, setMaxValue] = useState(1000);
    const handleMinChange = (e) => {
        const value = Number(e.target.value);
        setSelectedFilters({...selectedFilters, max_price: value});
        if (value <= maxValue) setMinValue(value);
    };

    const handleMaxChange = (e) => {
        const value = Number(e.target.value);
        if (value >= minValue) {
            setSelectedFilters({...selectedFilters, max_price: value});
            setMaxValue(value);
        }
    };

    const min = 0;
    const max = 5000;

    const handleCheckboxChange = (category, option) => {
        setSelectedFilters((prev) => {
            const prevSelected = prev[category];
            const newSelected = prevSelected.includes(option)
                ? prevSelected.filter((item) => item !== option)
                : [...prevSelected, option];

            return {
                ...prev,
                [category]: newSelected,
            };
        });
    };

    return (
        <aside className="filters">
            {Object.entries(FILTERS).map(([category, options]) => (
                <div key={category}>
                    <div className="filter_title">{CATEGORY_LABELS[category]}</div>
                    <ul>
                        {options.map((option) => (
                            <li key={option}>
                                <label className="checkbox_label">
                                    <input
                                        type="checkbox"
                                        checked={selectedFilters[category]?.includes(option)}
                                        onChange={() => handleCheckboxChange(category, option)}
                                    />
                                    <span className="checkmark"></span>
                                    <div className="checkbox_name">{OPTION_LABELS[option]}</div>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            {selectedFilters?.additional && (
                <>
                    {/*<div className="filter_title">Досвід викладання</div>*/}
                    {/*<ul>*/}
                    {/*    <li><label className="checkbox_label"><input type="checkbox" /><span className="checkmark"></span><div className="checkbox_name">Від 1 року</div></label></li>*/}
                    {/*    <li><label className="checkbox_label"><input type="checkbox" /><span className="checkmark"></span><div className="checkbox_name">Від 5 років</div></label></li>*/}
                    {/*    <li><label className="checkbox_label"><input type="checkbox" /><span className="checkmark"></span><div className="checkbox_name">Більше 10 років</div></label></li>*/}
                    {/*</ul>*/}
                    <div className="filter_title">Вартість за годину</div>
                    <div className="range-container">
                        <div className="labels">
                            <div>
                                <label>від</label>
                                <span><input type="number" value={minValue} onChange={handleMinChange}/>₴</span>
                            </div>
                            <div>
                                <label>до</label>
                                <span><input type="number" value={maxValue} onChange={handleMaxChange}/>₴</span>
                            </div>
                        </div>
                        <div className="slider-wrapper">
                            <input type="range" min={min} max={max} value={minValue} onChange={handleMinChange} className="range-input"/>
                            <input type="range" min={min} max={max} value={maxValue} onChange={handleMaxChange} className="range-input"/>
                        </div>
                    </div>
                </>)}
            <button className="apply-filters">Застосувати</button>
        </aside>
    );
}

export default Filters;
