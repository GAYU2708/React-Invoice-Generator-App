
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Card, Button, InputGroup } from 'react-bootstrap';
import InvoiceItem from './resuable/InvoiceItem';
import InvoiceModal from './resuable/InvoiceModal';

export default function InvoiceForm() {

    const [state, setState] = useState({
        isOpen: false,
        currency: '₹',
        currentDate: "",
        invoiceNumber: 1,
        billTo: "",
        billToAddress: "",
        billToEmail: "",
        billFrom: "Rhythm",
        billFromEmail: "rhythm2708@gmail.com",
        billFromAddress: "Namakkal-Tamilnadu , India",
        notes: "",
        subTotal: '0.00',
        taxRate: 0,
        taxAmount: "0.00",
        discountRate: 0,
        discountAmount: "0.00"
    });

    const [total, setTotal] = useState(0.00);
    const [items, setItems] = useState([
        {
            id: "0",
            name: "",
            description: "",
            price: 1.00,
            quantity: 1
        },
    ]);


    const handleChange = (event) => {
       // console.log(event);
        setState(state => ({ ...state, [event.target.name]: event.target.value, }
        ));
    }

    const onItemizedItemEdit = (e) => {
        const individualItem = {
            id: e.target.id,
            name: e.target.name,
            value: e.target.value
        }

        const newItems = items.map(item => {
            if (item.id === individualItem.id) {
                return { ...item, [individualItem.name]: individualItem.value };
            }
            return item;
        });
        setItems(newItems);
    }

    const handleAddEvent = () => {
        const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        const newItem = {
            id: id,
            name: '',
            price: 1.0,
            description: "",
            quantity: 1,
        };
        setItems([...items, newItem]);
    };

    const handleRowDel = (itemToDelete) => {
        if (itemToDelete.length > 1) {
            setItems(items.filter(item => item.id !== itemToDelete.id));
        } else {
            setItems([{
                id: "0",
                name: "",
                description: "",
                price: 1.00,
                quantity: 1
            }]);
        }
    };
  
   const onCurrencyChange =(selectedOption)=>{
            setState((state)=> ({...state,selectedOption}));
   }
   const handleCalTotal =(items)=>{
    var subTotal = 0;
    items.map((item) => {
        subTotal += parseFloat(item.price).toFixed(2) * parseInt(item.quantity);
    });

        subTotal =parseFloat(subTotal).toFixed(2);

         
        const discountAmount = parseFloat(parseFloat(subTotal) * parseFloat(state.discountRate /100)).toFixed(2);
        const taxAmount = parseFloat(parseFloat(subTotal) * parseFloat(state.taxRate /100)).toFixed(2);

        const total = (parseFloat(subTotal) + parseFloat(taxAmount)) - parseFloat(discountAmount);

        setTotal(total);
        setState(state => ({
            ...state,
            subTotal,
            taxAmount,
            discountAmount,
        }))
    
   }
      
   useEffect(()=> {
    handleCalTotal(items);
    
    },[items,state.taxRate,state.discountRate])

    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            setState((state) => ({ ...state, isOpen: true }))
        }}>
            <Row>
                <Col md={8} lg={9}>
                    <Card className=' d-flex  p-4 p-xl-5 my-3 my-xl-4'>
                        {/* invoice date and number */}
                        <div className='d-flex flex-row justify-content-between '>
                            <div className='d-flex flex-row  mb-3'>
                                <div className='mb-2'>
                                    <span className='fw-bold'>Cuurent&nbsp;Date :&nbsp;</span>
                                    <span className='current-date'>{new Date().toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className='d-flex flex-row mb-3 '>
                                <div className='mb-2'>
                                    <span className='fw-bold'>Invoice&nbsp;Number :&nbsp;</span>
                                    <span className='current-date'>{state.invoiceNumber}</span>
                                </div>
                            </div>

                        </div>
                        <hr className='my-4' />
                        <Row className='mb-5'>
                            {/* customer details */}
                            <Col>
                                <Form.Label className="fw-bold">Customer Details:</Form.Label>
                                <Form.Control placeholder=' Enter Your name' value={state.billTo}
                                    type='text' name='billTo' className='my-2' onChange={handleChange} autoComplete='name' required={true} />
                                <Form.Control placeholder='Enter Your Email' value={state.billToEmail}
                                    type='email' name='billToEmail' className='my-2' onChange={handleChange} autoComplete='email' />
                                <Form.Control placeholder='Enter Your Address' value={state.billToAddress}
                                    type='text' name='billToAddress' className='my-2' onChange={handleChange} autoComplete='address' required={true}  />
                            </Col>
                            {/* biller details */}
                            <Col>
                                <Form.Label className='fw-bold'>Bill From:</Form.Label>
                                <Form.Control value={state.billFromEmail} className="my-2" disabled={true}/>
                                <Form.Control value={state.billFrom} className="my-2" disabled={true}/>
                                <Form.Control value={state.billFromAddress} className="my-2" disabled={true}/>
                            </Col>
                        </Row>
                        <InvoiceItem items={items} onItemizedItemEdit={onItemizedItemEdit} 
                                    onRowAdd={handleAddEvent} onRowDel={handleRowDel}
                                    currency={state.currency} />
                    {/* display calculate amount  */}
                        <Row className='mt-4 justify-content-end'>
                            <Col lg={6}>
                                {/* subtotal display */}
                                <div className='d-flex flex-row alignitem-start justify-content-between'>
                                    <span className='fw-bold'>Subtotal:</span>
                                    <span>{state.currency}{state.subTotal}</span>
                                </div>
                                {/* tax amount display */}
                                <div className='d-flex flex-row alignitem-start justify-content-between mt-2'>
                                    <span className='fw-bold'>Tax:</span>
                                    <span>{state.taxRate}% {state.currency}{state.taxAmount}</span>
                                </div>
                                {/* discount amount display */}
                                <div className='d-flex flex-row alignitem-start justify-content-between mt-2'>
                                    <span className='fw-bold'>Discount:</span>
                                    <span>{state.discountRate}%{state.currency}{state.discountAmount}</span>
                                </div>
                                {/* total amount display */}
                                <div className='d-flex flex-row alignitem-start justify-content-between mt-2'
                                            style={{fontSize:"1.125rem"}}>
                                    <span className='fw-bold'>Total:</span>
                                    <span>{state.currency}{total}</span>
                                </div>
                            </Col>
                        </Row>                 
                    </Card>
                </Col>
                <Col md={4} lg={3}>
                    <div className='sticky-top pt-md-3 pt-xl-4 '>
                        <Button variant='primary' type='submit' className='d-block w-100 mb-3' >Review Invoice</Button>
                       {/* currency options */}
                        <Form.Group className='mb-3'>
                            <Form.Label className='fw-bold'>Currency:</Form.Label>
                            <Form.Select onChange={(e)=> onCurrencyChange({currency:e.target.value})} className='btn btn-light my-1'>
                                <option value="₹">INR</option> 
                                <option value="$">USD</option>                       
                            </Form.Select>
                        </Form.Group>
                        {/* tax rate */}
                        <Form.Group className='my-3'>
                            <Form.Label className='fw-bold'>Tax Rate:</Form.Label>
                            <InputGroup className='my-1 flex-nowrap'>
                                <Form.Control  name="taxRate" type='number'
                                               value={state.taxRate}
                                               className='bg-white-border'
                                               onChange={handleChange}
                                               placeholder='0.00'
                                               min='0.00'
                                               step='0.01'
                                               max='100.00'/>
                            <InputGroup.Text className='bg-light fw-bold  text-secondary small'>%</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        {/* discount rate */}
                        <Form.Group className='my-3'>
                            <Form.Label className='fw-bold'>Discount Rate:</Form.Label>
                            <InputGroup className='my-1 flex-nowrap'>
                                <Form.Control  name="discountRate" type='number'
                                               value={state.discountRate}
                                               className='bg-white-border'
                                               onChange={handleChange}
                                               placeholder='0.00'
                                               min='0.00'
                                               step='0.01'
                                               max='100.00'/>
                            <InputGroup.Text className='bg-light fw-bold text-secondary small'>%</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
            <InvoiceModal showModal={state.isOpen}  
                          closeModal={()=> setState(state => ({...state,isOpen:false}))} 
                          info={state} 
                          items={items}
                          total={total}/>
        </Form>
        
    )
}
                           


