export const getItems = () => {
  // Get all items in database
  fetch(`${API_URL}/todos`)
    .then((res) => res.json())
    .then((data) => setTodos(data))
}

export const submitData = () => {
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
          setTimeout(() => {
            setSuccess('')
            setTitle('')
            setDesc('')
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
