import { useEffect, useState } from 'react';
import { db } from "../../configs/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PF6Mf00nSoX6usFA3vf3OS4DO6f4lsJjkAWa0LzlisG2p9zVWVHG7xs3PKWeOwGGjsQjJcMQN6RB1XjpSQIeSm100Kl11na6i');

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    

    const handleClick = async (productName, price) => {
        const stripe = await stripePromise;
    
        // Send a request to the backend to create a checkout session
        const response = await fetch('http://34.143.175.118/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productName, price }), // Send product name and price to the backend
        });
    
        if (response.ok) {
          // If the request is successful, retrieve the session ID from the response
          const session = await response.json();
    
          // Redirect the user to the Stripe Checkout page using the session ID
          const result = await stripe.redirectToCheckout({ sessionId: session.id });
    
          if (result.error) {
            // If there is an error during the redirect, display the error message
            setError(result.error.message);
          }
        } else {
          // If there is an error creating the checkout session, display an error message
          setError('Error creating checkout session');
        }
      };

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const productDocRef = doc(db, "products", id);
                const productDocSnapshot = await getDoc(productDocRef);
                if (productDocSnapshot.exists()) {
                    setProduct({ id: productDocSnapshot.id, ...productDocSnapshot.data() });
                } else {
                    console.log("No such product exists!");
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        getProductDetails();
    }, [id]);

    return (
        <div className='item'>
            {product ? (
                <div>
                    <img src={product.Image} style={{ width: 180 }} alt={product.Name} />
                    <h1>{product.Name}</h1>
                    <h2>Description: {product.Description}</h2>
                    <h3>Price: {product.Price}</h3>

                    <Link to='/'><button className='button'>Back</button></Link>

                    <button onClick={()=>handleClick(product.Name, product.Price*100)}>Checkout</button>
                    
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
}

export default ProductDetails;