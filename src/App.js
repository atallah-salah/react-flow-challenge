import { ReactFlowProvider } from "reactflow";
import { Flow } from "./Flow";

import "reactflow/dist/style.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import DeleteModal from "./Components/DeleteModal/DeleteModal";
import NodeCreattionModal from "./Components/NodeCreattionModal/NodeCreattionModal";

export default () => (
  <>
    <NodeCreattionModal />
    <DeleteModal />
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  </>
);
