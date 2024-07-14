import React, { useState } from "react";
import "./TasksList.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaskServices from "../services/TaskServices";

const TasksList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["taskslist", filter, searchTerm],
    async () => {
      if (filter) {
        const response = await TaskServices.getTasks({ taskStatus: filter });
        return { data: response.data };
      }
      if (searchTerm) {
        const response = await TaskServices.getTasks({ taskName: searchTerm });
        return { data: response.data };
      }
      const response = await TaskServices.getTasks();
      return { data: response.data };
    },
    {
      onSuccess: (data) => {
        // console.log("data===>", data?.data?.data?.tasks);
      },
      onError: (err) => {
        // toast.error(err?.response?.data?.message || err?.message, {
        //   delay: 10,
        // });
      },
    }
  );

  const deleteTaskMutation = useMutation(
   (id) => {
      return TaskServices.deleteTask(id);
    },
    {

      onSuccess: {
       queryClient.in 
      }
    }
  );

  const handleDelete = (id) => {
    // console.log("id", id);
    deleteTaskMutation.mutate(id);
  };

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Select one Status to filter</option>
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="table-responsive">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>SL. No</th>
              <th>Task</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.data?.tasks.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task?.taskTitle ? task?.taskTitle : "Dummy Title"}</td>
                <td>
                  {task?.taskDescription
                    ? task?.taskDescription
                    : "Dummy Description"}
                </td>
                <td>
                  {task?.taskStatus === "todo"
                    ? "To Do"
                    : task?.taskStatus == "inProgress"
                    ? "In Progress"
                    : task?.taskStatus === "done"
                    ? "Done"
                    : "Dummy Status"}
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(task?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksList;
