package com.example.RentaBike_Event_Comment_MS.service;

import java.util.List;

import com.example.RentaBike_Event_Comment_MS.models.Comment;
import com.example.RentaBike_Event_Comment_MS.models.Event;

public interface CommentService {
	
	List<Comment> retrieveAllComments( long idEvent );

	Comment addComment(Comment c);

	void deleteComment(Long id);

	Comment retrieveComment(Long id);
}
