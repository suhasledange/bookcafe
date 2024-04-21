import Container from "@/app/components/Container";

const Privacy = () => {
  return (
    <Container className=" max-w-screen-xl py-10">
      <div className="space-y-8 text-justify">
        <h1 className="text-xl font-bold uppercase">Privacy Policy</h1>

        <div className="text-gray-700 space-y-5">
          <div className="">
            <h2 className="font-semibold text-lg mb-1 text-black">
              User Information
            </h2>
            <p className="">
              To avail certain services on bookcafee.vercel.app, users are
              required to provide certain information for the registration
              process namely:
            </p>
            <p className="text-black"> Email address</p>
          </div>

          <div className="">
            <h2 className="mb-1 font-semibold text-black text-lg">
              Privacy Policy for BookCafe
            </h2>
            <p className="mb-2">
              At BookCafe, accessible at{" "}
              <a href="https://bookcafee.vercel.app/">
                https://bookcafee.vercel.app/
              </a>
              , one of our main priorities is the privacy of our visitors. This
              Privacy Policy document contains types of information that are
              collected and recorded by BookCafe and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about
              our Privacy Policy, do not hesitate to{" "}
              <a href="contact.html">contact us</a>.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-1 text-black text-lg">
              Privacy Policies
            </h2>
            <p className="mb-2">
              You may consult this list to find the Privacy Policy for each of
              the advertising partners of BookCafe. Our Privacy Policy was
              created with the help of the Privacy Policy Generator and the
              Privacy Policy Generator Online.
            </p>
            <p className="mb-2">
              Third-party ad servers or ad networks uses technologies like
              cookies, JavaScript, or Web Beacons that are used in their
              respective advertisements and links that appear on BookCafe ,
              which are sent directly to users’ browser. They automatically
              receive your IP address when this occurs. These technologies are
              used to measure the effectiveness of their advertising campaigns
              and/or to personalize the advertising content that you see on
              websites that you visit.
            </p>
            <p>
              Note that BookCafe has no access to or control over these cookies
              that are used by third-party advertisers.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-1 text-black text-lg">
              Third-Party Privacy Policies
            </h2>

            <p className="mb-2">
              BookCafe’s Privacy Policy does not apply to other advertisers or
              websites. Thus, we are advising you to consult the respective
              Privacy Policies of these third-party ad servers for more detailed
              information. It may include their practices and instructions about
              how to opt-out of certain options. You may find a complete list of
              these Privacy Policies and their links here: Privacy Policy Links
            </p>

            <p>
              You can choose to disable cookies through your individual browser
              options. To know more detailed information about cookie management
              with specific web browsers, it can be found at the browsers’
              respective websites. What Are Cookies?
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-1 text-black text-lg">
              Children’s Information
            </h2>

            <p className="mb-2">
              Another part of our priority is adding protection for children
              while using the internet. We encourage parents and guardians to
              observe, participate in, and/or monitor and guide their online
              activity BookCafe does not knowingly collect any Personal
              Identifiable Information from children under the age of 13. If you
              think that your child provided this kind of information on our
              website, we strongly encourage you to contact us immediately and
              we will do our best efforts to promptly remove such information
              from our records.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-1 text-black text-lg">
              Online Privacy Policy Only
            </h2>

            <p className="mb-2">
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in BookCafe.This policy is not applicable to any information collected offline or via channels other than this website.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-1 text-black text-lg">
                Consent
            </h2>

            <p className="mb-2">
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
            </p>
          </div>

        </div>
      </div>
    </Container>
  );
};

export default Privacy;
