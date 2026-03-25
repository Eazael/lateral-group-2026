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
            setErrorData(new Error(responseData.message))
        }
    } catch (error) {
        setErrorData(new Error(error.message))
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
            setErrorData(new Error(responseData.message))
        }
    } catch (error) {
        setErrorData(new Error(error.message))
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

export { getTasks, updateFinished, createNewTask }