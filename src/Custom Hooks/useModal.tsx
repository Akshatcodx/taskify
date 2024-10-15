import { useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState<Boolean>(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  return { showModal, toggleModal };
};

export default useModal;
