import * as Yup from "yup";
export const createTaskSchema = Yup.object().shape({
  task_title: Yup.string().required("Task title is required"),
  task_description: Yup.string().required("Task description is required"),
});
