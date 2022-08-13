import LoaderFile from './LoaderFile';

function Comments(props) {
  function getDate(date) {
    let newDate = new Date(date).toISOString().split('T')[0];
    return newDate;
  }

  let { comments, loggedInUser, isLoggedIn } = props;
  console.log(props)
  if (!comments) {
    return <LoaderFile />;
  }
  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment) => {
          return (
            <div
              key={comment.createdAt}
              className="flex item-center p-6 bg-gray-100 mb-4 rounded-t-md relative"
            >
              <div className="">
                <img
                  src={comment.author.image}
                  alt={comment.author.username}
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <h4 className="text-xl ml-6">{comment.author.username}</h4>
                  <h4 className="text-xl ml-6">
                    #{getDate(comment.createdAt)}
                  </h4>
                  {isLoggedIn && loggedInUser === comment.author.username && (
                    <span className="absolute right-4 text-xl">
                      <i
                        className="fas fa-trash cursor-pointer text-red-500"
                        data-id={comment.id}
                        onClick={(e) => props.handleDelete(e)}
                      ></i>
                    </span>
                  )}
                </div>
                <p className="ml-6 my-4">{comment.body}</p>
              </div>
            </div>
          );
        })
      ) : (
        <h2 className="text-xl text-red-400">No comments yet!</h2>
      )}
    </>
  );
}

export default Comments;