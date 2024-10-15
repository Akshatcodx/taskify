import { FormikProps } from "formik";

export interface CreateTaskModalProps {
  closeModal: () => void;
  handleAddTask: (task: Tasks) => void;
}
export interface ErrorMessageProps {
  fieldName: string;
  formik: FormikProps<any>;
}
export interface callApiProps {
  //   url: string;
  method: string;
  params?: Record<string, any>;
  payload?: Record<string, any>;
  dynamicId?: string | number;
}
export type PriorityType = {
  label: string;
  value: string;
};
export interface Tasks {
  task_title: string;
  task_description: string;
  id?: number | string;
  type?: string;
  priority?: PriorityType;
}
export interface CommonColumnSectionProps {
  title: string;
  id: string;
  tasks: Tasks[];
  type: string;
}
export interface SingleTaskProps {
  task: Tasks;
}
export interface DeleteBinProps {
  handleDeleteTask: (id: any) => void;
  dltBtnPositions: any;
  setDelBtnPosition: ({ x, y }: { x: any; y: any }) => void;
}
export interface DisplayToastProps {
  msg: string;
  type: string;
}
export interface SelectOptionType {
  label: string;
  value: string;
}
export interface CommonReactSelectProps {
  fieldName: string;
  setFieldValue: (fieldName: string, value: any) => void;
  isMulti?: boolean;
  options: SelectOptionType[];
}
