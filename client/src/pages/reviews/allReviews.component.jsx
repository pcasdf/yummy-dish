import React, { useState, useContext, useEffect } from 'react';
import Header from '../../components/header/header.component';
import { UserContext } from '../../contexts/user.context';
import { getUserReviews, deleteReview, updateReview } from '../../services/reviews';
import { Link } from 'react-router-dom';
import { SystemUpdateAltRounded } from '@material-ui/icons';

const AllReviews = () => {

  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [edit, setEdit] = useState(false)
  const [input, setInput] = useState('')
  const [editReview, setEditReview] = useState(null)

  const checkReviews = async () => {
    if (user) {
      try {
        const allRev = await getUserReviews(
        user._id)
        console.log(allRev)
        setReviews(allRev)
         console.log(reviews)
      } catch (error) {
        console.log(error);
      }
    }
    
  }

  useEffect(() => {
    checkReviews()
  }, [])
  
  const handleDelete = async (id) => {
   await deleteReview(id)
    checkReviews();
  }

  const handleUpdate = async (e, review) => {
    e.preventDefault()
    if (edit) {
      const updatedReview = {...editReview, comment: input}
      await updateReview(editReview._id, updatedReview)
      setEditReview(null)
      checkReviews();
      setEdit(false)
    } else {
      setEdit(true)
      setEditReview(review)
      setInput(review.comment)
    }
}

  const handleChange = (e) => {
    setInput(e.target.value)
  }
  
  
  return (
      <div>
    <Header>All Reviews</Header>
      <h2>All Reviews</h2>
      <div>
        {edit && (
          <form onSubmit={handleUpdate}>
                    <input
                        value={input}
                        onChange={handleChange}
                      />
                   <button>Submit</button>
              </form>
            )}
        </div>
      {reviews.map((review, idx) =>
         
        <>
        <Link className='link-container' to={`/recipes/${review.recipe}`}>
          <p>{review.comment}</p>
            </Link>
          {console.log(review.recipe)}
          
            <button onClick={(e) => handleUpdate(e, review)} >Update</button>
            <button onClick={() => handleDelete(review._id)} >Delete</button>
          
        </>
        
        )}
    </div>
  )

}

export default AllReviews