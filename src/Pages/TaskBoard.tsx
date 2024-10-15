import { useDrop } from "react-dnd";
import CommonColumnSection from "../Components/Common/CommonColumnSection";
import useTasks from "../Custom Hooks/useTasks";
import CreateTaskModal from "../Modals/CreateTaskModal";
import { Tasks } from "../Interfaces/interfaces";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import DeleteBin from "../Components/DeleteBin";
import { useState } from "react";
const TaskBoard = () => {
  const { width, height } = useWindowSize();
  const [dltBtnPositions, setDelBtnPosition] = useState({
    x: 0,
    y: 0,
  });

  const {
    loader,
    tasks,
    handleAddTask,
    handleDeleteTask,
    showModal,
    toggleModal,
    handleDrop,
    showConfetti,
  } = useTasks();
  console.log(showConfetti, "showConfetti");

  const [{ isOver }, toDoRef] = useDrop({
    accept: "task",
    drop: (item: Tasks) => {
      handleDrop(item, "todo");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const [{ isOver: IsDeleteOver }, deleteButtonRef] = useDrop({
    accept: "deleteButton",
    drop: (item: Tasks, monitor) => {
      const delta: any = monitor.getDifferenceFromInitialOffset();
      const newX = Math.round(dltBtnPositions.x + delta?.x);
      const newY = Math.round(dltBtnPositions.y + delta.y);
      console.log(newX, "monitor");
      setDelBtnPosition({ x: newX, y: newY });
      //    want to add a class here
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const [{ isOver: isInProgrressOver }, inProgressRef] = useDrop({
    accept: "task",
    drop: (item: Tasks) => {
      handleDrop(item, "inProgress");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const [{ isOver: isClosedOver }, closedRef] = useDrop({
    accept: "task",
    drop: (item: Tasks) => {
      handleDrop(item, "closed");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <>
      <div className="container" ref={deleteButtonRef}>
        <DeleteBin
          handleDeleteTask={handleDeleteTask}
          dltBtnPositions={dltBtnPositions}
          setDelBtnPosition={setDelBtnPosition}
        />
        {showConfetti && (
          <Confetti width={width} height={height} recycle={false} />
        )}

        <div className="task-creation">
          {/* <input type="text" placeholder="Enter task name" id="taskInput" /> */}
          <button id="createButton" onClick={toggleModal}>
            Create Tasks
          </button>
        </div>
        <div className="board">
          <div ref={toDoRef}>
            <CommonColumnSection
              id={"todoColumn"}
              title={"TODO"}
              tasks={tasks}
              type="todo"
            />
          </div>
          <div ref={inProgressRef}>
            <CommonColumnSection
              id={"inProgressTasks"}
              title={"IN PROGRESS"}
              tasks={tasks}
              type="inProgress"
            />
          </div>
          <div ref={closedRef}>
            <CommonColumnSection
              id={"closedTasks"}
              title={"CLOSED"}
              tasks={tasks}
              type="closed"
            />
          </div>
        </div>
      </div>
      {showModal && (
        <CreateTaskModal
          closeModal={toggleModal}
          handleAddTask={handleAddTask}
        />
      )}
    </>
  );
};

export default TaskBoard;
