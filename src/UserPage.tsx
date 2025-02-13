import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type User = {
  id: number;
  firstName: string;
}

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const { register, handleSubmit, reset } = useForm<{ firstName: string }>()

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users: ', err))
  })

  const onSubmit = async (data: { firstName: string }) => {
    const response = await fetch('http://localhost:5000/api/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      const newUser = await response.json()
      setUsers((prev) => [...prev, newUser])
      reset()
    } else {
      console.error('Error adding user')
    }
  }

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

      <h1>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          {...register("firstName", { required: true })}
          placeholder="Enter name"
          className="userInput"
        />
        <button type="submit" className="submitBtn">
          Add user
        </button>
      </form>
    </div>
  )
}

export default UserPage