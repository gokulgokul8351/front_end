import './App.css'

import { useEffect, useState } from 'react'

function App() {
  // added state
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [todos, setTodos] = useState([])
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Edit functionality states
  const [editId, setEditId] = useState(-1)
  const [editTitle, setEditTitle] = useState('')
  const [editDesc, setEditDesc] = useState('')

  // API
  const API_URL = 'https://todo-app-knvs.onrender.com/items'

  // handle submit
  const handleSubmit = () => {
    // e.preventdefault()

    // validate inputs
    if (title.trim() !== '' && desc.trim() !== '') {
      fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, desc }),
      })
        .then((res) => {
          if (res.ok) {
            // add item to list
            setTodos([...todos, { title, desc }])
            setSuccess('Item added successfully')
            setTitle('')
            setDesc('')
            setTimeout(() => {
              setSuccess('')
            }, 3000)
          } else {
            // set Error

            setError('Unable to create Todo item')
            setTimeout(() => {
              setError('')
            }, 3000)
          }
        })
        .catch(() => {
          setError('Unable to create Todo item')
          setTimeout(() => {}, 3000)
        })
    }
  }

  // UseEffect hook
  useEffect(() => {
    getItems()
  }, [])

  // Get all items in database
  const getItems = () => {
    fetch(`${API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
  }

  // Edit
  const handleEdit = (item) => {
    setEditId(item._id)
    setEditTitle(item.title)
    setEditDesc(item.desc)
  }

  // update
  const handleUpdate = () => {
    // validate inputs
    if (editTitle.trim() !== '' && editDesc.trim() !== '') {
      fetch(`${API_URL}/todos/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editTitle, desc: editDesc }),
      })
        .then((res) => {
          if (res.ok) {
            // update item to list
            const updatedTodo = todos.map((item) => {
              if (item._id == editId) {
                item.title = editTitle
                item.desc = editDesc
              }
              return item
            })

            setTodos(updatedTodo)
            setSuccess('Item updated successfully!')
            setTimeout(() => {
              setSuccess('')
              setTitle('')
              setDesc('')
            }, 3000)

            setEditId(-1)
          } else {
            // set Error

            setError('Unable to Update item 1')
            setTimeout(() => {
              setError('')
            }, 3000)
          }
        })
        .catch(() => {
          setError('Unable to Update item 2')
          setTimeout(() => {}, 3000)
        })
    }
  }
  // cancel
  const handleEditCancel = () => {
    setEditId(-1)
  }

  // delete

  const handleDelete = (id) => {
    if (window.confirm('Are you sure want to delete!')) {
      fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      }).then(() => {
        const newUpdateTodo = todos.filter((item) => item._id !== id)
        setTodos(newUpdateTodo)
      })
    }
  }

  return (
    <>
      {/* header section */}
      <div className="row text-center p-3 bg-success text-light">
        <h1>Daily Activity Todo Notes</h1>
      </div>

      {/* input section */}
      <div className="row">
        <h3 className="text-light">Add Items</h3>
        {/* success message for ui */}
        {success && (
          <p className=" text-success bg-light my-4 h5 "> {success} </p>
        )}

        <div className="form-group d-flex gap-2">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
            className=" form-control "
          />
          <input
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            placeholder="Descriptions"
            className=" form-control "
          />
          <button
            onClick={handleSubmit}
            className="btn btn-dark"
          >
            Add
          </button>
        </div>
        {/* error message for ui */}
        {error && <p className="text-danger bg-light mt-4 h5  "> {error} </p>}
      </div>
      <div className="row mt-3">
        <h3 className="text-light">Task</h3>
        <ul className="list-group">
          {todos.map((item, idx) => {
            return (
              <li
                key={idx}
                className="list-group-item d-flex justify-content-between mx-4 my-4 align-items-center me-2 home_bg  "
              >
                <div className="d-flex flex-column mx-2 my-2 ">
                  {editId == -1 || editId !== item._id ? (
                    <>
                      <span className="fw-bold ">{item.title}</span>
                      <span className="">{item.desc}</span>
                    </>
                  ) : (
                    <div className="form-group d-flex gap-2 ">
                      <input
                        type="text"
                        onChange={(e) => setEditTitle(e.target.value)}
                        value={editTitle}
                        placeholder="Title"
                        className=" form-control "
                      />
                      <input
                        type="text"
                        onChange={(e) => setEditDesc(e.target.value)}
                        value={editDesc}
                        placeholder="Descriptions"
                        className=" form-control "
                      />
                    </div>
                  )}
                </div>
                <div className=" d-flex gap-2 ">
                  {editId == -1 || editId !== item._id ? (
                    <>
                      <button
                        className=" btn btn-warning "
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className=" btn btn-danger "
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className=" btn btn-warning "
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                      <button
                        className=" btn btn-danger "
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
