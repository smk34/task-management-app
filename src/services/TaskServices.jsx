import axios from "axios";
import config from "../../config";

const TaskServices = {};

TaskServices.createTask = (data) => {
  return axios.post(`${config.apiUrl}/api/task/create`, data);
};

TaskServices.getTasks = (data) => {
  if (data?.id) {
    return axios.get(`${config.apiUrl}/api/task/gettask/${data?.id}`);
  }
  if (data?.taskStatus) {
    return axios.get(
      `${config.apiUrl}/api/task/gettask?taskStatus=${data?.taskStatus}`
    );
  }
  if (data?.taskName) {
    return axios.get(
      `${config.apiUrl}/api/task/gettask?taskName=${data?.taskName}`
    );
  }
  return axios.get(`${config.apiUrl}/api/task/gettask`);
};

TaskServices.deleteTask = (id) => {
  console.log("ididi", id);
  return axios.delete(`${config.apiUrl}/api/task/deletetask/${id}`);
};

export default TaskServices;
