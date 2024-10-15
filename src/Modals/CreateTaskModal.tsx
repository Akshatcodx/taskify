import { useFormik } from "formik";
import { CreateTaskModalProps } from "../Interfaces/interfaces";
import { createTaskSchema } from "../Validations/validationSchema";
import ErrorMessage from "../Components/Common/ErrorMessage";
import { callApi, METHODS } from "../Api handlers/apiHandlers";
import Mic from "../Components/Common/Mic";
import SpeechToText from "../Components/SpeechToText";
import CommonSelectField from "../Components/Common/CommonSelectField";
import { PRIORITY_OPTIONS } from "../Constants/constant";
const INITIAL_VALUES = {
  task_title: "",
  task_description: "",
  priority: "",
};
const CreateTaskModal = ({
  closeModal,
  handleAddTask,
}: CreateTaskModalProps) => {
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: createTaskSchema,
    onSubmit: async (values) => {
      console.log(values, "these are values");
      const payload = {
        ...values,
        type: "todo",
      };
      handleAddTask(payload);
    },
  });
  const { handleChange, handleSubmit, values, setFieldValue } = formik;
  console.log(values.task_title, "these are form values");
  const handleOnSpeechChange = (fieldName: string, value: string) => {
    if (value) {
      setFieldValue(fieldName, value);
    }
  };
  return (
    <>
      <div
        role="dialog"
        className={`modal ${true ? "show" : ""}`}
        style={{ display: true ? "block" : "none" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <h3 className="text-center font-weight-light"></h3>
              <div className="modal-heading ">Add Task</div>

              <div className="modal-body text-center">
                <div
                  className="task_title"
                  style={{
                    display: "flex",
                    margin: "0px 50px",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter task name"
                    id="taskInput"
                    name="task_title"
                    value={values?.task_title}
                    onChange={handleChange}
                  />
                  <SpeechToText
                    handleOnSpeechChange={handleOnSpeechChange}
                    fieldName="task_title"
                  />
                </div>
                <ErrorMessage formik={formik} fieldName={"task_title"} />
                <div
                  className="task_description"
                  style={{
                    display: "flex",
                    margin: "0px 50px",
                    alignItems: "center",
                  }}
                >
                  <textarea
                    placeholder="Enter task description"
                    id="taskInput"
                    name="task_description"
                    value={values.task_description}
                    onChange={handleChange}
                  />
                  <SpeechToText
                    handleOnSpeechChange={handleOnSpeechChange}
                    fieldName="task_description"
                  />
                </div>
                <ErrorMessage formik={formik} fieldName={"task_description"} />

                <div
                  className="priority"
                  id="taskInput"
                  style={{ margin: "5px 39px", border: "none", width: "332px" }}
                >
                  <CommonSelectField
                    fieldName="priority"
                    setFieldValue={setFieldValue}
                    isMulti={false}
                    options={PRIORITY_OPTIONS}
                  />
                  <ErrorMessage formik={formik} fieldName="priority" />
                </div>
                <div
                  className="buttons"
                  style={{ margin: "0px 110px", marginTop: "20px" }}
                >
                  <button
                    type="button"
                    className="btn cancelBtn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn addBtn"
                    data-dismiss="modal"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div
        className={`modal-backdrop fade ${true ? "show" : ""}`}
        style={{ display: true ? "block" : "none" }}
      ></div>
    </>
  );
};

export default CreateTaskModal;
