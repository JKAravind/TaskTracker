import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';  
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();
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
            const respose = await axios.post(`${import.meta.env.VITE_BASE_URL}/project/add`,task, {
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
                const userResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(userResponse.data);

                const projectListResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/project/fetchList`,{
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

const deleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

  try {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/project/delete/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProjectArray((prevArray) => prevArray.filter((proj) => proj._id !== projectId));
  } catch (err) {
    console.log("Failed to delete project", err);
  }
};

return (
    <div className='Main'>
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
              <div className="project-cards-container">
  {projectArray.length === 0 ? (
    <p className="no-tasks">No Projects Yet</p>
  ) : (
    projectArray.map((proj) => (
      <div key={proj._id} className="project-card">
        <p className="project-title">{proj.title}</p>
        <p className="project-description">{proj.description}</p>
        <button onClick={() => navigate(`/project/${proj._id}`)}>Manage Tasks</button>
        <button onClick={() => deleteProject(proj._id)}>Delete</button>
      </div>
    ))
  )}
</div>
      </div>

    </div>
  );
};



export default Dashboard;