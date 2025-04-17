package com.example.RentaBike_Event_Comment_MS.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.RentaBike_Event_Comment_MS.models.Comment;
import com.example.RentaBike_Event_Comment_MS.service.CommentServiceImpl;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*")
@RequestMapping("/comment")
@RestController
public class CommentController {
	
	@Autowired
	CommentServiceImpl cs ;

	
	@GetMapping("/display/{idEvent}")
	@ApiOperation(value = "Get the comment list by event")
	public List<Comment> retrieveAllCommentC(@PathVariable(value = "idEvent") long idEvent) {
		List<Comment> comments = cs.retrieveAllComments(idEvent);
		return comments;
	}
	
	@PostMapping("/addComment")
	@ApiOperation(value = "Add comment")
	public Comment addCommentC(@RequestBody Comment c) {
		Comment c1 = cs.addComment(c);
		return c1;
	}
	
	@DeleteMapping("/delete/{idComment}")
	@ApiOperation(value = "Delete a comment")
	public void deleteCommentC(@PathVariable(value = "idComment") long idComment) throws NoSuchElementException{
		cs.deleteComment(idComment);
	}
	
	@GetMapping("/retrive/{idComment}")
	@ApiOperation(value = "Get comment by id")
	public Comment retrieveCommentC(@PathVariable(value = "idComment") long idComment) throws NoSuchElementException{
		Comment c = cs.retrieveComment(idComment);
		return c ;		
	}
}
