import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGenderModalState } from "../../redux/slices/genderModalSlice";
import { useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";

const GENDERS = ["Male", "Female"];

const NodeCreattionModal = ({}) => {
  const { modalVisible } = useSelector((state) => state.genderModal);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [modalDisabled, setModalDisabled] = useState(true);

  const hideModalHandler = () => dispatch(updateGenderModalState({ modalVisible: false }));
  const switchGenderHandler = ({ value }) => setGender(value);
  const changeNameHandler = ({ target: { value } }) => setName(value);
  const submitModalHandler = () => {
    dispatch(updateGenderModalState({ modalVisible: false, isCreateNode: true, nodeName: name, nodeGender: gender }));
    setName("");
    setGender("Male");
  };

  useEffect(() => {
    setModalDisabled(!name?.length > 0 || !gender);
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
      <Dialog header="Add family member" visible={modalVisible} onHide={hideModalHandler} footer={modalFooter}>
        <InputText value={name} onChange={changeNameHandler} placeholder="Member name" />
        <SelectButton value={gender} onChange={switchGenderHandler} options={GENDERS} />
      </Dialog>
    </>
  );
};

export default NodeCreattionModal;
