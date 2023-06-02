import React, { useState, useEffect } from "react";

// third party components
import { Dialog } from "primereact/dialog";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

// styles
import styles from "./GenderModal.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../redux/slices/genderModalSlice";

// static data
const options = ["Male", "Female"];

const GenderModal = () => {
  // handle state
  const { modalVisible, modalCallback } = useSelector((state) => state.genderModal);
  const dispatch = useDispatch();

  // local state
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [modalDisabled, setModalDisabled] = useState(true);

  // Handlers
  const hideModalHandler = () => dispatch(updateState({ modalVisible: false }));
  const switchGenderHandler = ({ value }) => setGender(value);
  const changeNameHandler = ({ target: { value } }) => setName(value);
  const submitModalHandler = () => {
    dispatch(updateState({ modalVisible: false, name, gender }));
    modalCallback && modalCallback(name, gender);
  };

  useEffect(() => {
    setModalDisabled(!name?.length > 0);
    return () => {};
  }, [name]);

  const modalFooter = (
    <div>
      <Button label="cancel" severity="danger" onClick={hideModalHandler} />
      <Button disabled={modalDisabled} label="Add" severity="success" onClick={submitModalHandler} />
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <Dialog header="Add family member" visible={modalVisible} onHide={hideModalHandler} footer={modalFooter}>
          <InputText value={name} onChange={changeNameHandler} placeholder="Member name" />
          <SelectButton value={gender} onChange={switchGenderHandler} options={options} />
        </Dialog>
      </div>
    </>
  );
};

export default GenderModal;
