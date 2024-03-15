'use client'

import Container from "../components/Container"

const Checkout = () => {

    const steps = [
        'Personal Details',
        'Shipping Details',
        'Payment Method',
        'Order Summary'
    ]

    return (
        <Container className=" max-w-screen-xl py-5">
            <div className="h-screen max-w-screen-lg py-2 mx-auto">
                <div className="text-center max-w-3xl mx-auto mt-8 md:mt-0">
                    <div className="text-2xl md:text-3xl mb-3 font-semibold leading-tight">
                        Checkout
                    </div>
                </div>

            

            </div>
        </Container>
    )
}

export default Checkout
