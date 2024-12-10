export default function CategoryButton({name, prevCategory, newCategory, handleSetCategory, longForm}) {
    return (
        longForm && (
            <div>
                <button 
                    className={`text-black font-bold py-2 px-4 rounded mb-4 ${ newCategory === prevCategory ? "bg-amber-500 font-bold" : " hover:bg-amber-500" } `} 
                    disabled={prevCategory === newCategory} 
                    onClick={() => handleSetCategory(newCategory)}>
                    {name}
                </button>
            </div>
        )
    )
}