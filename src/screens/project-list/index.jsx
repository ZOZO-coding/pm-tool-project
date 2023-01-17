import { List } from "./list"
import { SearchBar } from "./search-bar"
import { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "utils"
import * as qs from "qs";

// when we are running npm start the project in developement, we are using the url from .env.development, when we are building the app using npm run build, the url is in the .env file
const apiURL = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    // param: parameters in the search bar
    // list: list of tasks
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 2000)
    const [list, setList] = useState([])
    // users: list of users
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debouncedParam])

    // use a custom hook useMount so that we can:
    // differentiate with the above useEffct hook that has dependency array
    useMount(() => {
        fetch(`${apiURL}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })

    return <div>
        <SearchBar param={param} setParam={setParam} users={users}/>
        <List list={list} users={users}/>
    </div>
}