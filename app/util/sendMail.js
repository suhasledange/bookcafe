import formatDate from "./formatDate";

  const sendMail = async (res, payment) => {
    const subject = "Order Placed Successfuly!!!";
    const orderId = res.$id;
    const orderDate = formatDate(res.DateOfOrder);
    const bookName = res.bookName;
    const author = res.author;
    const address = res.address;
    const email = res.email;
    const name = res.name;
    const Payment = payment === "complete" ? "Online" : "CashOnDelivery";

    await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        subject,
        email,
        orderId,
        bookName,
        author,
        address,
        name,
        orderDate,
        Payment,
      }),
    });
  };

  export default sendMail