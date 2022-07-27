function NewArticle(){
    return(
        <form className="flex flex-col w-1/3 m-auto mt-10 bg-gray-200 py-5 px-10">
            <input className="w-full border border-green my-5 p-2" type="text" name="title" id="title" placeholder="Title"/>
            <textarea className="my-5 pb-16 pt-2 px-2" name="description" id="description">Description</textarea>
            <input type="submit" className="text-white bg-red-500 w-1/3 m-auto my-5 p-2 font-bold text-2xl"/>
        </form>
    )
}
export default NewArticle;