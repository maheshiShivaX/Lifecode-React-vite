import '@/ComponentsCss/Breadcrumb.css';

const Breadcrumb = (props) => {
    const { BreadcrumbMenu } = props;

    return (
        <div className='breadcrumb_container d-flex justify-content-center'>
            <ol className="breadcrumb">
                {BreadcrumbMenu?.map((item, i) => (
                    <div className='breadcrumb_content' key={i}>
                        {item?.link ? (
                            <div className='link_content'>
                                <li href={item?.link} key={i} className="breadcrumb-item"><a href="/">{item?.title}</a></li>
                                <img src='../images/Breadcrumbarrow.svg' alt='' />
                            </div>
                        ) : (
                            <li className="breadcrumb-item active" aria-current="page">{item?.title}</li>
                        )}
                    </div>
                ))}
            </ol>
        </div>
    )
}

export default Breadcrumb;