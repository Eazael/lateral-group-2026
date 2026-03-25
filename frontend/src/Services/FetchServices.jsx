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
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            mode: 'cors',
        }, setErrorData)
}

const updateFinished = async(globalData, id, finished, setErrorData) => {
    return await saveData(globalData.backendUrl + '/tasks/' + id, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                finished: finished,
            })
        }, setErrorData)
}

export { getTasks, updateFinished }