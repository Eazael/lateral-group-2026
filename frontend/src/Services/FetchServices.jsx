const getTasks = async (globalData, finished, setErrorData) => {
    try {
        const response = await fetch(globalData.backendUrl + '/tasks?finished=' + finished, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            mode: 'cors',
        });

        let responseData = await response.json()
        if (response.ok) {
            setErrorData(null)
            return responseData
        } else {
            setErrorData(new Error("The tasks were not found"))
        }
    } catch (error) {
        setErrorData(new Error(error.message))
    }
    return null
}

export { getTasks }