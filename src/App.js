import 'bootstrap/dist/css/bootstrap.min.css';
import Bio from "./components/Bio/Bio"

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faChevronLeft, faPencil, faChevronRight, faFilePdf, faImage, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, faChevronLeft, faPencil, faChevronRight, faFilePdf, faImage, faTrash, faTimes)

function App() {
  return (
    <div className="App">
      <Bio></Bio>
    </div>
  );
}

export default App;
