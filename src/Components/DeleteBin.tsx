import React, { useRef } from "react";
import { DeleteBinProps, Tasks } from "../Interfaces/interfaces";
import { useDrag, useDrop } from "react-dnd";

const DeleteBin = ({
  handleDeleteTask,
  dltBtnPositions,
  setDelBtnPosition,
}: DeleteBinProps) => {
  const binRef: any = useRef(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: "deleteButton",
    item: () => {
      // i am adding complete info title and id if data is
      return { id: "delete", x: dltBtnPositions.x, y: dltBtnPositions.y };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log(dropResult, "dropResult");
      if (dropResult && item) {
        // onDropPlayer(item);
      }
    },
  });
  const [{ isOver: IsDeleteOver }, deleteRef] = useDrop({
    accept: "task",
    drop: (item: Tasks, monitor: any) => {
      if (binRef.current) {
        binRef.current.classList.add("delete"); // Add class when task is dropped
      }
      setTimeout(() => {
        binRef.current.classList.remove("delete");
        handleDeleteTask(item?.id);
      }, 2000);
      console.log("dropped on delete");
      //    want to add a class here
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <>
      {!isDragging && (
        <>
          <button
            className="button"
            ref={(node) => {
              deleteRef(node); // Bind the drop ref for react-dnd
              binRef.current = node; // Bind the local ref for classList manipulation
              dragRef(node);
            }}
            style={{
              position: "relative",
              left: `${dltBtnPositions?.x}px`,
              top: `${dltBtnPositions?.y}px`,
            }}
          >
            <div className="trash">
              <div className="top">
                <div className="paper"></div>
              </div>
              <div className="box"></div>
              <div className="check">
                <svg viewBox="0 0 8 6">
                  <polyline points="1 3.4 2.71428571 5 7 1"></polyline>
                </svg>
              </div>
            </div>
            <span>Delete Item</span>
          </button>
        </>
      )}
    </>
  );
};

export default DeleteBin;

// const DeleteBin = ({ handleDeleteTask }: DeleteBinProps) => {
//   const binRef = useRef<HTMLButtonElement>(null); // New ref to manipulate class
//   const [{ isOver: IsDeleteOver }, deleteRef] = useDrop({
//     accept: "task",
//     drop: (item: Tasks) => {
//       console.log("Dropped on delete");
//       if (binRef.current) {
//         binRef.current.classList.add("task-dropped"); // Add class when task is dropped
//       }

//       // Optionally call handleDeleteTask here to delete the task
//       // handleDeleteTask(item?.id);
//     },
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   });

//   return (
//     <button
//       className={`button ${IsDeleteOver ? "hover" : ""}`} // Optionally add hover effect
//       ref={(node) => {
//         deleteRef(node); // Bind the drop ref for react-dnd
//         binRef.current = node; // Bind the local ref for classList manipulation
//       }}
//     >
//       <div className="trash">
//         <div className="top">
//           <div className="paper"></div>
//         </div>
//         <div className="box"></div>
//         <div className="check">
//           <svg viewBox="0 0 8 6">
//             <polyline points="1 3.4 2.71428571 5 7 1"></polyline>
//           </svg>
//         </div>
//       </div>
//       <span>Delete Item</span>
//     </button>
//   );
// };

// export default DeleteBin;
