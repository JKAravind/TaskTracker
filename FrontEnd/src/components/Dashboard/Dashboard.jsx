import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';  


const Dashboard = () => {
    const token = localStorage.getItem('jwtToken');
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState({ title: '', description: '' });    
    const [user, setUser] = useState(null);
    const [projectArray,setProjectArray] = useState([]); 


    const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const respose = await axios.post("http://192.168.0.151:5000/project/add",task, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setShowModal(false);
            
            setProjectArray((prevArray)=>{
              const updated = [...prevArray,task]
              console.log(updated)
              return updated
            })
            setTask({ title: '', description: '' });
           
        }

        catch(err){
            console.log("error")
        }

    };

    
    const addExercise = ()=>{
        setShowModal(true)

    }


    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;

            try {
                const userResponse = await axios.get('http://192.168.0.151:5000/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(userResponse.data);

                const projectListResponse = await axios.get("http://192.168.0.151:5000/project/fetchList",{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(projectListResponse.data.data)
                setProjectArray(projectListResponse.data.data); 
                console.log(projectArray)

            } catch (err) {
                console.log(err)
                setUser(null);
            }
        };

        fetchUser();
    }, []);

return (
    <div>
      <button onClick={addExercise}>+ Add Task</button>

            {showModal && (
        <div className="overlay">
          <div className="modal">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={task.title}
                placeholder="Title"
                onChange={handleChange}
                className="input"
              />
              <textarea
                name="description"
                value={task.description}
                placeholder="Description"
                onChange={handleChange}
                className="textarea"
              ></textarea>
              <button type="submit">Create</button>
              <button onClick={() => setShowModal(false)} type="button">Cancel</button>
            </form>
          </div>
        </div>
      )}
      <div>
              <div className="task-list">
        {projectArray.length === 0 ? (
          <p className="no-tasks">No Tasks Yet</p>
        ) : (
          projectArray.map((proj) => (
            <div key={proj.id} className="task-item">
              <div className="task-text">
                <p className="title">{proj.title}</p>
                <p className="description">{proj.description}</p>
              </div>
              <button onClick={() => deleteTask(proj.id)}>Delete</button>
              <button onClick={() => deleteTask(proj.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
      </div>

    </div>
  );
};



export default Dashboard;