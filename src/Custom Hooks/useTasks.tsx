import { useEffect, useState } from "react";
import { Tasks } from "../Interfaces/interfaces";
import { callApi, METHODS } from "../Api handlers/apiHandlers";
import useModal from "./useModal";
import partyPopperSound from "../audio/partypopper-92822.mp3";
import { displayToast, TOAST_TYPES } from "../helpers/toastMessage";

const useTasks = () => {
  const { showModal, toggleModal } = useModal();
  const [showConfetti, setShowConfetti] = useState(false);
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const playSound = () => {
    const audio = new Audio(partyPopperSound); // Path to your sound file
    audio.play().catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    setLoader(true);
    callApi({ method: METHODS.get })
      .then((res) => {
        setTasks(res?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);
  const handleAddTask = (taskToAdd: Tasks) => {
    setLoader(true);
    callApi({ method: METHODS.post, payload: taskToAdd })
      .then(() => {
        callApi({ method: METHODS?.get })
          .then((res) => {
            setTasks(res?.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        toggleModal();
        setLoader(false);
      });
  };
  const handleDeleteTask = (id: number) => {
    setLoader(true);
    callApi({ method: METHODS.delete, dynamicId: id })
      .then(() => {
        setTasks((prev) => prev.filter((elm) => elm.id !== id));
        displayToast({
          msg: "Task deleted successfully",
          type: TOAST_TYPES.success,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoader(false);
      });
  };
  const handleDrop = (item: Tasks, type: string) => {
    console.log(item, "this is droppedItem", type);
    const temp = [...tasks];
    const index = temp.findIndex((curElem) => curElem?.id === item.id);
    if (index !== -1) {
      temp[index].type = type;
      setTasks(temp);
    }
    if (type === "closed") {
      playSound();
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  };
  console.log(tasks, "these are tasks");
  return {
    loader,
    tasks,
    handleAddTask,
    showModal,
    toggleModal,
    handleDeleteTask,
    handleDrop,
    showConfetti,
  };
};

export default useTasks;
