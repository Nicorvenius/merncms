
export default class useHttp{

    async request(url, method = 'GET', body = null, headers = {}) {

        try {

            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})

            const data = await response.json()

            if (!response.ok) {
                // console.log(data)
                // response.reject(data)
                throw new Error(data.message || 'Что-то пошло не так')
            }
            return data
        } catch (err) {
            throw err;
        }
    }
}

