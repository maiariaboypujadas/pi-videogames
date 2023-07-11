import { useState } from "react";


function Form () {
    const [form, setForm] = useState({
        name: "",
        description:"",
        realesed:"",
        rating:"",
        gener:"",
        platforms:"",
        image:""
    })

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({...form, [property]:value})
    }
    return (
        <form>
<div>
    <label>Name: </label>
    <input type='text' value={form.name} onChange={changeHandler} name="name"></input>
</div>
<div>
    <label>Description: </label>
    <input type='text' value={form.description} onChange={changeHandler} name="description"></input>
    
</div>
<div>
    <label>Realesed: </label>
    <input type='text' value={form.realesed} onChange={changeHandler} name="realesed"></input>
   
</div>
<div>
    <label>Rating: </label>
    <input type='text' value={form.rating} onChange={changeHandler} name="rating"></input>
    
</div>
<div>
    <label>Gener: </label>
    <input type='text' value={form.gener} onChange={changeHandler} name="gender"></input>
   
</div>
<div>
    <label>Platforms: </label>
    <input type='text' value={form.platforms} onChange={changeHandler} name="platforms"></input>
   
</div>
<div>
    <label>Image: </label>
    <input type='text' value={form.image} onChange={changeHandler} name="image"></input>
   
</div>
        </form>
    )
}

export default Form;