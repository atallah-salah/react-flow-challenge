import React, { useState, useEffect } from "react";

// third party components
import { Dialog } from "primereact/dialog";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useDispatch, useSelector } from "react-redux";
import { updateGenderModalState } from "../../redux/slices/genderModalSlice";

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
  const hideModalHandler = () => dispatch(updateGenderModalState({ modalVisible: false }));
  const switchGenderHandler = ({ value }) => setGender(value);
  const changeNameHandler = ({ target: { value } }) => setName(value);
  const submitModalHandler = () => {
    dispatch(updateGenderModalState({ modalVisible: false, name, gender }));
    modalCallback && modalCallback(name, gender);
    setName("");
    setGender("Male");
  };

  useEffect(() => {
    setModalDisabled(!name?.length > 0 || !gender);
    return () => {};
  }, [name, gender]);

  const modalFooter = (
    <div>
      <Button label="cancel" severity="danger" onClick={hideModalHandler} />
      <Button disabled={modalDisabled} label="Add" severity="success" onClick={submitModalHandler} />
    </div>
  );

  return (
    <>
      <Dialog header="Add family member" visible={modalVisible} onHide={hideModalHandler} footer={modalFooter}>
        <InputText value={name} onChange={changeNameHandler} placeholder="Member name" />
        <SelectButton value={gender} onChange={switchGenderHandler} options={options} />
      </Dialog>
    </>
  );
};

export default GenderModal;
