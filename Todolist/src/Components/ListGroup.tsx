import { useState, FormEvent, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { Pencil, Trash, Check2, X } from 'react-bootstrap-icons';
import './ListGroup.css'

function ListGroup() {

    //Hook
    const [items, setItems] = useState<string[]>([]);
    const [editingItem, setEditingItem] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>('');
    const [entry, setEntry] = useState<string>('');
    const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
    const [newItemIndex, setNewItemIndex] = useState<number | null>(null);

    // Initialize checkedItems state when items change
    useEffect(() => {
        setCheckedItems(Array(items.length).fill(false));
    }, [items]);

    useEffect(() => {
        if (newItemIndex !== null) {
            const timer = setTimeout(() => {
                setNewItemIndex(null);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [newItemIndex]);

    let handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (entry != '') {
            const newItems = [...items];
            newItems.push(entry)
            setItems(newItems)
            setNewItemIndex(newItems.length - 1);
            setEntry('');
        }
    };

    const handleCheckboxChange = (index: number) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    // Start editing an item
    const startEditing = (index: number) => {
        setEditingItem(index);
        setEditText(items[index]);
    };

    //Save edited Item
    const saveEdit = (index: number) => {
        if (!editText.trim()) return;

        const updatedItems = [...items];
        updatedItems[index] = editText;
        setItems(updatedItems);
        setEditingItem(null);
        setEditText('');
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingItem(null);
        setEditText('');
    };

    // Delete an item
    const deleteItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    //Delete selected Item
    const deleteSelected = () => {
        const updatedItems = items.filter((_, index) => !checkedItems[index]);
        setItems(updatedItems);
    };

    return (
        <>
            <h1 className="text-center">Grocery List</h1>
            <form onSubmit={handleSubmit}>
                {/* Add new item section */}
                <div className="mb-4 p-3 bg-white rounded shadow-sm">
                    <h5 className="mb-3">Add New Item</h5>
                    <div className="input-group input-width">
                        <input
                            type="text"
                            className="form-control"
                            value={entry}
                            onChange={(e) => setEntry(e.target.value)}
                            placeholder="Enter new item..."
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            disabled={!entry.trim()}
                        >
                            Add Item
                        </button>
                    </div>
                </div>
                {/* <input
                    type="text"
                    placeholder='Enter item'
                    value={entry}
                    className='inputField'
                    onChange={(e) => setEntry(e.target.value)}
                />
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                >
                    Add
                </Button> */}
            </form>
            <div className="d-flex justify-content-between align-items-center mb-3 p-2 bg-white rounded shadow-sm">
                <div className="d-flex align-items-center">
                    <h5 className="mb-0 me-3">Items List</h5>
                    <span className="badge bg-info">{items.length} items</span>
                </div>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={deleteSelected}
                    disabled={!checkedItems.some(checked => checked)}
                >
                    <Trash className="me-1" /> Delete Selected
                </Button>
            </div>
            {items.length === 0 && <p>No item found</p>}
            <ul className="list-group">
                {items.map((item, index) =>
                    <li className={`list-group-item ${index === newItemIndex ? 'highlight-item' : ''}`}
                        key={index}
                    >
                        <div className="d-flex ">
                            <div className="form-check flex-grow-1">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-3"
                                    id={`checkbox-${index}`}
                                    checked={checkedItems[index] || false}
                                    onChange={() => handleCheckboxChange(index)}
                                />

                                {/* Item content - either text or edit input */}
                                {editingItem === index ? (
                                    <div className="d-flex flex-grow-1 me-3">
                                        <Form.Control
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                ) : (
                                    <div className="flex-grow-1 me-3">
                                        <Form.Label
                                            htmlFor={`checkbox-${index}`}
                                            className="mb-0"
                                        >
                                            {item}
                                        </Form.Label>
                                    </div>
                                )}
                            </div>
                            {/* Action buttons */}
                            <div className="d-flex">
                                {editingItem === index ? (
                                    <>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => saveEdit(index)}
                                            disabled={!editText.trim()}
                                        >
                                            <Check2 />
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={cancelEdit}
                                        >
                                            <X />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => startEditing(index)}
                                        >
                                            <Pencil />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => deleteItem(index)}
                                        >
                                            <Trash />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                    </li>
                )}
            </ul>
        </>
    );
}

export default ListGroup;