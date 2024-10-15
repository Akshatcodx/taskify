import { useDrag } from "react-dnd";
import { SingleTaskProps } from "../../Interfaces/interfaces";
import { priorityToIcon } from "../../Utils/utils";

const SingleTask = ({ task }: SingleTaskProps) => {
  const priorityValue = task?.priority?.value as "high" | "medium" | "low";

  const [{ isDragging }, dragRef] = useDrag({
    type: "task",
    item: () => {
      // i am adding complete info title and id if data is
      return { ...task };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && item) {
        // onDropPlayer(item);
      }
    },
  });
  return (
    <>
      {!isDragging && (
        <div
          style={{ position: "relative" }}
          ref={dragRef}
          className={`task ${
            isDragging ? "classForDragging" : "classForStopDragging"
          }`}
        >
          {task?.task_description}
          <div className="icon">
            <img
              className="priorityImage"
              src={priorityToIcon[priorityValue]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleTask;
