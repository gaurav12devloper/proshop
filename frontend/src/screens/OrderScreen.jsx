import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery, useDeliverOrderMutation } from '../slices/ordersApiSlice';


const OrderScreen = () => {
    const { id: orderId } = useParams();
// fetching the order details from the backend and refetch is used to refetch the data from the backend
    const { data: order, refetch, isLoading,error,} = useGetOrderDetailsQuery(orderId);

    const [ payOrder, { isLoading: loadingPay } ] = usePayOrderMutation();

    const [ deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation();

    const [{ isPending }, paypalDispatch]=usePayPalScriptReducer();

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();

    function onApprove(data, actions) {
        return actions.order.capture().then(async function(details) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success('Payment successful');
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        });
    }
    async function onApproveTest() {
        await payOrder({ orderId, details: { payer: {}} });
        refetch();
        toast.success('Payment successful');
    }
    function onError(err) {
        toast.error(err.message);
    }
    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    },
                },
            ],
        }).then((orderId)=>{
            return orderId;
        });
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order Delivered');
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    };
    

   const{ userinfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if(!errorPayPal && !loadingPayPal && paypal.clientId){
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    },
                });
               paypalDispatch({type: 'setLoadingStatus', value: 'pending'});
            }
            if(order && !order.isPaid){ 
                if(!window.paypal){
                    loadPayPalScript();
                 } 
            }
        }
    }, [order,paypal, paypalDispatch, errorPayPal, loadingPayPal]);

    return isLoading ? <Loader /> : error ? <Message variant='danger'/>: (
        <>
            <h1>Order { order._id }</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{ order.user.name }</p>
                            <p><strong>Email: </strong>{ order.user.email }</p>
                            <p>
                                <strong>Address: </strong>
                                { order.shippingAddress.address }, { order.shippingAddress.city }, { order.shippingAddress.postalCode }, { order.shippingAddress.country }
                            </p>
                            { order.isDelivered ? <Message variant='success'>Delivered on { order.deliveredAt }</Message> : <Message variant='danger'>Not Delivered</Message> }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p><strong>Method: </strong>{ order.paymentMethod }</p>
                            { order.isPaid ? <Message variant='success'>Paid on { order.paidAt }</Message> : <Message variant='danger'>Not Paid</Message> }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            { order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                                <ListGroup variant='flush'>
                                    { order.orderItems.map((item, index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{ item.name }</Link>
                                                </Col>
                                                <Col md={4}>
                                                    { item.qty } x ${ item.price } = ${ item.qty * item.price }
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup varient='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${ order.itemsPrice }</Col>
                                </Row>
                            
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${ order.shippingPrice }</Col>
                                </Row>
    
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${ order.taxPrice }</Col>
                                </Row>
                            
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${ order.totalPrice }</Col>
                                </Row>
                            </ListGroup.Item>
                            { !order.isPaid && (
                                <ListGroup.Item>
                                    { loadingPay && <Loader /> }

                                    {isPending ? <Loader /> : (
                                        <div>
                                            <Button onClick={onApproveTest} style={{marginBottom: '10px'}}>Test Pay Order</Button>
                                            <div>
                                                <PayPalButtons style={{layout: 'horizontal'}} createOrder={createOrder} onApprove={onApprove} onError={onError} ></PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                    
                                </ListGroup.Item>  
                            )}
                            { loadingDeliver && <Loader /> }
                            { userinfo && userinfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={()=>deliverOrderHandler(order._id)}>Mark As Delivered</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>      
            </Row>
        </>
    );
}

export default OrderScreen