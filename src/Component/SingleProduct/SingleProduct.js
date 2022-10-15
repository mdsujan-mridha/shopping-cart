import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




const SingleProduct = ({product}) => {
    
    const { Price, img, title, _id } =product;
    const navigate = useNavigate();
    
    const handleViewDetails = id => {
        navigate(`/products/${id}`);
    }
    

   
    // console.log(addItem);

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img} className=" w-100 mt-2" style={{ objectFit: 'contain' }} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <h5> Price: {Price} </h5>
                </Card.Text>
                <Button variant="primary" onClick={() => handleViewDetails(_id)}>  View Details </Button>
               
                
            </Card.Body>
        </Card>
    );
};

export default SingleProduct;