import { Link } from "react-router-dom";

const Register = (props) => {
    const { showSignUpForm, RegisterUser, formData, handleChange, loading, ph } = props;

    return (
        <>
            {showSignUpForm && (
                <div className='col-md-7 p-0'>
                    <div className='login-form-right otp-form'>
                        <form onSubmit={RegisterUser} className='login-form'>
                            <h2>Sign Up</h2>
                            <p>for Lifecode, exciting offers and everything</p>
                            <div className="input-wrapper">
                                <i className="fi fi-rr-user"></i>
                                <input
                                    type="text"
                                    className=""
                                    id="f_name"
                                    name='f_name'
                                    placeholder="First Name"
                                    value={formData.f_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-wrapper">
                                <i className="fi fi-rr-user"></i>
                                <input
                                    type="text"
                                    className=""
                                    id="l_name"
                                    name='l_name'
                                    placeholder="Last Name"
                                    value={formData.l_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-wrapper">
                                <i className="fi fi-rr-phone-call"></i>
                                <input
                                    type="text"
                                    className=""
                                    id="phone"
                                    name='phone'
                                    placeholder="Mobile Number"
                                    value={ph || formData?.phone}
                                    onChange={handleChange}
                                    maxLength={10}
                                    // disabled
                                    required
                                />
                            </div>
                            <button type='submit' className='hover-effect'>{loading ? 'loading...' : 'Submit'}</button>
                            <div className='otp-phone-number resend-otp'>
                                <span>Already have an account ?</span>
                                <p ><Link to={''}>Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Register;