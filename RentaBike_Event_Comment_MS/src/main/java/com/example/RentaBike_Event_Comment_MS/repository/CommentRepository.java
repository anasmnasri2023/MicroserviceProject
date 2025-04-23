package com.example.RentaBike_Event_Comment_MS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.RentaBike_Event_Comment_MS.models.Comment;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long>{
	
	
	@Query("SELECT c FROM Comment c WHERE c.event.idEvent = :idEvent ")
	List<Comment> findAllByIdEvent(@Param("idEvent") long idEvent);
}
