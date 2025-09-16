import Breadcrumb from "./Common/Breadcrumb";
import Layout from "./Shared/Layout";
import '../ComponentsCss/AboutUs.css'

const AboutUs = () => {

    const BreadcrumbMenu = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: `About Us`
        },
    ]

    return (
        <Layout>
            <div className="about_us_main">
                <div className="about_us_inner">
                    <div className="product_detail_header">
                        <h1>{'About Us'}</h1>
                        <Breadcrumb BreadcrumbMenu={BreadcrumbMenu} />
                    </div>
                </div>
                <div className="container">
                    <div className="about_content_inner">
                        <h4>About Lifecode</h4>
                        <h5><i>SIMPLE. SECURE. SMART.</i></h5>
                        <p>Lifecode is a smart QR code solution from <b>iShivax</b>, designed to make life safer, easier, and more connected — without compromising your privacy.</p>
                        <p>
                            With Lifecode, you can handle wrong parking alerts, emergencies, lost-and-found situations, and more, all through a quick QR scan. No need to share your personal phone number — just scan, connect, and communicate instantly.
                        </p>

                        <p>Whether it’s on your car, bike, pet’s collar, luggage, or even a child’s school bag, Lifecode helps you stay reachable when it matters most. It works with popular apps like Paytm, Google Lens, and standard QR scanners — no special downloads required.</p>
                        <h4>What Makes Lifecode Special?</h4>
                        <ul>
                            <li><strong>•	Privacy First: </strong>Share contact details securely without revealing your personal number.</li>
                            <li><strong>•	Multi-Purpose Use: </strong>Works for vehicles, pets, bags, emergencies, and more.</li>
                            <li><strong>•	No Internet? No Problem: </strong></li>
                            <li><strong>•	Privacy First: </strong>Share your location even offline in emergencies.</li>
                            <li><strong>•	Quick & Hassle-Free: </strong>Just scan and connect instantly.</li>
                            <li><strong>•	Trusted by Thousands: </strong>Loved by users across India for its simplicity and reliability.</li>
                        </ul>
                        <p>From alerting vehicle owners about wrong parking to helping reunite lost pets, from finding nearby emergency services to sending SOS alerts — Lifecode is your all-in-one safety and contact tool.</p>
                        <p>At <strong>iShivax,</strong> we believe in using technology to solve real-life problems. Lifecode is our way of making cities smarter, streets safer, and daily life more convenient.</p>
                        <strong>Stay connected. Stay secure. Stay smart with Lifecode.</strong>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutUs;