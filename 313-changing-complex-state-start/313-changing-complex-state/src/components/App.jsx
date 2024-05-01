import React from "react";
import { useState } from "react";

function App() {

  const [fullName, setFullName] = useState({
    fName: "",
    lName: ""
  });
 

  function handleChange(event){
    // const newValue = event.target.value;
    // const inputName = event.target.name;

    const {value, name} = event.target;

    setFullName(prevValue => {
      if(name === "fName"){
        return {
          fName: value,
          lName: prevValue.lName
        };
      } else if (name === "lName"){
        return {
          fName: prevValue.fName,
          lName: value
        }
      }
    })

  //   if (inputName === "fName") {
  //     setFullName( {fName: newValue });
  //   } else if (inputName === "lName") {
  //     setFullName( {lName: newValue });
  //   }
  }

  

  return (
    <div className="container">
      <h1>Hello {fName} {lName}</h1>
      <form>
        <input name="fName" onChange={handleChange} placeholder="First Name" value={fullName.fName} />
        <input name="lName" onChange={handleChange}  placeholder="Last Name" 
        value={fullName.lName} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
