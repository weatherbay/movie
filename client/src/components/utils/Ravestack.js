import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import {Button} from 'antd'
import '../../../src/script.css'
export default function PayRave(props) {

     
    
    const config = {
            public_key: 'FLWPUBK_TEST-9b791600a4396532b4ac38f29096fea9-X',
            tx_ref: Date.now(),
            amount: props.amount,
            currency: 'NGN',
            payment_options: 'card,mobilemoney,ussd',
            customer: {
              email: props.customer_email,
              phonenumber: props.customer_phoneno,
              name: props.customer_name,
            },
            customizations: {
              title: 'NaijaDiv',
              description: 'Payment for items in cart',
              logo: '',
            },
          };
        
          const handleFlutterPayment = useFlutterwave(config);
    
        
        // Rav button!
        return (
            <div className="App">
            <Button size="large" shape="circular" type="danger"
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                    props.onSuccess(response);
                    closePaymentModal() // this will close the modal programmatically
                },
                onClose: () => {},
              });
            }}
          >
            PaywithFlutterwave
          </Button>   
        </div>
      
        );
    }



        