import React, { useState } from 'react';
import './CommentItem.scss';
import UserIcon from '../../assets/img/user.svg';
import axios from 'axios';
import RemoveIcon from '../../assets/img/delete.svg';
import EditIcon from '../../assets/img/edit.svg';
import ModalUpdate from "../ModalUpdate/ModalUpdate";
import Edited from "../Edited/Edited";

import { Comment } from "../../constants/comment.interface";

interface Props {
  comment: Comment;
  isUpdated: any;
}

const CommentItem = ({comment, isUpdated}: Props) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const sendData = () => {
	isUpdated();
  }

  const handleDeleteRecord = (id: string) => {
	axios.delete(`http://localhost:5001/comments/${id}`)
	  .then(res => sendData())
	  .catch(err => console.log(err))
  }

  const handleEditRecord = (recordId: string) => {
	setEditModalOpen(true);
  }

  const handleCloseModal = () => {
	setEditModalOpen(false);
  }

  return (
	comment ? <div className='comment-item'>
	  <div className="comment-item-header">
		<div className="icon-wrapper">
		  <img src={UserIcon} alt="user-icon"/>
		</div>
		<div className="user-data">
		  <p className="name">
			{comment.name}
		  </p>
		  <p className="email">
			{comment.email}
		  </p>
		</div>
	  </div>
	  <div className="comment-item-body">
		<p>{comment.text}</p>
	  </div>
	  <div className="config-block">
		{comment.createdAt !== comment.updatedAt && <Edited/>}
		<button className="edit-btn" onClick={() => handleEditRecord(comment._id)}>
		  <img src={EditIcon} alt="edit-icon"/>
		</button>
		<button onClick={() => handleDeleteRecord(comment._id)} className="delete-btn">
		  <img src={RemoveIcon} alt="delete-icon"/>
		</button>
	  </div>
	  <ModalUpdate currentRecord={comment} isEditModalOpen={isEditModalOpen} getCallback={handleCloseModal}/>
	</div> : null
  )
}

export default CommentItem;