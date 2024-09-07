import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import SectionTitle from "@/components/SectionTitle";
import { config } from "@/config";


// TODO: add publishable key
const stripePromise = loadStripe(config.stripe.payment_gateway_key);
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Please pay to confirm"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;