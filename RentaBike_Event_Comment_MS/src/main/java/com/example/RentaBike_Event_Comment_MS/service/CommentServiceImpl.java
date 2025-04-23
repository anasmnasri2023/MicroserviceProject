package com.example.RentaBike_Event_Comment_MS.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.RentaBike_Event_Comment_MS.models.Comment;
import com.example.RentaBike_Event_Comment_MS.models.Event;
import com.example.RentaBike_Event_Comment_MS.repository.CommentRepository;
import com.example.RentaBike_Event_Comment_MS.repository.EventRepository;

@Service
public class CommentServiceImpl implements CommentService{

	@Autowired
	CommentRepository commentRepository;
	
	@Override
	public List<Comment> retrieveAllComments(long idEvent) {
		List<Comment> comments = (List<Comment>) commentRepository.findAllByIdEvent(idEvent);
		return comments;
	}

	@Override
	public Comment addComment(Comment c) {
		return commentRepository.save(c);
	}

	@Override
	public void deleteComment(Long id) throws NoSuchElementException{
		commentRepository.deleteById(id);
		
	}

	@Override
	public Comment retrieveComment(Long id) throws NoSuchElementException{
		Comment c = commentRepository.findById(id)
				.orElseThrow(() -> new NoSuchElementException("Comment not found for this id :: " + id));
		return c;
	}

}
