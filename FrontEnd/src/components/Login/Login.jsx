import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const Login =()=>{
    const [formData , setFormData] = useState({
        email:"",
        password:""
    })

    const [error, setError] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    
    

    const handleChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

        const handleSubmit = async (e) => {
        e.preventDefault();


        if (!formData.email || !formData.password ) {
        setError("Please fill in all fields.");
        return;
        }
        
        setError("");

        try{
            const response = await axios.post("http://192.168.0.151:5000/auth/login",formData)

            console.log("success",response.data.message)
            setLoginMessage(response.data.message)
        }
        catch(error){
            console.log(error.response)

        }


        setFormData({
        email: "",
        password: "",
        });
    };



    return(
        <div>
            <form>
                <input type="email"
                name="email"
                value={formData.email}
                placeholder="enter Your Mail"
                onChange={handleChange} />


                <input type="password" 
                name="password" 
                value={formData.password}
                placeholder="Enter Your password"
                onChange={handleChange} />


                <button onClick={handleSubmit}>
                    Submit
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {loginMessage && <p style={{ color: "green" }}>{loginMessage}</p>}


                <p>Don't have an account? <Link to="/register">Register here</Link></p>

            </form>

        </div>
    );


}

export default Login;