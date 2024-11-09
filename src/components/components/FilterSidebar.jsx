import React, { useState } from "react";
import ProductGrid from "./ProductGrid.jsx";
import '../styles/filtersidebar.css';
import MultiRangeSlider from "./MultiRangeSlider.jsx";

const categories = ["Rozetka", "Comfy", "Allo"];
const productTypes = ["Техніка", "Продовольчі товари", "Інше"];

function FilterSidebar({ isShowing, onSortChange }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedProductTypes, setSelectedProductTypes] = useState([]);
    const [isCategoryCollapsed, setIsCategoryCollapsed] = useState(false);
    const [isProductTypeCollapsed, setIsProductTypeCollapsed] = useState(false);
    const [isPriceCollapsed, setIsPriceCollapsed] = useState(false);

    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const toggleProductType = (productType) => {
        setSelectedProductTypes((prev) =>
            prev.includes(productType)
                ? prev.filter((pt) => pt !== productType)
                : [...prev, productType]
        );
    };



    return (
        <div className="container">
            <aside className={`sidebar ${isShowing ? "show" : ""}`}>
                <h3 onClick={() => setIsCategoryCollapsed(!isCategoryCollapsed)}>
                    Магазини {isCategoryCollapsed ? "▲" : "▼"}
                </h3>
                <ul style={{ maxHeight: isCategoryCollapsed ? 0 : 90,
                    zIndex: 5,
                    position: 'relative' }}>
                    {categories.map((category, index) => (
                        <li key={index}>
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => toggleCategory(category)}
                                />
                                <span className="checkmark"></span>
                                {category}
                            </label>
                        </li>
                    ))}
                </ul>

                <div className="separator"></div>
                <h3 onClick={() => setIsProductTypeCollapsed(!isProductTypeCollapsed)}>
                    Тип Товару {isProductTypeCollapsed ? "▲" : "▼"}
                </h3>
                <ul style={{ maxHeight: isProductTypeCollapsed ? 0 : 110,
                    zIndex: 5,
                    position: 'relative' }}>
                    {productTypes.map((productType, index) => (
                        <li key={index}>
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedProductTypes.includes(productType)}
                                    onChange={() => toggleProductType(productType)}
                                />
                                <span className="checkmark"></span>
                                {productType}
                            </label>
                        </li>
                    ))}
                </ul>



                <div className="separator"></div>
                <h3 onClick={() => setIsPriceCollapsed(!isPriceCollapsed)}
                >Ціна {isPriceCollapsed ? "▲" : "▼"}</h3>
                <ul style={{ maxHeight: isPriceCollapsed ? 0 : 60,
                    zIndex: 5,
                    position: 'relative'
                }}>
                    <MultiRangeSlider
                        min={0}
                        max={10000}
                        onChange={({min, max}) => console.log(`min = ${min}, max = ${max}`)}
                    />
                </ul>
                <div className="separator"></div>
            </aside>

            <div className="main-content">
                <div className="sorting">
                    <label>
                    Сортувати за:
                        <select className="selector" onChange={onSortChange}>
                            <option value="downtoup">Від дешевих до дорогих</option>
                            <option value="uptodown">Від дорогих до дешеевих</option>
                            <option value="rating">Рейтинг</option>
                        </select>
                    </label>
                </div>


                <ProductGrid selectedCategories={selectedCategories} selectedProductTypes={selectedProductTypes}/>
            </div>
        </div>
    );
}

export default FilterSidebar;
