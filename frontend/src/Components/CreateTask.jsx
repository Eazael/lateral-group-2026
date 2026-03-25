import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { createNewTask } from "../Services/FetchServices";
import { GlobalContext } from "../Context/GlobalContext";
import { useContext } from "react";
import ErrorMessage from "./ErrorMessage";

function CreateTask({ reloadData }) {
    const {globalData} = useContext(GlobalContext);
    const [errorData, setErrorData] = useState(null)
    const[description, setDescription] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault()
        var saved = await createNewTask(globalData, description, setErrorData);
        if (saved) {
            reloadData()
            setDescription("")
        }
    }

    return (
        <div className="create-task">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="newTask">
                    <Form.Label>Task description</Form.Label>
                    <Form.Control
                        required
                        maxLength={512}
                        minLength={3}
                        type="text"
                        placeholder="Enter a description for your task"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Text>
                        Please enter a description between 3 and 512 characters long
                    </Form.Text>
                </Form.Group>
                <ErrorMessage
                    error={errorData}
                    setError={setErrorData}
                />
                <Button variant="primary" type="submit">Save new Task</Button>
            </Form>
        </div>
    )
}

export default CreateTask;