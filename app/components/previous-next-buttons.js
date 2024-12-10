export default function PreviousNextButtons({handleSetPage, page, longForm}) {
  return (
      <div className={`flex justify-between items-center mt-4 w-1/2 ${longForm === true ? "visible" : "hidden" } `}>
        <button
          onClick={() => handleSetPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1} 
          className={`px-4 py-2 rounded-lg ${
            page === 1 ? "bg-gray-300 font-normal text-white" : "bg-yellow-500 hover:bg-amber-500"
          } text-black font-semibold`}
        >
          Previous
        </button>
        <p className="text-lg font-semibold">Page {page}</p>
        <button
          onClick={() => handleSetPage((prevPage) => prevPage + 1)}
          className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-amber-500 font-semibold text-black"
        >
          Next
        </button>
      </div>
    
  );
}