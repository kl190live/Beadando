import React, { useState } from 'react';

interface ItemInterface {
    item: string;
    category: string;
    onRemove: () => void;
}

interface CategoryInterface {
    category: string;
}

function NewCategoryItem(props: ItemInterface) {
    const [onToggle, setOnToggle] = useState(true);

    function cancelRemove() {
        setOnToggle(true);
    }

    return (
        <li>
            {props.item}
            {onToggle ? (
                <button className="confirmation" onClick={() => setOnToggle(!onToggle)}>
                    Torles
                </button>
            ) : (
                <div className="confirmation">
                    <button onClick={() => { cancelRemove(); props.onRemove() }}>Igen</button>
                    <button onClick={cancelRemove}>Nem</button>
                </div>
            )}
        </li>
    );
}

interface CategoryDropdownProps {
    categories: CategoryInterface[];
}

function CategoryDropdown({ categories }: CategoryDropdownProps) {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <select value={selectedCategory} onChange={handleSelectChange}>
            <option value="">Válassz kategóriát...</option>
            {categories.map((category, index) => (
                <option key={index} value={category.category}>
                    {category.category}
                </option>
            ))}
        </select>
    );
}

export {NewCategoryItem, CategoryDropdown};    export type { ItemInterface, CategoryInterface };

