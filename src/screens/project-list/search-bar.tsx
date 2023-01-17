export interface User {
    id: string,
    name: string,
    email: string,
    title: string,
    organization: string,
}

interface SearchBarProps {
    users: User[],
    param: {
        name: string;
        personId: string;
    },
    setParam: (param: SearchBarProps['param']) => void;
}

export const SearchBar = ({users, param, setParam}: SearchBarProps) => {

    return <form>
        <div>
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId: evt.target.value
            })}>
                <option value="">Owner</option>
                {
                    users.map(user => <option key={user.id} value={user.id} >{user.name}</option>)
                }
            </select>
        </div>
    </form>
}