import { useEffect, useState } from "react"

type User = {
  id: number;
  firstName: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([])
  
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users: ', err))
  })

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage