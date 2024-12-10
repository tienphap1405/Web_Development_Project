export default function PreviousNextButtons({handleSetPage, page, longForm}) {
  return (
      longForm && (
        <div className="flex justify-between items-center mt-8 w-1/3">
          <button
            onClick={() => handleSetPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={page === 1} 
            className={`px-4 py-2 rounded-lg h-10 w-24 ${
              page === 1 ? "bg-gray-300 font-normal text-white" : "bg-yellow-500 hover:bg-amber-500"
            } text-black font-semibold`}
          >
            Previous
          </button>

          <p className="text-lg font-semibold">Page {page}</p>

          <button
            onClick={() => handleSetPage((prevPage) => prevPage + 1)}
            className="px-4 py-2 rounded-lg h-10 w-24 bg-yellow-500 hover:bg-amber-500 font-semibold text-black"
          >
            Next
          </button>
        </div>
      )
  );
}