import { useState, useEffect } from "react";
import CategorySelection from "../Categories";
import DetailView from "../DetailView";
import Pagination from "../Pagination";
import SearchArticle from "../Search";

import './index.css'

const HomePage = ()=>{
    const [category, setCategory] = useState('technology')
    const [newsItems, setNewsItems] = useState([])
    const [filteredNewsItems, setFilteredNewsItems] = useState([])
    const [selectedArticles, setSelecetedArticles] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [error, setError] = useState(null)

    const itemsPerpage = 6

    useEffect(()=>{
        const fetchNews = async ()=>{
            const apiUrl = `https://google-news13.p.rapidapi.com/${category}?lr=en-US`
            const options = {
                method:'GET',
               headers: {
		        'x-rapidapi-key': 'b687e7ff24msh1911d17f708621dp1353c3jsnc6711cf8452c',
		        'x-rapidapi-host': 'google-news13.p.rapidapi.com'
	            }
            }

            try{
                const response = await fetch(apiUrl, options);
                const data = await response.json()
                if(data.items){
                    setNewsItems(data.items)
                    setFilteredNewsItems(data.items.slice(0, itemsPerpage));
                }else{
                    setError('No news items found')
                }
            }catch(e){
                console.log(e)
            }

        }
        fetchNews();
    }, [category])


    const handleCategoryChange = (newCategory) =>{
        setCategory(newCategory)
        setCurrentPage(1)
    }

    const handleSearch = (searchTerm) =>{
        const filtered = newsItems.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNewsItems(filtered.slice(0, itemsPerpage))
        setCurrentPage(1)
    }


    const handleViewMore =(article)=>{
        setSelecetedArticles(article)
    }

    const handleBack =()=>{
        setSelecetedArticles(null)
    }

    const goToPage =(pageNumber)=>{
        const startIndex = (pageNumber - 1)* itemsPerpage
        const endIndex = startIndex + itemsPerpage
        setFilteredNewsItems(newsItems.slice(startIndex, endIndex))
        setCurrentPage(pageNumber)
    }


    if(selectedArticles){
        return(
            <div>  
                <DetailView article={selectedArticles}/>
                <button onClick={handleBack} className="back-btn">Back to News</button>
            </div>
        )
    }

    if(error){
        return<center>{error}</center>
    }

    return (
        <div className="latest-news-container">
            <div className="home-title-container">
                <h1 className="page-title">The News NetWork - {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            </div>
            <div className="home-nav-container">
                <div>
                <CategorySelection onSelectCategory ={handleCategoryChange}/>
                </div>
                <div>
                <SearchArticle onSearch={handleSearch}/>
                </div>
                
            </div>
                <ul className="articles-container">
                    {filteredNewsItems.map(item =>(
                        <li key={item.title} className="each-article">
                             {item.images && item.images.thumbnailProxied && 
                            <img src={item.images.thumbnailProxied} alt="thumbnail" className="thumbnail-image"/>
                            }
                            <h3 className="article-title">{item.title}</h3>
                            <p>{item.snippet.slice(0, 50)} {item.snippet.length > 50 && <span>.....</span>}</p>
                            <p>
                                <button className="view-more-btn" onClick={() =>handleViewMore(item)}>View More</button>
                            </p>
                        </li>
                    ))}
                </ul>
                <div className="pagination-conatiner">
                    <Pagination currentPage={currentPage} totalPages={Math.ceil(newsItems.length/itemsPerpage)} onPageChange={goToPage}/>
                </div>
        </div>
    )
}

export default HomePage
