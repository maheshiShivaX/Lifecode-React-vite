import "@/ComponentsCss/SaveYourLife.css";
import { SaveYourLifeData } from "../../_Services/SatactData";
const SaveYourLife = () => {
    return (
        <>
            <section className="save-your-life-section">
                <div className="container">
                    <div className="save-your-life-container">
                        <div className="row justify-content-center">
                            <div className="col-lg-3">
                                <div className="save-your-life-left">
                                    <h3>{SaveYourLifeData?.title}</h3>
                                    <p>{SaveYourLifeData?.description}</p>
                                </div>
                            </div>

                            {SaveYourLifeData?.childMenu?.map((item, index) => (
                                <div className="col-lg-3 col-6 mt-sm-0 mt-4" key={index}>
                                    <div className="save-your-life-right">
                                        <img src={item.image} alt="" />
                                        <h2>{item.title}</h2>
                                        <p>{item.activeTag}</p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SaveYourLife;