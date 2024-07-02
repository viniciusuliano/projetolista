import { useState, useEffect } from "react";
function App(){
  
  const [input, setInput] = useState('')
  const [task, setTask] = useState<string[]>([])

  useEffect(()=>{
    const mostrarTarefa = localStorage.getItem('@tarefas')
    if(mostrarTarefa){
      setTask(JSON.parse(mostrarTarefa))
    }
  },
  [])


  function handleRegister(){
  if(input === ''){
    alert('Digite uma tarefa')
  } else{
    setTask(tarefas => [...tarefas, input])
    setInput('')  
    localStorage.setItem('@tarefas', JSON.stringify([...task, input]))
  }  

}

  function removeTask(item: string){
    const remove = task.filter(task => task != item)
    setTask(remove)
    localStorage.setItem('@tarefas', JSON.stringify(remove))
  }

  return(
    <div className="container">
      <button>Clicar</button>
      <h1>To-do List</h1>
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