import { useState } from "react"
import { FaSearchMinus } from "react-icons/fa";
import './index.css'

const SearchArticle =({onSearch})=>{
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearchChange =(event)=>{
        setSearchTerm(event.target.value)
    }

    const handleSubmitSearch =(event)=>{
        event.preventDefault()
        onSearch(searchTerm)
    }

    return(
        <form onSubmit={handleSubmitSearch} className="form-seach">
            <input 
            type ="search" 
            placeholder="Search Your Articles Here..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            />
            <button type="submit" className="submit-btn">
                <FaSearchMinus/>
            </button>
        </form>
    )

}


export default SearchArticle