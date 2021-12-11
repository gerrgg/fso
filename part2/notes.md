# Part 2

## REST

In REST, individual data objects are known as resources. Every resource has a unique url.

Resources are fetched from the server with HTTP GET requests. For instance, an HTTP GET request to the URL notes/3 will return the note that has the id number 3. An HTTP GET request to the notes URL would return a list of all notes.

Creating a new resource for storing a note is done by making an HTTP POST request to the notes URL according to the REST convention that the json-server adheres to. The data for the new note resource is sent in the body of the request.

## Sending Data to the Server

We create a new object, but omit the ID property, its better to let the server do that.

_Remember is that the concat method does not change the component's original state, but instead creates a new copy of the list._

```
addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    date: new Date(),
    important: Math.random() < 0.5,
  }

  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
}
```

## Editing a resource

Individual notes stored in the json-server backend can be modified in two different ways by making HTTP requests to the note's unique URL. We can either replace the entire note with an HTTP PUT request, or only change some of the note's properties with an HTTP PATCH request.

```
const toggleImportanceOf = id => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  axios.put(url, changedNote).then(response => {
    setNotes(notes.map(note => note.id !== id ? note : response.data))
  })
}
```

First, we create the URL of the resource we want to manipulate.

Then we find the note with the matching ID.

Next we make a shallow-copy of the note object expect for the important property.

`setNotes(notes.map(note => note.id !== id ? note : response.data))`

The map method creates a new array by mapping every item from the old array into an item in the new array. In our example, the new array is created conditionally so that if note.id !== id is true, we simply copy the item from the old array into the new array. If the condition is false, then the note object returned by the server is added to the array instead.

## Modularizing communication with the backend

Create a src/services directory and add a file there called notes.js:

```
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }
```

Then you can import your functions into the App

```
import noteService from './services/notes'

const App = () => {
```

Now you can use the functions in your App to GET, POST and PUT resources.

### GET

```
const App = () => {
  // ...

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

```

### POST

```
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

```

### PUT

```
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  }
```

Promises are central to modern JavaScript development and it is highly recommended to invest a reasonable amount of time into understanding them.

_Good sources:_

https://javascript.info/promise-chaining

https://github.com/getify/You-Dont-Know-JS/tree/1st-ed

## Error Handling

We had previously mentioned that a promise can be in one of three different states. When an HTTP request fails, the associated promise is rejected. Our current code does not handle this rejection in any way.

he rejection of a promise is handled by providing the then method with a second callback function, which is called in the situation where the promise is rejected.

The more common way of adding a handler for rejected promises is to use the catch method.

```
axios
  .get('http://example.com/probably_will_fail')
  .then(response => {
    console.log('success!')
  })
  .catch(error => {
    console.log('fail')
  })

```

The catch method can be used to define a handler function at the end of a promise chain, which is called once any promise in the chain throws an error and the promise becomes rejected.

```
const toggleImportanceOf = id => {
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  noteService
    .update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
}
```
