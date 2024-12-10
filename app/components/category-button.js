export default function CategoryButton({name, category, handleSetCategory, longForm}) {
    return (
        longForm && (
            <div>
                <button 
                    className="bg-cyan-500 text-white font-bold py-2 px-4 rounded mb-4 " 
                    onClick={() => handleSetCategory(category)}>
                    {name}
                </button>
            </div>
        )
    )
}