import {Container} from 'react-bootstrap';
import { useState } from 'react';
import InvoiceForm from './components/invoiceForm';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  let [count,setCount] = useState(0);
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100 ">
     <Container>
        <InvoiceForm/>
     </Container>

    </div>
  );
}

export default App;
