import { CommonColumnSectionProps } from "../../Interfaces/interfaces";
import { idToClass } from "../../Utils/utils";
import SingleTask from "./SingleTask";
const priorityOrder: any = {
  high: 1,
  medium: 2,
  low: 3,
};

const CommonColumnSection = ({
  id,
  title,
  tasks,
  type,
}: CommonColumnSectionProps) => {
  const formattedTasks = tasks.filter((curElem) => curElem.type === type);
  // sorted based on the priority
  const sortedTasks = tasks.sort((a, b) => {
    const priorityA = a?.priority?.value ?? ""; // default to empty string or a low priority
    const priorityB = b?.priority?.value ?? ""; // same here

    return priorityOrder[priorityA] - priorityOrder[priorityB];
  });

  return (
    <div className="column " id={id}>
      <div className={`column-header ${idToClass[id]}`}>
        {title} <span className="">({formattedTasks?.length})</span>
      </div>
      <div className="tasks" id={id}>
        {formattedTasks?.map((task, idx) => (
          <SingleTask key={idx} task={task} />
        ))}
      </div>
    </div>
  );
};

export default CommonColumnSection;
