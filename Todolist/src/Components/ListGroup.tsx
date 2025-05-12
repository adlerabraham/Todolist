import { useState } from "react";

interface Props {
    onSelectItem: (item: string) => void;
}
function ListGroup({ onSelectItem }: Props) {

    let items: string[] = [
        'Eggs',
        'milk',
        'spinache',
        'rice',
        'beans'
    ];


    //Hook
    const [selectedItem, setSelectedItem] = useState(-1)


    return (
        <>
            <h1>Grocery List</h1>
            {items.length === 0 && <p>No item found</p>}
            <ul className="list-group">
                {items.map((item, index) =>
                    <li className={selectedItem === index ? "list-group-item active" : "list-group-item"}
                        key={index}
                        onClick={() => {
                            setSelectedItem(index)
                            onSelectItem(item)
                        }}
                    >
                        {item}
                    </li>
                )}
            </ul>
        </>
    );
}

export default ListGroup;