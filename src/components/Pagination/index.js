import './index.css'

const Pagination = ({currentPage, totalPages, onPageChange})=>{
    if(totalPages === 1) {
        return null
    }

    const pageNumbers =[]

    for(let i =1; i<= totalPages; i++){
        pageNumbers.push(i)
    }

    return(
        <ul className="pagination-conatiner">
            {pageNumbers.map(nums =>(
                <li>
                    <button 
                    onClick={()=>onPageChange(nums)} 
                    className = {currentPage === nums ? 'active' :'inactive'}
                    >
                        {nums}
                    </button>
                </li>
            ))}

        </ul>
    )
}

export default Pagination