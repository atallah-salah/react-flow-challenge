import React, { useState, useEffect } from "react";

// third party components
import { Dialog } from "primereact/dialog";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

// styles
import styles from "./GenderModal.module.scss";

// static data
const options = ["Male", "Female"];

const GenderModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState(options[0]);
  const [name, setName] = useState("");

  // Handlers
  const hideModalHandler = () => setModalVisible(false);
  const switchGenderHandler = ({ value }) => setGender(value);
  const changeNameHandler = ({ target: { value } }) => setName(value);

  useEffect(() => {
    return () => {};
  }, []);

  const modalFooter = (
    <div>
      <Button label="cancel" severity="danger" />
      <Button label="Add" severity="success" />
    </div>
  );

  return (
    <>
      <Button label="open modal" onClick={() => setModalVisible(true)} />

      <div className={styles.container}>
        <Dialog header="Add family member" visible={modalVisible} onHide={hideModalHandler} footer={modalFooter}>
          <InputText value={name} onChange={changeNameHandler} placeholder="member name" />
          <SelectButton value={gender} onChange={switchGenderHandler} options={options} />
        </Dialog>
      </div>
    </>
  );
};

export default GenderModal;
