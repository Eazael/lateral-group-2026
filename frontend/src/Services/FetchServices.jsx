import ErrorData from "../Classes/ErrorData";

const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                };
const corsMode = 'cors';

const fetchData = async (url, configuration, setErrorData) => {
    try {
        const response = await fetch(url, configuration);
        let responseData = await response.json()
        if (response.ok) {
            setErrorData(null)
            return responseData
        } else {
            setErrorData(new ErrorData(responseData.message, responseData))
        }
    } catch (error) {
        setErrorData(new ErrorData(error.message, null))
    }
    return null
}

const saveData = async (url, configuration, setErrorData) => {
    try {
        const response = await fetch(url, configuration);
        let responseData = await response.json()
        if (response.ok) {
            setErrorData(null)
            return true
        } else {
            setErrorData(new ErrorData(responseData.message, responseData))
        }
    } catch (error) {
        setErrorData(new ErrorData(error.message, null))
    }
    return false
}

const getTasks = async (globalData, finished, setErrorData) => {
    return await fetchData(globalData.backendUrl + '/tasks?finished=' + finished, {
            method: 'GET',
            headers: headers,
            mode: corsMode,
        }, setErrorData)
}

const updateFinished = async(globalData, id, finished, setErrorData) => {
    return await saveData(globalData.backendUrl + '/tasks/' + id, {
            method: 'PATCH',
            headers: headers,
            mode: corsMode,
            body: JSON.stringify({
                finished: finished,
            })
        }, setErrorData)
}

const createNewTask = async(globalData, description, setErrorData) => {
    return await saveData(globalData.backendUrl + '/tasks', {
            method: 'POST',
            headers: headers,
            mode: corsMode,
            body: JSON.stringify({
                description: description,
            })
        }, setErrorData)
}

const deleteTask = async(globalData, id, setErrorData) => {
    return await saveData(globalData.backendUrl + '/tasks/' + id, {
            method: 'DELETE',
            headers: headers,
            mode: corsMode
        }, setErrorData)
}

export { getTasks, updateFinished, createNewTask, deleteTask }