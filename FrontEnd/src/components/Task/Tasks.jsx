import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TaskManager = () => {
  const { projectId } = useParams();
  const token = localStorage.getItem('jwtToken');

  const [taskList, setTaskList] = useState([]);
  const [projectDetails, setProjectDetails] = useState({ title: '', description: '' });
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      try {
        const projectRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/project/${projectId}/projectDetail`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjectDetails(projectRes.data);


        const tasksRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/project/${projectId}/taskList`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTaskList(tasksRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load project or tasks.');
      }
    };

    fetchProjectAndTasks();
  }, [projectId, token]);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return alert('Title is required');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/project/${projectId}/addTask`,
        newTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTaskList([...taskList, response.data]);
      setNewTask({ title: '', description: '' });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('Failed to create task');
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const updatePayload = { status: newStatus };

    // If status is completed, set completion timestamp
    if (newStatus === 'completed') {
      updatePayload.completedAt = new Date().toISOString();
    }

    // Send PUT or PATCH request to backend
      await axios.put(`${import.meta.env.VITE_BASE_URL}/project/task/${taskId}/updateStatus`, updatePayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update task list in state
      setTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? { ...task, ...updatePayload }
            : task
        )
      );
    } catch (error) {
      console.error(error);
      alert('Failed to update task status.');
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      <h2>Project: {projectDetails.title}</h2>
      <p>{projectDetails.description}</p>

      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: '1rem' }}>
        {showForm ? 'Cancel' : 'Create Task'}
      </button>

      {showForm && (
        <div style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h3>New Task</h3>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              style={{ width: '100%', marginBottom: '1rem', padding: '8px' }}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              rows={4}
              style={{ width: '100%', marginBottom: '1rem', padding: '8px' }}
            />
          </label>
          <button onClick={handleCreateTask}>Submit Task</button>
        </div>
      )}

      <h3>Task List</h3>
      {taskList.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
  {taskList.map((task, index) => (
    <li key={index} style={{ padding: '0.5rem', borderBottom: '1px solid #ddd' }}>
      <strong>TaskName: </strong>{task.title}<br />
      <strong>TaskDescrpition: </strong>{task.description}
      <p>
        <strong>Status:</strong>
        {task.status === 'completed' ? (
              <span style={{ color: 'green', fontWeight: 'bold' }}>{task.status}</span>

        ) :(
          <select
          value={task.status}
          onChange={(e) => updateTaskStatus(task._id, e.target.value)}
          style={{ padding: '4px', marginLeft: '8px' }}
        >
          <option value="pending">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        )}
        
      </p>
      <p><strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}</p>
      {task.completedAt && (
        <p><strong>Completed:</strong> {new Date(task.completedAt).toLocaleString()}</p>
      )}
    </li>
  ))}
</ul>

      )}
    </div>
  );
};

export default TaskManager;
