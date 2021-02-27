import * as React from 'react'
import FooterCommunity from './FooterCommunity';
import FooterMyCommunity from './FooterMyCommunity';
import AOS from 'aos';
import "aos/dist/aos.css";


const CommunityItem = (props) => {
    const { item, title, page, deleteItem, editItem } = props;

    React.useEffect(() => {
        AOS.init({duration: 2000});
    }, [])

    return (
        <React.Fragment>
            <div key={item._id} data-aos="fade-down" className="card col-md-4 col-8 m-3">
                <div style={{ padding: '.75rem 1.25rem' }}>
                    <div className="row justify-content-between">
                        <div className="col-10 w-100">
                            <img
                                className="rounded-circle d-md-block"
                                style={{ width: '35%', padding: '5%' }}
                                src={item.user_id.avatar}
                                alt=""
                            />
                            {title}
                        </div>
                    </div>
                </div>
                <img className="card-img-top" src={item.img} alt="Card image" />
                <div className="card-body">
                    <div className="row p-2 fafa justify-content-between">
                        {page === 'community'
                            ? <FooterCommunity />
                            : <FooterMyCommunity editItem={() => { editItem(item._id) }} deleteItem={() => { deleteItem(item._id) }} />
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CommunityItem