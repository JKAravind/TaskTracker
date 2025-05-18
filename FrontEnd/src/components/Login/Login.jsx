import { useState } from "react";
import { Link } from 'react-router-dom';



const Login =()=>{

    const [formData , setFormData] = useState({
        name:"",
        username:"",
        country:"",
        password:""
    })

    const [error, setError] = useState("");
    

    const handleChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };


        const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password || !formData.name || !formData.country) {
        setError("Please fill in all fields.");
        return;
        }
        
        setError("");

        console.log("Registering user:", formData);

        setFormData({
        email: "",
        password: "",
        name: "",
        country: "",
        });
    };



    return(
        <div>
            <form>
                <input type="email"
                name="email"
                placeholder="enter Your Mail"
                onChange={handleChange} />

                <input type="text"
                name="username"
                placeholder="Enter Your name"
                onChange={handleChange} />

                <input type="text" 
                name="country"
                placeholder="Enter Your Nationality" 
                onChange={handleChange}/>

                <input type="password" 
                name="country" 
                placeholder="Enter Your password"
                onChange={handleChange} />


                <button onClick={handleSubmit}>
                    Submit
                </button>

                <p>Don't have an account? <Link to="/register">Register here</Link></p>

            </form>

        </div>
    );


}

export default Login;