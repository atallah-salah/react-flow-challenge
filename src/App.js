import { ReactFlowProvider } from "reactflow";
import { Flow } from "./Flow";

import "reactflow/dist/style.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import GenderModal from "./Components/GenderModal/GenderModal";
import DeleteModal from "./Components/DeleteModal/DeleteModal";
import CreateMiddleNodeModal from "./Components/CreateMiddleNodeModal/CreateMiddleNodeModal";

export default () => (
  <>
    <GenderModal />
    <CreateMiddleNodeModal />
    <DeleteModal />
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  </>
);
