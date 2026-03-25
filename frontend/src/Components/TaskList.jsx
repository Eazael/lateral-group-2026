import { Table, ToggleButton } from "react-bootstrap";
import Column from "../Classes/Column";

function TaskList({ title, tasks, setChecked, actionText }) {

    const taskColumns = [
        new Column('description', 'Description'),
    ]

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
                    { tasks.map((row, index) => (
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
                        </tr>
                    )) }
                </tbody>
            </Table>
        </div>
    )
}

export default TaskList;