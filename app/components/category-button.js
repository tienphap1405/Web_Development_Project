export default function CategoryButton({name, prevCategory, newCategory, handleSetCategory, longForm}) {
    return (
        longForm && (
            <button 
                className={`text-black font-bold p-2 w-36 rounded mb-4 shadow-md ${ newCategory === prevCategory ? "bg-amber-500 font-bold border-2 border-yellow-500" : " hover:bg-amber-500 bg-blue-300" } `} 
                disabled={prevCategory === newCategory} 
                onClick={() => handleSetCategory(newCategory)}>
                {name}
            </button>
        )
    )
}