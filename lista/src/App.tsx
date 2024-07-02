import { useState, useEffect, useRef, useMemo, useCallback } from "react";
function App(){
  
  const firstRender = useRef(true)

  const [input, setInput] = useState('')
  const [task, setTask] = useState<string[]>([])

  useEffect(()=>{
    const mostrarTarefa = localStorage.getItem('@tarefas')
    if(mostrarTarefa){
      setTask(JSON.parse(mostrarTarefa))
    }
  },
  [])

  useEffect(()=>{
    if(firstRender.current){
      firstRender.current = false
      return
    }
    localStorage.setItem('@tarefas', JSON.stringify(task))
  }, [task])


  const handleRegister = useCallback(()=>{
    if(input === ''){
      alert('Digite uma tarefa')
    }
    setTask(tarefas => [...tarefas, input])
    setInput('') 

  }, [input])

  function removeTask(item: string){
    const remove = task.filter(task => task != item)
    setTask(remove)
  }

  const totalTasks = useMemo(()=>{
    return task.length
  }, [task])

  return(
    <div className="container">
      <h1>To-do List</h1>
      <strong>Total de tarefas - {totalTasks}</strong><br></br>
      <input value={input} placeholder="Digite sua tarefa" onChange={element => setInput(element.target.value)}/>
      <button onClick={handleRegister}>Registrar</button>
    <ul>
      {task.map((item) =>(
        <section key={item}>
          <li>{item}</li>
          <button onClick={() => removeTask(item)}>Excluir</button>
        </section>
      ))}
    </ul>
    </div>
  )
}

export default App;