import { Button, Table, ToggleButton } from "react-bootstrap";
import Column from "../Classes/Column";
import { useState, useContext } from "react";
import ModalAction from "./ModalAction";
import { deleteTask } from "../Services/FetchServices";
import { GlobalContext } from "../Context/GlobalContext";

function TaskList({ title, tasks, setChecked, actionText, reloadData }) {
    const { globalData } = useContext(GlobalContext);
    const [errorData, setErrorData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(0);

    const taskColumns = [
        new Column('description', 'Description'),
    ]

    const showDeleteModal = (idToDelete) => {
        setShowModal(true);
        setId(idToDelete);
    }

    const processDeleteTask = async () => {
        var deleted = await deleteTask(globalData, id, setErrorData);
        if (deleted) {
            await reloadData()
            setShowModal(false);
        }
    }

    return (
        <div className="data-table">
            <h2>{title}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>#</td>
                        { taskColumns.map(column => (<th key={column.name} id={column.name}>{column.title}</th>) ) }
                    </tr>
                </thead>
                <tbody>
                    { tasks !== null ? tasks.map((row, index) => (
                        <tr key={row.id}>
                            <td>{ index + 1}</td>
                            { taskColumns.map(column => (
                                <td key={ row.id + column.name } id={ row.id + column.name }>
                                    {row[column.name]}
                                </td>
                            )) }
                            <td key={row.id + "finished"}>
                                <ToggleButton
                                    className="mb-2"
                                    id={ row.id + "" + index + row.finished }
                                    type="checkbox"
                                    variant="outline-primary"
                                    checked={row['finished']}
                                    value="1"
                                    onChange={() => setChecked(row.id, !row.finished)}
                                >
                                    {actionText}
                                </ToggleButton>
                            </td>
                            <td>
                                <Button 
                                    variant="danger"
                                    onClick={() => showDeleteModal(row.id)}
                                >Delete</Button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan={2}>No tasks available</td></tr>
                        ) }
                </tbody>
            </Table>
            <ModalAction
                show={showModal}
                setShow={setShowModal}
                title="Delete task"
                description="Are you sure you want to delete this task?"
                saveText="Delete"
                cancelText="Cancel"
                handleProceed={processDeleteTask}
                error={errorData}
                setErrorData={setErrorData}
            />
        </div>
    )
}

export default TaskList;