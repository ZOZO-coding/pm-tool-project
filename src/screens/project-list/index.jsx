import { List } from "./list"
import { SearchBar } from "./search-bar"
import { useEffect, useInsertionEffect, useState } from "react"
import { cleanObject } from "utils"
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
    const [list, setList] = useState([])
    // users: list of users
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${apiURL}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [param])

    useInsertionEffect(() => {
        fetch(`${apiURL}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])

    return <div>
        <SearchBar param={param} setParam={setParam} users={users}/>
        <List list={list} users={users}/>
    </div>
}