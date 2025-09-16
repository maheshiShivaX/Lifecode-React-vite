import React from 'react';
import { Link } from 'react-router-dom';
import '@/ComponentsCss/TrackOrder.css';

const TrackOrder = (props) => {
    const { trackOrder } = props;

    // const formatDate1 = (dateString) => {
    //     const date = new Date(dateString);

    //     // Format date as "7 Oct"
    //     const dateOptions = {
    //         month: 'short',
    //         day: 'numeric',
    //     };
    //     const formattedDate = date.toLocaleString('en-US', dateOptions);

    //     const timeOptions = {
    //         hour: '2-digit',
    //         minute: '2-digit',
    //         hour12: true,
    //     };
    //     const formattedTime = date.toLocaleString('en-US', timeOptions);

    //     return (
    //         <div>
    //             <div className="track_date">{formattedDate}</div>
    //             <div className="track_time">{formattedTime}</div>
    //         </div>
    //     );
    // };

    return (
        <div className="track-order-popup">
            <p className='track_order_status_id'>{trackOrder?.id}</p>
            <div>
                {/* {trackOrder?.data?.tracking_data != null ?
                    <div>
                        <div>
                            {trackOrder?.data?.tracking_data?.shipment_track.map((element, i) => (
                                <div key={i}>
                                    <div className="">
                                        <div>
                                            <span>OrderNo. :</span>
                                            <span>{orderNo}</span>
                                        </div>

                                        <div className="current_status_track">
                                            <span>Status :</span>
                                            <h1>{element?.current_status}</h1>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-4">
                                        <h4>{element?.courier_name}</h4>
                                        <div className="tracking_id">
                                            <div className="d-flex align-items-center" style={{ gap: '5px' }}>
                                                <p className="mb-0">Tracking ID</p>
                                                <Link to={trackOrder?.data?.tracking_data?.track_url} target="_blank">
                                                    <svg fill="none" height="25" viewBox="0 0 18 22" width="25" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.dev/svgjs"
                                                    >
                                                        <g transform="matrix(1,0,0,1,0,0)">
                                                            <g clipRule="evenodd" fill="#000" fillRule="evenodd">
                                                                <path
                                                                    d="m9 10c1.6569 0 3-1.34315 3-3s-1.3431-3-3-3c-1.65685 0-3 1.34315-3 3s1.34315 3 3 3zm0-2c.55228 0 1-.44772 1-1s-.44772-1-1-1-1 .44772-1 1 .44772 1 1 1z"
                                                                    fill="#000000"
                                                                    fillOpacity="1"
                                                                    stroke="none"
                                                                    strokeOpacity="1"
                                                                />
                                                                <path
                                                                    d="m10.4214 18.2758c2.0462-2.6175 5.5786-7.702 5.5786-11.60913 0-3.6819-3.134-6.66667-7-6.66667-3.86599 0-7 2.98477-7 6.66667 0 3.90713 3.53245 8.99163 5.5786 11.60913.73492.9401 2.10788.9401 2.8428 0zm1.8011-6.2791c1.0973-2.01058 1.7775-3.89338 1.7775-5.33003 0-2.4865-2.1455-4.66667-5-4.66667s-5 2.18017-5 4.66667c0 1.43665.68021 3.31945 1.77754 5.33003 1.01155 1.8534 2.25371 3.5954 3.22246 4.8488.96875-1.2534 2.2109-2.9954 3.2225-4.8488z"
                                                                    fill="#000000"
                                                                    fillOpacity="1"
                                                                    stroke="none"
                                                                    strokeOpacity="1"
                                                                />
                                                                <path
                                                                    d="m3.44832 16.9992c.29029-.129.61178-.2497.96091-.3594-.35369-.5654-.70664-1.1533-1.05009-1.7568-2.04845.7332-3.35914 1.8571-3.35914 3.117 0 2.2092 4.02944 4 9 4 4.9706 0 9-1.7908 9-4 0-1.2599-1.3107-2.3838-3.3591-3.117-.3435.6035-.6964 1.1914-1.0501 1.7568.3491.1097.6706.2304.9609.3594.6616.2941 1.0731.5924 1.2922.8226.078.0819.1195.1412.1409.1782-.0214.0371-.0629.0963-.1409.1782-.2191.2303-.6306.5286-1.2922.8226-1.3181.5859-3.2793.9992-5.5517.9992-2.27243 0-4.23357-.4133-5.55168-.9992-.66159-.294-1.07316-.5923-1.29227-.8226-.07793-.0819-.11946-.1411-.14089-.1782.02143-.037.06296-.0963.14089-.1782.21911-.2302.63068-.5285 1.29227-.8226zm12.55768.9542s-.0004.0034-.003.0102c.0013-.0068.003-.0102.003-.0102zm-14.01198 0s.00165.0034.00297.0102c-.00264-.0068-.00297-.0102-.00297-.0102zm0 .0932s.00033-.0033.00297-.0101c-.00132.0067-.00297.0101-.00297.0101zm14.00898-.0101c.0026.0068.003.0101.003.0101s-.0017-.0034-.003-.0101z"
                                                                    fill="#000000"
                                                                    fillOpacity="1"
                                                                    stroke="none"
                                                                    strokeOpacity="1"
                                                                />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </Link>
                                            </div>
                                            <span>{element?.awb_code}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            {trackOrder?.data?.tracking_data?.shipment_track_activities.map((activity, i) => (
                                <>
                                    <div key={i}>
                                        <div className="d-flex activities">
                                            <div>
                                                <span>{formatDate1(activity?.date)}</span>
                                            </div>
                                            <div>
                                                <div className="activity">
                                                    <span className="activity_heading">Activity :</span>
                                                    <span>{activity?.activity}</span>
                                                </div>
                                                <div className="location">
                                                    <span className="location_heading">Location :</span>
                                                    <span>{activity?.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sapreatar"></div>
                                </>
                            ))}
                        </div>
                    </div> : */}
                    <div className='track_order_status'>{trackOrder?.order_status}</div>
                {/* } */}
            </div>
        </div>
    );
};

export default TrackOrder;