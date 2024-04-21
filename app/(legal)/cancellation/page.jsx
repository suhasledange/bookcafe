import Container from "@/app/components/Container";

const Cancellation = () => {
  return (
    <Container className=" max-w-screen-xl py-10">
      <div className="space-y-8 text-justify">
        <h1 className="text-xl font-bold uppercase">
          Refund and Cancellation Policy
        </h1>

        <div className="text-gray-700 space-y-5">
            <p>
              While renting a book you will be paying (COD Available) the rent
              for the book and Initial Payable (Refundable Amount) and very
              nominal shipping charges.
            </p>
            <p>
              Our Policy for the cancellation and refund will be as follows:
            </p>

            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
                Cancellation Policy
              </h2>

              <p className="mb-2">
                Customer can cancel the order within 24hours of order. No
                cancellation request will be accepted in case received after
                24hours of order.
              </p>
              <p>
                Full refund will be initiated and will be reverted in customers
                account in 7days.
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
              Refund Policy
              </h2>

              <p className="mb-2">
              Initial payable amount will be initiated within 24hours, customer returns the book. The amount will be reflected back in customer account in 15days time.
              </p>

            </div>
        </div>
      </div>
    </Container>
  );
};

export default Cancellation;
