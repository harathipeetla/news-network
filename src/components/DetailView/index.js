import './index.css'

const DetailView =({article}) =>{
    return(
        <div className="detail-view-conatiner">
        <h2 className='title'>{article.title}</h2>
        {article.images && article.images.thumbnailProxied && 
            <img src={article.images.thumbnailProxied} alt="thumbnail" className="thumbnail-image"/>
        }
        <p>{article.snippet}</p>
        <p className='publisher'><strong className='publisher-name'>Publisher: </strong>{article.publisher}</p>
        <p>
            <a href={article.newsUrl}>
                <button className='read-full-btn'>
                    Read Full Article
                </button>
            </a>
        </p>
        </div>
    )
}

export default DetailView