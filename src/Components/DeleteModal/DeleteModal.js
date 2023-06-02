import React, { useState, useEffect } from "react";

// third party components
import { Dialog } from "primereact/dialog";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";

// styles
import styles from "./DeleteModal.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { updateDeleteModalState } from "../../redux/slices/deleteModalSlice";

// static data
const options = [
  { name: "Delete all childs", value: true },
  { name: "Link childs to the parent", value: false },
];

const DeleteModal = () => {
  // handle state
  const { modalVisible, modalCallback } = useSelector((state) => state.deleteModal);
  const dispatch = useDispatch();

  // local state
  const [option, setOption] = useState(true);
  const [modalDisabled, setModalDisabled] = useState(false);

  // Handlers
  const hideModalHandler = () => dispatch(updateDeleteModalState({ modalVisible: false }));
  const switchOptionHandler = ({ value }) => {
    setOption(value);
  };

  const submitModalHandler = () => {
    dispatch(updateDeleteModalState({ modalVisible: false, gender: option }));
    modalCallback && modalCallback(option);
  };

  const modalFooter = (
    <div>
      <Button label="cancel" onClick={hideModalHandler} />
      <Button disabled={modalDisabled} label="Delete" severity="danger" onClick={submitModalHandler} />
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <Dialog header="Delete family member" visible={modalVisible} onHide={hideModalHandler} footer={modalFooter}>
          <p>Please choose what to do with childs</p>
          <SelectButton value={option} onChange={switchOptionHandler} options={options} optionLabel="name" />
        </Dialog>
      </div>
    </>
  );
};

export default DeleteModal;
