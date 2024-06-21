import './index.css'

const CategorySelection =({onSelectCategory})=>{

    const categories = ['business', 'entertainment', 'health', 'sport', 'science', 'technology']

    return(
        <div className="categories-conatiner">
            {categories.map(category =>(
                <button 
                className="category-button"
                key = {category}
                onClick={() => onSelectCategory(category)}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
        </div>
    )
}

export default CategorySelection