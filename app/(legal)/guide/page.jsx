import Container from '@/app/components/Container'
import React from 'react'

const Guide = () => {
  return (
    <Container className=" max-w-screen-xl py-10">
      <div className="space-y-8 text-justify">
        <h1 className="text-xl font-bold uppercase">
          Renting Guide
        </h1>

        <div className="text-gray-700 space-y-7">
           
            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
                    Background
              </h2>

              <p className="mb-2">
              You hereby certify that you are at least 18 years of age or in case of a minor are accompanied by your guardian, that you have read the provisions of this rental agreement, and that you are renting the book(s) shown on the checkout page from Rent a Book website (https://bookcafee.vercel.app/). Your completion of the rental transaction constitutes your acceptance of these terms.
              </p>

            </div>

            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
                Condition of Books
              </h2>

              <p className="mb-2">
              Books rented from Rent a Book are guaranteed to be correct according to your order, and in an acceptable used or new condition. Books will be shipped at Rent-a-Book discretion and depending upon member’s availability.
              </p>

            </div>

            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
                 Shipping
              </h2>

              <p className="mb-2">
              Rent a Book relies on the expertise of our delivery executives to get your books to you on time. Rare problems such as weather delays, route challenges or system delays could affect the timing of your delivery. Rent a Book will work closely with any customer that does not receive their book within the time frame selected. After a 24 hour processing period – excluding weekends and major holidays) – the book will be delivered to you on the following Saturday/Sunday. Should a problem arise, Rent-a-Book will work very hard to track down the delivery problem or send out a replacement Book at no cost to you.
              </p>

              <p> Please note that currently we deliver within Delhi area only. </p>

            </div>


            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
               Ownership
              </h2>

              <p className="mb-2">
              Books rented from Rent a Book are the property of Rent a Book. At no time during the rental period does the renter obtain ownership of the books unless the renter purchases the book according to our service policy.
              </p>


            </div>


            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
              Communication
              </h2>

              <p className="mb-2">
              Rent a Book will send you notifications and order receipts to the email address(es) you have provided. Rent a Book may send you return notifications via email as a courtesy, but Rent a Book is not responsible to notify you in any way of the return due date. You are solely responsible for returning the Books by the due date whether or not you receive a reminder notification from Rent a Book.
              </p>


            </div>


            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
              Agreement to Return Books
              </h2>

              <p className="mb-2">
              You agree to return rented Books in the same bag in which the book was delivered to you.
              </p>


            </div>

            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
              Payment of Reading fee
              </h2>

              <p className="mb-2">
              We accept payments in cash or through any of the payment apps. You may kindly pay the rent (reading fee) to the pick-up executive and receive an invoice (if required) for the payment made against your order.
              </p>


            </div>


            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
              Maintenance and Care of Books
              </h2>

              <p className="mb-2">
              You, the renter, agree to keep Books in good, readable condition. Rent-a-Book is liable and responsible for the condition of rented Books only until they are received by the renter at the onset of the rental period. At the time of initial receipt, you, the renter, take full responsibility for the Book. Rent a Book understands normal wear and tear on a Book. Books must be returned to Rent a Book in good, readable condition. If a Book is lost, stolen, or damaged beyond readable condition (e.g., cover ripped off, pages torn out, excessive water damage, damage that would prevent another reader from reading the Book, etc.) renter will be charged the full replacement value for the Book less the rental fee already paid (if any).
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
              Right to Cancel Orders by Rent a Book
              </h2>

              <p className="mb-2">
              Rent a Book retains the right to cancel or refuse any order that results from an error in pricing due to typographical errors or any other incorrect information.
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
              Right to Cancel Orders by the User
              </h2>

              <p className="mb-2">
              No hassles. No worries. Any book returned within 1 (one) day after the order date will be accepted without no rental fee and with no questions asked! However, we reserve the right to refuse to consider cancel order and insist for rental fee if we see the return policy is being abused.
              </p>
            </div>


            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
              Liability
              </h2>

              <p className="mb-2">
              Rent a Book shall not be held liable for any damages incurred, physical or emotional, tangible or intangible, beyond the rental price of the Book.
              </p>
            </div>



            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
              Rental Periods
              </h2>

              <p className="mb-2">
              We have structured our rental periods to suit your needs. The last thing we want is you worrying about not getting your book back to us on time. Therefore, we have incorporated, at no extra charge, a 7 day grace period which allows you the flexibility to hold on to the book long enough to give you sufficient time to read it. We’ve been in your shoes. That’s why it’s there! We encourage you to use it.
              </p>
            </div>


            <div>
              <h2 className="font-semibold mb-1 text-black text-lg">
                Re-Renting
              </h2>

              <p className="mb-2">
              Even after exhausting the grace period, if you feel that you need a longer time to read the book then you can re-rent your book. Simply call us and request for re-rent. Your account will be updated to show the new status.
              </p>
            </div>

        </div>
      </div>
    </Container>
  )
}

export default Guide
