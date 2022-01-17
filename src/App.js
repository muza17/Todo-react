import { useState } from 'react';
import content from "./localization/content";
import Modal from "./components/modal";
import './App.css'; 

function App() {
  //hooks
  const[todo, setTodo] = useState(JSON.parse(window.localStorage.getItem("todos")) || []);
  const[theme, setTheme] = useState(window.localStorage.getItem("theme") || "light");
  const[lang, setLang] = useState("uz");
  const[sortType, setSortType] = useState("all");
  const [completed, setCompleted] = useState([]);
  const [uncompleted, setUncompleted] = useState([]);
  const [modal, setModal] = useState(false);

  
  //functions
  //changing theme
  const handleChange = (e) => {
    setTheme(e.target.value)
    console.log(e.target.value);
    window.localStorage.setItem("theme", e.target.value)
  }  

  //for deleting
  const deleteTodo = (item) => {
    let filteredTodo = todo.filter((i)=> i.id != Number(item.id));
    setTodo(filteredTodo);
    window.localStorage.setItem("todos", JSON.stringify(filteredTodo));
  }

  //for checking
  const checkedTodo = (e) => {
    const  todoId = e.target.dataset.id;
    const findTodo = todo.find((i) => i.id === Number(todoId));
    findTodo.isCompleted = !findTodo.isCompleted;
    setTodo([...todo]);
    window.localStorage.setItem("todos", JSON.stringify([...todo]));
  };

  //for creating
  const createTodo = (e) => {
    if(e.code === "Enter"){
      let newTodo = {
        id : new Date().getTime(),
        content: e.target.value,
        isCompleted: false,
      };
      setTodo([newTodo, ...todo]);
      window.localStorage.setItem("todos", JSON.stringify([newTodo, ...todo]));
      e.target.value = null;
      //focus qilinishi kk
    }
  };
  
  //sorting todo
  const sortTodo = (e) => {
    console.log(e.target.value);
    setSortType(e.target.value);

    if(e.target.value == "completed"){

        const filteredTodos = todo.filter(todo => todo.isCompleted);
        setCompleted(filteredTodos);
    }else if(e.target.value == "uncompleted"){

        const filteredTodos = todo.filter(todo => !todo.isCompleted)
        setUncompleted(filteredTodos);
    }
  }
  


  return (
    <div className='container'>
      <div className='top'>
        <select className='sort' defaultValue={theme} onChange={ e => handleChange(e)} >
          <option value = {"light"}>{content[lang].theme1}</option>
          <option value = {"dark"}>{content[lang].theme2}</option>
        </select>
        <h1 className={theme}>{content[lang].heading}</h1>
        <select className='sort' defaultValue={lang} onChange={ (e) =>  setLang(e.target.value)}>
          <option value="uz">Uzbek</option>
          <option value="en">English</option>
          <option value="ru">Russian</option>
        </select>
      </div>
      <form>
        <input className='createInput' onKeyPress={(e) => createTodo(e)} placeholder='Type....'/>
        <button className='createBtn'>{content[lang].createBtn}</button>
      </form>
      <select className='sort' onChange={(e) => sortTodo(e)}>
          <option value="all">{content[lang].sorttype1}</option>
          <option value="completed">{content[lang].sorttype2}</option>
          <option value="uncompleted">{content[lang].sorttype3}</option>
      </select>
      {modal && <Modal setModal = {setModal} deleteTodo={deleteTodo} lang = {lang}/>}
      <ul>
        {
          sortType === "all" && todo.map((item) => {
              return(
                <li key={item.id} style={{textDecoration : item.isCompleted ? "line-through": "none",}} >
                  <div className='li-content'>
                    <input data-id ={item.id} type={"checkbox"}  defaultChecked={item.isCompleted} onChange={(e) => checkedTodo(e)}/>
                    {item.content}
                  </div>
                  <div className='buttons'>
                    <button className='editBtn'>{content[lang].editBtn}</button>
                    <button className='deleteBtn' onClick={() => deleteTodo(item)}>{content[lang].deleteBtn}</button>
                  </div>
                </li>
              )
          })
        }
        {
          sortType === "completed" && completed.map((item) => {
              return(
                <li key={item.id} style={{textDecoration : item.isCompleted ? "line-through": "none",}} >
                  <div className='li-content'>
                    <input data-id ={item.id} type={"checkbox"}  defaultChecked={item.isCompleted} onChange={(e) => checkedTodo(e)}/>
                    {item.content}
                  </div>
                  <div className='buttons'>
                    <button className='editBtn'>{content[lang].editBtn}</button>
                    <button className='deleteBtn' onClick={() => deleteTodo(item)}>{content[lang].deleteBtn}</button>
                  </div>
                </li>
              )
          })
        }
        {
          sortType === "uncompleted" && uncompleted.map((item) => {
              return(
                <li key={item.id} style={{textDecoration : item.isCompleted ? "line-through": "none",}} >
                  <div className='li-content'>
                    <input data-id ={item.id} type={"checkbox"}  defaultChecked={item.isCompleted} onChange={(e) => checkedTodo(e)}/>
                    {item.content}
                  </div>
                  <div className='buttons'>
                    <button className='editBtn'>{content[lang].editBtn}</button>
                    <button className='deleteBtn' onClick={() => deleteTodo(item)}>{content[lang].deleteBtn}</button>
                  </div>
                </li>
              )
          })
        }
      </ul>
    </div>
  );
}

export default App;
