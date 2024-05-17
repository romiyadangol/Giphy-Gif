// import AddCategory from "./components/AddCategory"
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch( `https://api.giphy.com/v1/gifs/search?api_key=lJdgnNYTZ0o1O3hPfyTBXZh8aKUBwQPu&q=${categories}&limit=10`)
    .then((response) => response.json())
    .then((data) => {
      setData(data.data);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
  },[categories]);

  const searchGif = (e) => {
    e.preventDefault();
    console.log(value);
    if(value === ""){
      setError(true);
      console.log("Field is empty");
    }
    setError(false);
    setCategories(value);
    setValue("");
  }
  return (
    <>
    <div className="container">
      <div className='input-wrapper'>
         <h2>Giphy-Gif</h2>
         <form onSubmit={searchGif}>
            <input 
            type="text"
            placeholder="Search...."
            onChange={(e)=>{
              setValue(e.target.value)
            }}
            value={value} />
            {/* <button>Search</button> */}
         </form>
         {error ? <p>Field is empty</p> : null}
      </div>
        <div className="container-gifs">
          {data.map((value,index) => {
            return (
              <div key={index}>
                <h3>{value.title}</h3>
                <img src={value.images.downsized_medium.url} alt={value.title} />
              </div>
            );
          })}
        </div>
        </div>
    </>
  )
}

export default App;
